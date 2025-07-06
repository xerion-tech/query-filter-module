import { IModelConfig } from '../interfaces/filter.interfaces';
export declare class ValidationUtils {
    static validateField(field: string, config: IModelConfig): void;
    static validateOperator(field: string, operator: string, config: IModelConfig): void;
    static validateFilterStructure(data: any): void;
    static validateCondition(condition: any, index: number): void;
}
//# sourceMappingURL=ValidationUtils.d.ts.map