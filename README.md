Developed by **Xerion Team**

# QueryFilter Module

Universal query filter and search module for MongoDB with TypeScript support. Converts JSON filters and search queries into database queries with validation and type safety.

## 🚀 Installation

```bash
npm install git+https://github.com/xerion-tech/query-filter-module.git
```

## ✨ Quick Start

### Filter Usage

```typescript
import { QueryFilter, MongoDBAdapter } from 'query-filter-module';

const queryFilter = new QueryFilter(
  new MongoDBAdapter(),
  {
    name: { type: 'string', operators: ['eq', 'contains'] },
    status: { type: 'string', operators: ['eq', 'in'] },
    age: { type: 'number', operators: ['gte', 'lte'] }
  }
);

// Process filter from query string
const { query } = queryFilter.process(request.query.filter);

// Use with MongoDB
const results = await Model.find(query);
```

### Search Usage

```typescript
import { SearchFilter, MongoDBSearchAdapter } from 'query-filter-module';

const searchFilter = new SearchFilter(
  new MongoDBSearchAdapter(),
  {
    defaultFields: ['name', 'email'],
    defaultMode: 'contains',
    caseSensitive: false
  }
);

// Process search query
const { query } = searchFilter.search('John', ['name', 'email']);

// Use with MongoDB
const results = await Model.find(query);
```

## 📋 Filter Format

Send filters as JSON in query parameters:

```javascript
{
  "operator": "AND",
  "conditions": [
    { "field": "name", "operator": "contains", "value": "John" },
    { "field": "status", "operator": "in", "value": ["active", "pending"] },
    { "field": "age", "operator": "gte", "value": 18 }
  ]
}
```

URL: `/api/users?filter=${encodeURIComponent(JSON.stringify(filter))}`

## 🔍 Search Format

Send search queries as simple strings:

```javascript
// Search in default fields
const result = searchFilter.search('John');

// Search in specific fields
const result = searchFilter.search('John', ['name', 'email']);

// Search with different modes
searchFilter.configure({ defaultMode: 'exact' });
const result = searchFilter.search('john@example.com');
```

URL: `/api/users?search=John`

## 🔧 Configuration

### Filter Configuration

Define allowed fields and operators:

```typescript
const filterConfig = {
  name: { 
    type: 'string', 
    operators: ['eq', 'ne', 'contains', 'regex'] 
  },
  email: { 
    type: 'string', 
    operators: ['eq', 'contains'],
    dbField: 'emailAddress' // Map to different database field
  },
  age: { 
    type: 'number', 
    operators: ['eq', 'gt', 'gte', 'lt', 'lte'] 
  },
  active: { 
    type: 'boolean', 
    operators: ['eq'] 
  },
  created_at: { 
    type: 'date', 
    operators: ['gte', 'lte'] 
  }
};
```

### Search Configuration

Define searchable fields and options:

```typescript
const searchConfig = {
  defaultFields: ['name', 'email', 'description'],
  defaultMode: 'contains', // 'contains', 'exact', 'regex'
  caseSensitive: false,
  minLength: 2,
  maxLength: 100
};
```

## 🎯 Filter Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals | `{ field: 'status', operator: 'eq', value: 'active' }` |
| `ne` | Not equals | `{ field: 'status', operator: 'ne', value: 'banned' }` |
| `in` | In array | `{ field: 'status', operator: 'in', value: ['active', 'pending'] }` |
| `nin` | Not in array | `{ field: 'status', operator: 'nin', value: ['banned', 'deleted'] }` |
| `gt` | Greater than | `{ field: 'age', operator: 'gt', value: 18 }` |
| `gte` | Greater than or equal | `{ field: 'age', operator: 'gte', value: 18 }` |
| `lt` | Less than | `{ field: 'age', operator: 'lt', value: 65 }` |
| `lte` | Less than or equal | `{ field: 'age', operator: 'lte', value: 65 }` |
| `contains` | Substring search | `{ field: 'name', operator: 'contains', value: 'John' }` |
| `regex` | Regular expression | `{ field: 'email', operator: 'regex', value: '@gmail\\.com$' }` |

## 🔍 Search Modes

| Mode | Description | Example |
|------|-------------|---------|
| `contains` | Substring search (default) | `'John'` matches `'John Doe'` |
| `exact` | Exact match | `'John'` matches only `'John'` |
| `regex` | Regular expression | `'^John'` matches names starting with `'John'` |

## 📚 API Reference

### QueryFilter Class

