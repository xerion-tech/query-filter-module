import { IQueryFilter, IQueryAdapter, IFilter, IFilterResult, IModelConfig } from '../shared/interfaces/filter.interfaces';
export declare class QueryFilter<TFields extends string = string, TQuery = any> implements IQueryFilter<TFields, TQuery> {
    private adapter;
    private config;
    constructor(adapter: IQueryAdapter<TQuery>, config: IModelConfig);
    parse(queryString?: string): IFilter<TFields> | null;
    validate(data: any): IFilter<TFields>;
    build(filter: IFilter<TFields>): TQuery;
    process(queryString?: string): IFilterResult<TQuery>;
}
//# sourceMappingURL=QueryFilter.d.ts.map