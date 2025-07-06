export type FilterOperator = 'eq' | 'ne' | 'in' | 'nin' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'regex';
export type FilterLogicalOperator = 'AND' | 'OR';
export type FilterFieldType = 'string' | 'number' | 'boolean' | 'date';
export type FilterValue = string | number | boolean | (string | number)[];
export type AllowedOperators = FilterOperator[];
//# sourceMappingURL=filter.types.d.ts.map