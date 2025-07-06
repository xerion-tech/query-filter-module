import { ISearchFilter, ISearchAdapter, ISearchConfig, ISearchResult } from '../shared/interfaces/search.interfaces';
import { SearchableFields } from '../shared/types/search.types';
export declare class SearchFilter<TFields extends string = string, TQuery = any> implements ISearchFilter<TFields, TQuery> {
    private adapter;
    private config;
    constructor(adapter: ISearchAdapter<TQuery>, initialConfig?: Partial<ISearchConfig<TFields>>);
    search(term: string, fields?: SearchableFields<TFields>): ISearchResult<TQuery>;
    searchInFields(term: string, fields: SearchableFields<TFields>): ISearchResult<TQuery>;
    configure(config: Partial<ISearchConfig<TFields>>): void;
    private validateSearchTerm;
}
//# sourceMappingURL=SearchFilter.d.ts.map