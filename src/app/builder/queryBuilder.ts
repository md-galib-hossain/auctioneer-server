import type { Prisma } from "@prisma/client";
import { IMeta } from "../interface/interface";

type Delegate<T> = {
  findMany: (args: any) => Promise<T[]>;
  count: (args: any) => Promise<number>;
};

interface QueryBuilderOptions<T> {
  defaultLimit?: number;
  searchableFields?: (keyof T)[];
  enumFields?: (keyof T)[];
  defaultSort?: Prisma.Enumerable<Prisma.SortOrder>;
  cursorField?: keyof T;
  activeField?: keyof T; // NEW: configurable active status field
}

/**
 * QueryBuilder is a utility class to dynamically construct Prisma queries
 * based on incoming query parameters, supporting features like search, filter,
 * sorting, field selection, and cursor-based pagination.
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

    const { activeField } = this.options;

    if (this.query.showAll !== 'true' && activeField) {
      this.args.where = { ...this.args.where, [activeField]: true };
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

  async executeWithMeta(): Promise<{ meta: IMeta; data: T[] }> {
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
export type { IMeta, QueryBuilderOptions };
