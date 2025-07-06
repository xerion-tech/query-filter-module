import { IQueryAdapter, IFilter, IModelConfig } from '../shared/interfaces/filter.interfaces';
export declare abstract class BaseAdapter<T = any> implements IQueryAdapter<T> {
    abstract buildQuery(filter: IFilter, config: IModelConfig): T;
    protected validateField(field: string, config: IModelConfig): void;
    protected validateOperator(field: string, operator: string, config: IModelConfig): void;
}
//# sourceMappingURL=BaseAdapter.d.ts.map