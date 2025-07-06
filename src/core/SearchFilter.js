"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilter = void 0;
class SearchFilter {
    constructor(adapter, initialConfig = {}) {
        this.adapter = adapter;
        this.config = {
            defaultMode: 'contains',
            caseSensitive: false,
            minLength: 1,
            maxLength: 100,
            ...initialConfig
        };
    }
    search(term, fields) {
        this.validateSearchTerm(term);
        const searchFields = fields || this.config.defaultFields || [];
        if (searchFields.length === 0) {
            throw new Error('No searchable fields specified');
        }
        const condition = {
            fields: searchFields,
            value: term,
            mode: this.config.defaultMode,
            caseSensitive: this.config.caseSensitive
        };
        const query = this.adapter.buildSearchQuery(condition, this.config);
        return {
            query,
            searchTerm: term,
            fieldsSearched: searchFields
        };
    }
    searchInFields(term, fields) {
        return this.search(term, fields);
    }
    configure(config) {
        this.config = { ...this.config, ...config };
    }
    validateSearchTerm(term) {
        if (!term || typeof term !== 'string') {
            throw new Error('Search term must be a non-empty string');
        }
        if (this.config.minLength && term.length < this.config.minLength) {
            throw new Error(`Search term must be at least ${this.config.minLength} characters`);
        }
        if (this.config.maxLength && term.length > this.config.maxLength) {
            throw new Error(`Search term cannot exceed ${this.config.maxLength} characters`);
        }
    }
}
exports.SearchFilter = SearchFilter;
//# sourceMappingURL=SearchFilter.js.map