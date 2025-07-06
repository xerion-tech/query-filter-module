import { BaseAdapter } from './BaseAdapter';
import { IFilter, IModelConfig } from '../shared/interfaces/filter.interfaces';
export interface IMongoDBOptions {
    caseSensitive?: boolean;
    enableRegexEscape?: boolean;
    maxRegexLength?: number;
}
export declare class MongoDBAdapter extends BaseAdapter<any> {
    private options;
    constructor(options?: IMongoDBOptions);
    buildQuery(filter: IFilter, config: IModelConfig): any;
    private buildSingleCondition;
    private escapeRegex;
}
//# sourceMappingURL=MongoDBAdapter.d.ts.map