```typescript
class QueryFilter<TFields, TQuery> {
  constructor(adapter: IQueryAdapter<TQuery>, config: IModelConfig)
  
  parse(queryString?: string): IFilter<TFields> | null
  validate(data: any): IFilter<TFields>
  build(filter: IFilter<TFields>): TQuery
  process(queryString?: string): IFilterResult<TQuery>
}
```

### SearchFilter Class

```typescript
class SearchFilter<TFields, TQuery> {
  constructor(adapter: ISearchAdapter<TQuery>, config: ISearchConfig<TFields>)
  
  search(term: string, fields?: TFields[]): ISearchResult<TQuery>
  searchInFields(term: string, fields: TFields[]): ISearchResult<TQuery>
  configure(config: Partial<ISearchConfig<TFields>>): void
}
```

### MongoDBAdapter

```typescript
// Filter adapter
import { MongoDBAdapter } from 'query-filter-module';

const adapter = new MongoDBAdapter({
  caseSensitive: false,
  enableRegexEscape: true,
  maxRegexLength: 100
});
```

### MongoDBSearchAdapter

```typescript
// Search adapter
import { MongoDBSearchAdapter, createMongoDBSearchAdapter } from 'query-filter-module';

// Basic usage
const searchAdapter = new MongoDBSearchAdapter();

// With options
const searchAdapter = createMongoDBSearchAdapter({
  caseSensitive: false,
  enableRegexEscape: true,
  maxSearchLength: 100
});
```

## 🛠️ Usage Examples

### Basic Filter Query

```typescript
const { query } = queryFilter.process(request.query.filter);
const users = await UserModel.find(query);
```

### Basic Search Query

```typescript
const { query } = searchFilter.search(request.query.search);
const users = await UserModel.find(query);
```

### Combined Filter and Search

```typescript
// Process both filter and search
const filterResult = queryFilter.process(request.query.filter);
const searchResult = searchFilter.search(request.query.search);

// Combine queries
const combinedQuery = {
  $and: [
    filterResult.query,
    searchResult.query
  ].filter(q => Object.keys(q).length > 0)
};

const users = await UserModel.find(combinedQuery);
```

### Aggregation Pipeline

```typescript
const { query: filterQuery } = queryFilter.process(request.query.filter);
const { query: searchQuery } = searchFilter.search(request.query.search);

const pipeline = [
  { 
    $match: {
      $and: [filterQuery, searchQuery].filter(q => Object.keys(q).length > 0)
    }
  },
  { $group: { _id: '$status', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
];

const results = await UserModel.aggregate(pipeline);
```

### Frontend Integration

```javascript
// Create filter object
const filter = {
  operator: 'AND',
  conditions: [
    { field: 'status', operator: 'eq', value: 'active' },
    { field: 'age', operator: 'gte', value: 18 }
  ]
};

// Send to API
const params = new URLSearchParams();
if (filter) params.append('filter', JSON.stringify(filter));
if (searchTerm) params.append('search', searchTerm);

const response = await fetch(`/api/users?${params}`);
```

### Advanced Search Configuration

```typescript
const searchFilter = new SearchFilter(
  new MongoDBSearchAdapter({
    caseSensitive: false,
    enableRegexEscape: true
  }),
  {
    defaultFields: ['name', 'email'],
    defaultMode: 'contains',
    caseSensitive: false,
    minLength: 3,
    maxLength: 50
  }
);

// Dynamic configuration
searchFilter.configure({
  defaultMode: 'exact',
  caseSensitive: true
});

// Search in specific fields
const result = searchFilter.searchInFields('john@example.com', ['email']);
```

## 📝 TypeScript Support

```typescript
// Define your field types
type UserFields = 'name' | 'email' | 'age' | 'status' | 'created_at';

// Create typed filter
const queryFilter = new QueryFilter<UserFields>(
  new MongoDBAdapter(),
  {
    name: { type: 'string', operators: ['eq', 'contains'] },
    email: { type: 'string', operators: ['eq', 'contains'] },
    age: { type: 'number', operators: ['gte', 'lte'] },
    status: { type: 'string', operators: ['eq', 'in'] },
    created_at: { type: 'date', operators: ['gte', 'lte'] }
  }
);

// Create typed search
const searchFilter = new SearchFilter<UserFields>(
  new MongoDBSearchAdapter(),
  {
    defaultFields: ['name', 'email'],
    defaultMode: 'contains',
    caseSensitive: false
  }
);

// TypeScript will validate field names
const filterResult = queryFilter.process(filterString);
const searchResult = searchFilter.search('John', ['name', 'email']);
```

