import { BaseSearchAdapter } from './BaseSearchAdapter';
import { ISearchCondition, ISearchConfig } from '../shared/interfaces/search.interfaces';
export interface IMongoDBSearchOptions {
    caseSensitive?: boolean;
    enableRegexEscape?: boolean;
    maxSearchLength?: number;
}
export declare class MongoDBSearchAdapter extends BaseSearchAdapter<any> {
    private options;
    constructor(options?: IMongoDBSearchOptions);
    buildSearchQuery(condition: ISearchCondition, config: ISearchConfig): any;
    private buildFieldCondition;
    private escapeRegex;
}
export declare function createMongoDBSearchAdapter(options?: IMongoDBSearchOptions): MongoDBSearchAdapter;
//# sourceMappingURL=MongoDBSearchAdapter.d.ts.map