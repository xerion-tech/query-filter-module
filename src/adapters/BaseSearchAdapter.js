"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSearchAdapter = void 0;
class BaseSearchAdapter {
    validateSearchCondition(condition) {
        if (!condition.fields || condition.fields.length === 0) {
            throw new Error('Search fields are required');
        }
        if (condition.value === undefined || condition.value === null) {
            throw new Error('Search value is required');
        }
        if (typeof condition.value === 'string' && condition.value.trim() === '') {
            throw new Error('Search value cannot be empty');
        }
    }
    validateSearchConfig(config) {
        if (config.minLength && config.maxLength && config.minLength > config.maxLength) {
            throw new Error('Minimum length cannot be greater than maximum length');
        }
    }
}
exports.BaseSearchAdapter = BaseSearchAdapter;
//# sourceMappingURL=BaseSearchAdapter.js.map