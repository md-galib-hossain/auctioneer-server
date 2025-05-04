import type { Prisma } from "@prisma/client";





type Delegate<T> = {
  findMany: (args: any) => Promise<T[]>;
  count: (args: any) => Promise<number>;
};

interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  nextCursor?: string | null;
}

interface QueryBuilderOptions<T> {
  defaultLimit?: number;
  searchableFields?: (keyof T)[];
  enumFields?: (keyof T)[];
  defaultSort?: Prisma.Enumerable<Prisma.SortOrder>;
  cursorField?: keyof T;
}

/**
 * QueryBuilder is a utility class to dynamically construct Prisma queries
 * based on incoming query parameters, supporting features like search, filter,
 * sorting, field selection, and cursor-based pagination.
 *
 * @template T - The Prisma model type (e.g., IAuctionRoom).
 *
 * @param delegate - The Prisma delegate for the model, typically `prisma.modelName`.
 * @param query - The incoming query object from the request, typically of type `Record<string, unknown>`.
 * @param options - Optional configuration to customize query behavior.
 *
 * @example
 * const qb = new QueryBuilder<IAuctionRoom>(prisma.auctionRoom, query, {
 *   defaultLimit: 10,
 *   searchableFields: ['roomCode', 'title'],
 *   enumFields: ['isPrivate', 'status'],
 *   cursorField: 'id',
 * });
 * const result = await qb
 *   .search()
 *   .filter()
 *   .sort()
 *   .cursorPaginate()
 *   .fields()
 *   .executeWithMeta();
 *
 * @see {@link QueryBuilderOptions} for configuration options.
 *
 * ### Features:
 * - `.include(includeArgs)`: Adds `include` clause to query.
 * - `.search()`: Searches across defined fields using `searchTerm`.
 * - `.filter()`: Filters fields from query object, excluding reserved fields.
 * - `.sort()`: Sorts by fields using `sort` (e.g., `-createdAt,title`).
 * - `.cursorPaginate()`: Enables cursor-based pagination using `cursor` param.
 * - `.fields()`: Selects specific fields using `fields` param (e.g., `id,title`).
 * - `.execute()`: Runs the query and returns results.
 * - `.executeWithMeta()`: Returns results along with metadata (pagination, total, etc).
 */
class QueryBuilder<T> {
  private delegate: Delegate<T>;
  private args: any;
  private query: Record<string, any>;
  private options: QueryBuilderOptions<T>;
  private _limit: number;

  constructor(
    delegate: Delegate<T>,
    query: Record<string, any>,
    options?: QueryBuilderOptions<T>
  ) {
    this.delegate = delegate;
    this.query = query;
    this.args = {};
    this.options = options || {};
    this._limit = Number(query.limit) || options?.defaultLimit || 10;
  }

  include(includeArgs: Record<string, any>) {
    this.args.include = includeArgs;
    return this;
  }

  search() {
    const { searchableFields = [], enumFields = [] } = this.options;
    const term = this.query.searchTerm as string;
    if (!term || searchableFields.length === 0) return this;

    const OR = searchableFields.map((field) => {
      if (enumFields.includes(field)) {
        return { [field]: { equals: term.toUpperCase() } };
      }
      return { [field]: { contains: term, mode: 'insensitive' } };
    });

    this.args.where = { ...this.args.where, OR };
    return this;
  }

  filter() {
    const queryCopy = { ...this.query };
    const excluded = ['searchTerm', 'sort', 'limit', 'page', 'fields', 'cursor', 'showAll'];
    excluded.forEach((field) => delete queryCopy[field]);

    if (this.query.showAll !== 'true') {
      this.args.where = { ...this.args.where, isActive: true };
    }

    this.args.where = { ...this.args.where, ...queryCopy };
    return this;
  }

  sort() {
    const sortQuery = this.query.sort as string;
    if (sortQuery) {
      const sortFields = sortQuery.split(',').map((field) =>
        field.startsWith('-')
          ? { [field.slice(1)]: 'desc' }
          : { [field]: 'asc' }
      );
      this.args.orderBy = sortFields;
    } else if (this.options.defaultSort) {
      this.args.orderBy = this.options.defaultSort;
    } else {
      this.args.orderBy = [{ createdAt: 'desc' }];
    }
    return this;
  }

  cursorPaginate() {
    const cursorValue = this.query.cursor;
    const cursorField = this.options.cursorField || 'id';

    if (cursorValue) {
      this.args.cursor = { [cursorField]: cursorValue };
      this.args.skip = 1;
    }

    this.args.take = this._limit;
    return this;
  }

  fields() {
    const fieldsParam = this.query.fields;
    if (fieldsParam && typeof fieldsParam === 'string') {
      const fields = fieldsParam.split(',').map((f) => f.trim());
      this.args.select = fields.reduce((acc: Record<string, boolean>, field) => {
        acc[field] = true;
        return acc;
      }, {});
    }
    return this;
  }

  async execute(): Promise<T[]> {
    return this.delegate.findMany(this.args);
  }

  async executeWithMeta(): Promise<{ meta: Meta; data: T[] }> {
    const [data, total] = await Promise.all([
      this.delegate.findMany(this.args),
      this.delegate.count({ where: this.args.where }),
    ]);

    let nextCursor: string | null = null;
    if (data.length === this._limit) {
      const last = data[data.length - 1] as any;
      const field = this.options.cursorField || 'id';
      nextCursor = last?.[field] ?? null;
    }

    return {
      meta: {
        page: this.query.page ? Number(this.query.page) : undefined,
        limit: this._limit,
        total,
        nextCursor,
      },
      data,
    };
  }
}

export default QueryBuilder;
export type { Meta, QueryBuilderOptions };
