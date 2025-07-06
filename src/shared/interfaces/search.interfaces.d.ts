import { SearchMode, SearchValue, SearchableFields } from '../types/search.types';
export interface ISearchCondition<TFields extends string = string> {
    fields: SearchableFields<TFields>;
    value: SearchValue;
    mode: SearchMode;
    caseSensitive?: boolean;
}
export interface ISearchConfig<TFields extends string = string> {
    defaultFields?: SearchableFields<TFields>;
    defaultMode: SearchMode;
    caseSensitive: boolean;
    minLength?: number;
    maxLength?: number;
}
export interface ISearchResult<T = any> {
    query: T;
    searchTerm?: string;
    fieldsSearched?: string[];
}
export interface ISearchAdapter<T = any> {
    buildSearchQuery(condition: ISearchCondition, config: ISearchConfig): T;
}
export interface ISearchFilter<TFields extends string = string, TQuery = any> {
    search(term: string, fields?: SearchableFields<TFields>): ISearchResult<TQuery>;
    searchInFields(term: string, fields: SearchableFields<TFields>): ISearchResult<TQuery>;
    configure(config: Partial<ISearchConfig<TFields>>): void;
}
//# sourceMappingURL=search.interfaces.d.ts.map