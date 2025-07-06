"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
class ValidationUtils {
    static validateField(field, config) {
        if (!config[field]) {
            throw new Error(`Field '${field}' is not allowed`);
        }
    }
    static validateOperator(field, operator, config) {
        const fieldConfig = config[field];
        if (fieldConfig.operators && !fieldConfig.operators.includes(operator)) {
            throw new Error(`Operator '${operator}' not allowed for field '${field}'`);
        }
    }
    static validateFilterStructure(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Filter must be an object');
        }
        if (!['AND', 'OR'].includes(data.operator)) {
            throw new Error('Operator must be AND or OR');
        }
        if (!Array.isArray(data.conditions)) {
            throw new Error('Conditions must be an array');
        }
        if (data.conditions.length === 0) {
            throw new Error('At least one condition is required');
        }
        if (data.conditions.length > 20) {
            throw new Error('Too many conditions (max 20)');
        }
    }
    static validateCondition(condition, index) {
        if (!condition.field || !condition.operator || condition.value === undefined) {
            throw new Error(`Invalid condition at index ${index}`);
        }
    }
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=ValidationUtils.js.map