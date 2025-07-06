"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBSearchAdapter = void 0;
exports.createMongoDBSearchAdapter = createMongoDBSearchAdapter;
const BaseSearchAdapter_1 = require("./BaseSearchAdapter");
class MongoDBSearchAdapter extends BaseSearchAdapter_1.BaseSearchAdapter {
    constructor(options = {}) {
        super();
        this.options = options;
    }
    buildSearchQuery(condition, config) {
        this.validateSearchCondition(condition);
        this.validateSearchConfig(config);
        const { fields, value, mode, caseSensitive } = condition;
        if (fields.length === 0) {
            return {};
        }
        const searchConditions = fields.map(field => {
            return this.buildFieldCondition(field, value, mode, caseSensitive);
        });
        if (searchConditions.length === 1) {
            return searchConditions[0];
        }
        return { $or: searchConditions };
    }
    buildFieldCondition(field, value, mode, caseSensitive) {
        switch (mode) {
            case 'contains':
                return {
                    [field]: {
                        $regex: this.escapeRegex(value.toString()),
                        $options: caseSensitive ? '' : 'i'
                    }
                };
            case 'exact':
                return { [field]: value };
            case 'regex':
                return {
                    [field]: {
                        $regex: value.toString(),
                        $options: caseSensitive ? '' : 'i'
                    }
                };
            default:
                return { [field]: { $regex: this.escapeRegex(value.toString()), $options: 'i' } };
        }
    }
    escapeRegex(str) {
        if (this.options.enableRegexEscape === false) {
            return str;
        }
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
exports.MongoDBSearchAdapter = MongoDBSearchAdapter;
function createMongoDBSearchAdapter(options = {}) {
    return new MongoDBSearchAdapter({
        caseSensitive: false,
        enableRegexEscape: true,
        maxSearchLength: 100,
        ...options
    });
}
//# sourceMappingURL=MongoDBSearchAdapter.js.map