"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFilter = void 0;
const ValidationUtils_1 = require("../shared/utils/ValidationUtils");
class QueryFilter {
    constructor(adapter, config) {
        this.adapter = adapter;
        this.config = config;
    }
    parse(queryString) {
        if (!queryString)
            return null;
        try {
            const decoded = decodeURIComponent(queryString);
            const parsed = JSON.parse(decoded);
            return this.validate(parsed);
        }
        catch (error) {
            console.warn('Filter parsing error:', error);
            return null;
        }
    }
    validate(data) {
        ValidationUtils_1.ValidationUtils.validateFilterStructure(data);
        data.conditions.forEach((condition, index) => {
            ValidationUtils_1.ValidationUtils.validateCondition(condition, index);
        });
        return data;
    }
    build(filter) {
        return this.adapter.buildQuery(filter, this.config);
    }
    process(queryString) {
        const filter = this.parse(queryString);
        if (!filter) {
            return { query: {} };
        }
        try {
            const query = this.build(filter);
            return { query };
        }
        catch (error) {
            console.error('Filter processing error:', error);
            throw error;
        }
    }
}
exports.QueryFilter = QueryFilter;
//# sourceMappingURL=QueryFilter.js.map