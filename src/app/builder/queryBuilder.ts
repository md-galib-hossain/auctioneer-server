type Delegate<T> = {
  findMany: (args: any) => Promise<T[]>;
};

interface Meta {
  page: number | undefined;    
  limit: number| undefined;
  total: number| undefined;
  nextCursor?: string | null | undefined;
}

class QueryBuilder<T> {
  private delegate: Delegate<T>;
  private args: any;
  private query: Record<string, unknown>;
  private _limit = 5;

  constructor(delegate: Delegate<T>, query: Record<string, unknown>) {
    this.delegate = delegate;
    this.args = {};
    this.query = query;
  }

  include(includeArgs: Record<string, unknown>) {
    this.args.include = includeArgs;
    return this;
  }

  search(searchableFields: string[]) {
    const term = this.query.searchTerm as string | undefined;
    if (!term) return this;

    const OR = searchableFields.map((field) => {
      const enumFields = ['breedType', 'gender', 'breedingStatus'];
      if (enumFields.includes(field)) {
        return { [field]: { equals: term.toUpperCase() } };
      }
      return { [field]: { contains: term, mode: 'insensitive' } };
    });

    this.args.where = { ...this.args.where, OR };
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'cursor',
      'showAll'
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Apply isActive: true by default, unless showAll is true
    const showAll = this.query.showAll === true || this.query.showAll === 'true';
    if (!showAll) {
      this.args.where = { ...this.args.where, isActive: true };
    }

    this.args.where = { ...this.args.where, ...queryObj };
    return this;
  }

  sort() {
    const sort = this.query.sort as string | undefined;
    if (sort) {
      const sortFields = sort.split(',').map((field) =>
        field.startsWith('-')
          ? { [field.slice(1)]: 'desc' }
          : { [field]: 'asc' }
      );
      this.args.orderBy = sortFields;
    } else {
      this.args.orderBy = [{ createdAt: 'desc' }];
    }
    return this;
  }

  /** 
   * Cursor‐based pagination. 
   * - `cursor` is the last‐seen record’s primary key (id).
   * - `limit` is the page size.
   */
  cursorPaginate() {
    const limit = Number(this.query.limit) || this._limit;
    this._limit = limit;

    const cursor = this.query.cursor as string | undefined;
    if (cursor) {
      // skip the cursor itself, take the next `limit`
      this.args.cursor = { id: cursor };
      this.args.take = limit;
      this.args.skip = 1;
    } else {
      // first page: just take `limit`
      this.args.take = limit;
    }

    return this;
  }

  fields() {
    const fieldsParam = this.query.fields;
    if (fieldsParam && typeof fieldsParam === 'string') {
      const fields = fieldsParam.split(',').map((f) => f.trim());
      if (fields.length) {
        delete this.args.include;
        this.args.select = fields.reduce(
          (acc: Record<string, boolean>, field) => {
            acc[field] = true;
            return acc;
          },
          {}
        );
      }
    }
    return this;
  }

  async execute(): Promise<T[]> {
    return this.delegate.findMany(this.args);
  }

  /**
   * Runs the data query and a matching count query, then returns { meta, data }.
   * For cursor pagination, meta.nextCursor will be the `id` of the last item.
   */
  async executeWithMeta(): Promise<{ meta: Meta; data: T[] }> {
    // count all matching records
    const countArgs = { where: this.args.where };
  
    // 2) Run the two queries
    const [data, total] = await Promise.all([
          // fetch data

      this.delegate.findMany(this.args),
      // count returns a number, so just pass where
      (this.delegate as any).count(countArgs),
    ]);
  
    // 3) Compute nextCursor if using cursor pagination
    let nextCursor: string | null = null;
    if (data.length === this._limit) {
      // @ts-ignore assume T has `id`
      nextCursor = (data[data.length - 1] as any).id;
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
export type { Meta };
