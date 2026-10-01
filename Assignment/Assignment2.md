# Assignment 2 — PostgreSQL as SQL + NoSQL (JSONB)

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Part A — Conceptual questions

### 1. How are `json` and `jsonb` different?

PostgreSQL has two data types for JSON data. The `json` type keeps the original input text, including its spacing and the order of keys. PostgreSQL checks that the text is valid JSON when it is inserted, but parsing that text again during later operations takes work. The `jsonb` type converts the input into a binary representation when writing it. That conversion can make an insert a little slower, but querying particular keys repeatedly is generally faster because the database can process the stored structure directly. It also allows useful GIN indexes. JSONB does not preserve whitespace or the original key order, and duplicate object keys collapse so the last value wins. If an application really needs the exact original JSON text, `json` is appropriate. For searching product attributes, `jsonb` is the practical choice. Neither type automatically turns a document into normal relational columns: I still keep stable values such as product ID and price as ordinary columns.

```sql
SELECT '{"a":1,"a":2}'::jsonb ->> 'a' AS last_value; -- '2'
```

### 2. Why mix strict columns and variable JSONB attributes?

Some product properties apply to every row. ID identifies a product, name labels it, category groups it, and price is needed for calculations. I make these normal columns with suitable types and `NOT NULL` checks. A book might have an author and a page count, while a mouse might have wireless support and a DPI value. Trying to add a nullable column for every possible product property would make the table wide and awkward. Putting the differing properties in `attributes JSONB` lets each category store its useful details without changing the table every time a new product type appears. The tradeoff is that a JSONB key has no automatic per-key type rule: a mistyped `"ram_gb"` or a string in place of a number must be caught by application checks or an explicit database constraint. Stable, important fields should remain typed columns. This is a hybrid model: SQL still handles primary keys, joins, transactions and prices, while JSONB handles the flexible part.

```sql
CREATE TABLE products (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  attributes JSONB
);
```

### 3. What do `->`, `->>`, `@>` and `?` do?

These operators let a query inspect JSONB without downloading every document first. `->` extracts a field as a JSON value, so `attributes->'wireless'` returns the JSON boolean `true`. `->>` extracts it as SQL text, so `attributes->>'wireless'` returns the text `'true'`. That difference matters when making comparisons or casting a numeric field: `(attributes->>'ram_gb')::integer` can be compared numerically. The containment operator `@>` asks whether the JSONB value on the left contains the object or values on the right. For instance, it matches products whose attributes contain the boolean `"wireless": true`, even if they have additional keys. The key-existence operator `?` asks whether a string is a top-level key in the object. It does not check the key's value: both true and false values satisfy `attributes ? 'wireless'`. A missing field generally returns SQL NULL with the extraction operators, so I check existence or use appropriate NULL handling when a field is optional.

```sql
SELECT attributes->'wireless' AS json_value,
       attributes->>'wireless' AS text_value
FROM products WHERE name = 'Wireless Mouse';
SELECT name FROM products WHERE attributes @> '{"wireless":true}'::jsonb;
SELECT name FROM products WHERE attributes ? 'author';
```

### 4. What does a GIN index improve?

A GIN index records searchable parts of a JSONB document, such as keys and values. For our table, the default `jsonb_ops` GIN index on `attributes` can help queries that use `@>` containment or `?` key existence on that column. It is useful when there are many rows and the condition selects only a small portion of them. PostgreSQL can then find matching candidates through the index rather than scanning every product. The index has costs: it uses storage, adds work to inserts and updates, and is not guaranteed to be chosen by the planner. With only five rows, a sequential scan is often cheaper; a tiny demonstration cannot prove a speedup. A general GIN index on the whole JSONB column also does not automatically speed up a range comparison on a cast extracted text value such as `(attributes->>'ram_gb')::integer >= 16`; that expression needs a suitable expression index if it becomes a real performance problem. `EXPLAIN ANALYZE` shows both the chosen plan and actual execution timing, which can be compared before and after creating the index.

```sql
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
EXPLAIN ANALYZE SELECT name FROM products
WHERE attributes @> '{"wireless":true}'::jsonb;
```

### 5. When use PostgreSQL JSONB instead of MongoDB?

I would choose PostgreSQL when products are part of a relational application with orders, customers and payments. Its tables make required fields and types explicit; foreign keys and joins connect related records; and a transaction can update multiple tables consistently. JSONB gives me room for category-specific product properties inside that structure. MongoDB stores whole documents in a collection, which can be convenient when most access reads a document as one unit and the shape changes often. It has transactions too, including transactions spanning multiple documents, and supports joins through aggregation, but their design and usage differ from ordinary SQL joins. MongoDB also supports sharding across servers for horizontal scaling. PostgreSQL has ways to partition and scale, yet a single basic PostgreSQL installation does not magically shard the table. My decision depends on queries and data relationships, not on the claim that one system is always faster. For this exercise, PostgreSQL shows how relational rules and JSONB can coexist, while the MongoDB version shows the same products as documents.

