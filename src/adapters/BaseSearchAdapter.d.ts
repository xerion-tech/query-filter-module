import { ISearchCondition, ISearchConfig } from '../shared/interfaces/search.interfaces';
export declare abstract class BaseSearchAdapter<T = any> {
    abstract buildSearchQuery(condition: ISearchCondition, config: ISearchConfig): T;
    protected validateSearchCondition(condition: ISearchCondition): void;
    protected validateSearchConfig(config: ISearchConfig): void;
}
//# sourceMappingURL=BaseSearchAdapter.d.ts.map