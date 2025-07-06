import { FilterOperator, FilterLogicalOperator, FilterFieldType, FilterValue, AllowedOperators } from '../types/filter.types';
export interface IFilterCondition<TFields extends string = string> {
    field: TFields;
    operator: FilterOperator;
    value: FilterValue;
}
export interface IFilter<TFields extends string = string> {
    operator: FilterLogicalOperator;
    conditions: IFilterCondition<TFields>[];
}
export interface IFilterResult<T = any> {
    query: T;
}
export interface IFieldConfig {
    type: FilterFieldType;
    operators?: AllowedOperators;
    dbField?: string;
}
export interface IModelConfig {
    [fieldName: string]: IFieldConfig;
}
export interface IQueryAdapter<T = any> {
    buildQuery(filter: IFilter, config: IModelConfig): T;
}
export interface IQueryFilter<TFields extends string = string, TQuery = any> {
    parse(queryString?: string): IFilter<TFields> | null;
    validate(data: any): IFilter<TFields>;
    build(filter: IFilter<TFields>): TQuery;
    process(queryString?: string): IFilterResult<TQuery>;
}
export interface IAdapterOptions {
    caseSensitive?: boolean;
    customOperators?: string[];
}
//# sourceMappingURL=filter.interfaces.d.ts.map