```sql
SELECT p.name, p.attributes->>'author' AS author
FROM products AS p
WHERE p.category = 'Books';
```

## Part B — Practical work

Run the following in `psql` against a practice database. Task 1 creates the table; Task 2 inserts five products from three categories.

```sql
CREATE TABLE products (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  attributes JSONB
);

INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code', 'Books', 499.00, '{"author":"Robert C. Martin","pages":464}'),
('Atomic Habits', 'Books', 399.00, '{"author":"James Clear","pages":320}'),
('Wireless Mouse', 'Electronics', 799.00, '{"wireless":true,"dpi":1600}'),
('USB Keyboard', 'Electronics', 999.00, '{"wireless":false,"keys":104}'),
('Cotton T-Shirt', 'Clothing', 599.00, '{"size":"M","color":"Blue"}');
```

### Task 3 — Query one specific attribute in each category

```sql
SELECT name, attributes->>'author' AS author
FROM products
WHERE category = 'Books' AND attributes->>'author' = 'James Clear';
-- Atomic Habits

SELECT name, attributes->>'dpi' AS dpi
FROM products
WHERE category = 'Electronics' AND (attributes->>'dpi')::integer >= 1600;
-- Wireless Mouse

SELECT name, attributes->>'size' AS size
FROM products
WHERE category = 'Clothing' AND attributes->>'size' = 'M';
-- Cotton T-Shirt
```

### Task 4 — JSONB containment

```sql
SELECT name FROM products
WHERE attributes @> '{"wireless":true}'::jsonb;
-- Wireless Mouse
```

### Task 5 — Add a property without replacing other attributes

```sql
UPDATE products
SET attributes = attributes || '{"discount_pct":10}'::jsonb
WHERE name = 'Wireless Mouse';

SELECT name, attributes FROM products WHERE name = 'Wireless Mouse';
-- wireless, dpi and discount_pct are present together
```

### Task 6 — Compare query plans before and after indexing

Run the first three commands **before** creating the index. Then create the index and rerun the same queries. The containment query from Task 4 is included because it is supported by the default JSONB GIN index.

```sql
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Books' AND attributes->>'author' = 'James Clear';
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Electronics' AND (attributes->>'dpi')::integer >= 1600;
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Clothing' AND attributes->>'size' = 'M';
EXPLAIN ANALYZE SELECT name FROM products
WHERE attributes @> '{"wireless":true}'::jsonb;

CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Books' AND attributes->>'author' = 'James Clear';
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Electronics' AND (attributes->>'dpi')::integer >= 1600;
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'Clothing' AND attributes->>'size' = 'M';
EXPLAIN ANALYZE SELECT name FROM products
WHERE attributes @> '{"wireless":true}'::jsonb;
```

For each local run, copy the `Execution Time` and plan node from its `EXPLAIN ANALYZE` output:

| Query | Before index: plan / execution time | After index: plan / execution time |
|---|---|---|
| Books, author | To record locally | To record locally |
| Electronics, DPI | To record locally | To record locally |
| Clothing, size | To record locally | To record locally |
| Wireless containment | To record locally | To record locally |

The first three use extracted values and will normally remain sequential scans with this general GIN index. Containment is index eligible, but on five rows PostgreSQL may still choose a sequential scan. Timings must come from the same local database; none are invented here.

### Task 7 — The same products in MongoDB

Run in `mongosh` using a practice database:

```javascript
use backend_assignment2
db.products.insertMany([
  { name: "Clean Code", category: "Books", price: 499, attributes: { author: "Robert C. Martin", pages: 464 } },
  { name: "Atomic Habits", category: "Books", price: 399, attributes: { author: "James Clear", pages: 320 } },
  { name: "Wireless Mouse", category: "Electronics", price: 799, attributes: { wireless: true, dpi: 1600, discount_pct: 10 } },
  { name: "USB Keyboard", category: "Electronics", price: 999, attributes: { wireless: false, keys: 104 } },
  { name: "Cotton T-Shirt", category: "Clothing", price: 599, attributes: { size: "M", color: "Blue" } }
]);

db.products.find({ category: "Books", "attributes.author": "James Clear" }, { _id: 0, name: 1, "attributes.author": 1 });
db.products.find({ category: "Electronics", "attributes.dpi": { $gte: 1600 } }, { _id: 0, name: 1, "attributes.dpi": 1 });
db.products.find({ category: "Clothing", "attributes.size": "M" }, { _id: 0, name: 1, "attributes.size": 1 });
db.products.find({ "attributes.wireless": true }, { _id: 0, name: 1 });
```

Both systems can hold category-specific data. PostgreSQL uses typed columns plus JSONB operators and a GIN index; MongoDB uses dot paths inside documents and can index those paths individually (for example `db.products.createIndex({ "attributes.author": 1 })`). The MongoDB syntax is shorter for these document filters, while PostgreSQL also provides familiar SQL tables, joins and constraints for related records. This is a comparison of the commands, not a benchmark.

---
Saksham Katiyar · SAP ID: 590015169
