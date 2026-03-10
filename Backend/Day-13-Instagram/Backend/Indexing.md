# Indexing in MongoDB


---

# 1 What is Indexing?

Indexing is a data structure technique that allows MongoDB to **find documents faster without scanning the entire collection**.

Without index → MongoDB scans every document
With index → MongoDB jumps directly to relevant data

---

# 2 Why Indexing is Necessary

Imagine:

You have 10 million users.

You run:

```js
db.users.find({ email: "ankur@gmail.com" })
```

Without index:

* MongoDB checks document 1
* Then 2
* Then 3
* ...
* Until 10,000,000

This is called:

> **COLLSCAN (Collection Scan)**

Time Complexity: **O(n)**

That does not scale.

---

# 3 How MongoDB Implements Indexing

MongoDB uses a **B+ Tree** data structure internally for indexes.

---

##  What is a B+ Tree?

A B+ Tree is a self-balancing tree structure optimized for:

* Disk-based storage
* Range queries
* Ordered data

Unlike binary trees:

* All data pointers are stored in leaf nodes
* Leaf nodes are connected (linked list style)
* Internal nodes only store keys (not full data)

---

## Structure of B+ Tree

![Image](https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/1_b-tree-indexing.jpg)

---

### Important Properties:

| Feature               | Why Important          |
| --------------------- | ---------------------- |
| Balanced Tree         | Search always O(log n) |
| Ordered Keys          | Supports range queries |
| Leaf Node Linking     | Fast sequential access |
| High Branching Factor | Low tree height        |

---

# 4 How Search Works (Step-by-Step)

Suppose indexed field:

```js
db.users.createIndex({ email: 1 })
```

Internally:

```
Root
  ├── node1
  ├── node2
  ├── node3
```

MongoDB:

1. Starts at root
2. Compares key
3. Moves to correct child
4. Reaches leaf node
5. Gets document pointer

Operations required:
logₙ(10,000,000) ≈ 3–4 steps

That’s insane improvement.

---

# 5 Creating Index in MongoDB

### Single Field Index

```js
db.users.createIndex({ email: 1 })
```

`1` → ascending
`-1` → descending

---

### Compound Index

```js
db.users.createIndex({ username: 1, age: -1 })
```

Important rule:

> Order matters in compound index.

---

### Unique Index

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

Prevents duplicate emails.

---

# 6 Regular Query vs Indexed Query

---

## Case 1: Without Index

```js
db.users.find({ email: "test@gmail.com" })
```

Execution Plan:

```
COLLSCAN
```

Meaning:

* Check every document
* Compare email
* Return match

Time Complexity: O(n)

If 5M records → slow

---

## Case 2: With Index

```js
db.users.createIndex({ email: 1 })
```

Now same query:

```
IXSCAN
```

Meaning:

* Search in B+ Tree
* Jump directly to document pointer

Time Complexity: O(log n)

Huge difference at scale.

---

# 7 Checking Execution Plan

Use:

```js
db.users.find({ email: "test@gmail.com" }).explain("executionStats")
```

Look for:

| Field             | Meaning                    |
| ----------------- | -------------------------- |
| COLLSCAN          | No index used              |
| IXSCAN            | Index used                 |
| totalDocsExamined | How many documents scanned |

If:

```
totalDocsExamined: 1
```

Perfect indexing.

If:

```
totalDocsExamined: 500000
```

Your index is useless.

---

# 8 Range Query Example (Why B+ Tree is Powerful)

```js
db.orders.find({
  price: { $gte: 1000, $lte: 5000 }
})
```

If indexed:

```js
db.orders.createIndex({ price: 1 })
```

Because B+ tree stores ordered keys:

* It finds 1000
* Then sequentially moves through linked leaf nodes
* Stops at 5000

Efficient.

This is why B+ tree > Hash indexing for range queries.

---

# 9 Types of Indexes in MongoDB

| Type         | Use Case                   |
| ------------ | -------------------------- |
| Single Field | Search by one field        |
| Compound     | Multiple filter fields     |
| Multikey     | Array fields               |
| Text         | Full-text search           |
| Hashed       | Sharding                   |
| TTL          | Auto-delete documents      |
| Sparse       | Index only existing fields |

---

# 10 Indexing in Mongoose (Express Example)

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  username: String,
  age: Number
});
```

Or:

```js
userSchema.index({ username: 1, age: -1 });
```

---

# 11 When NOT to Use Indexes

Indexes are not free.

They:

* Consume RAM
* Increase write cost
* Slow down insert/update
* Increase disk usage

Every insert must:

1. Insert document
2. Update B+ tree

More indexes = slower writes

---

# 12 Write Performance Tradeoff

If collection has 5 indexes:

Each insert updates 5 B+ trees.

That means:

Write cost ↑
Read speed ↑

Choose based on system needs.

---

# 13 Example: Followers Collection Index Strategy

Earlier we created:

```js
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ follower: 1 });
followSchema.index({ following: 1 });
```

Why?

Common queries:

* Who follows user X? → index on `following`
* Whom does X follow? → index on `follower`
* Prevent duplicate follow → compound unique index

This makes it scalable.

---

# 14 Deep Technical Insight

Why MongoDB uses B+ Tree instead of:

### Binary Search Tree?

Too tall.

### Hash Table?

Doesn't support range queries.

### B-Tree?

B+ Tree allows:

* Leaf-level sequential scan
* Better disk optimization
* More predictable IO pattern

Databases like:

* MySQL (InnoDB)
* PostgreSQL
* MongoDB

All use B+ Tree for indexing.

---

# 15 Real Impact at Scale

Let’s compare:

| Records | Without Index | With Index       |
| ------- | ------------- | ---------------- |
| 10K     | Fast          | Fast             |
| 100K    | Slower        | Fast             |
| 1M      | Very Slow     | Fast             |
| 10M+    | System Killer | Still manageable |

Indexing becomes mandatory at scale.

---

# Final Summary

Indexing in MongoDB:

* Implemented using B+ Tree
* Reduces search from O(n) → O(log n)
* Supports range queries efficiently
* Improves read performance drastically
* Slows down write performance slightly

Core understanding:

> Index is a sorted data structure stored separately that maps field value → document pointer.

Without index → MongoDB scans documents
With index → MongoDB navigates tree
