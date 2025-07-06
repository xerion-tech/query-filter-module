"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBAdapter = void 0;
const BaseAdapter_1 = require("./BaseAdapter");
class MongoDBAdapter extends BaseAdapter_1.BaseAdapter {
    constructor(options = {}) {
        super();
        this.options = options;
    }
    buildQuery(filter, config) {
        const mongoConditions = filter.conditions.map(condition => {
            this.validateField(condition.field, config);
            this.validateOperator(condition.field, condition.operator, config);
            return this.buildSingleCondition(condition, config);
        });
        if (mongoConditions.length === 0) {
            return {};
        }
        if (mongoConditions.length === 1) {
            return mongoConditions[0];
        }
        return filter.operator === 'OR'
            ? { $or: mongoConditions }
            : { $and: mongoConditions };
    }
    buildSingleCondition(condition, config) {
        const { field, operator, value } = condition;
        const dbField = config[field].dbField || field;
        switch (operator) {
            case 'eq':
                return { [dbField]: value };
            case 'ne':
                return { [dbField]: { $ne: value } };
            case 'in':
                return { [dbField]: { $in: Array.isArray(value) ? value : [value] } };
            case 'nin':
                return { [dbField]: { $nin: Array.isArray(value) ? value : [value] } };
            case 'gt':
                return { [dbField]: { $gt: value } };
            case 'gte':
                return { [dbField]: { $gte: value } };
            case 'lt':
                return { [dbField]: { $lt: value } };
            case 'lte':
                return { [dbField]: { $lte: value } };
            case 'contains':
                return { [dbField]: { $regex: this.escapeRegex(value), $options: 'i' } };
            case 'regex':
                return { [dbField]: { $regex: value, $options: 'i' } };
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }
    escapeRegex(str) {
        if (this.options.enableRegexEscape === false) {
            return str;
        }
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
exports.MongoDBAdapter = MongoDBAdapter;
//# sourceMappingURL=MongoDBAdapter.js.map