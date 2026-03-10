# Edge Collection in MongoDB

---

## 1 What is an Edge Collection?

An **Edge Collection** is a separate collection that stores **relationships between two documents**.

Instead of embedding relationships inside documents (like storing followers array inside user), we create a **dedicated collection** to represent connections.

It’s inspired by graph databases(you don't need to know graph databases yet) where:

- **Node** → User
- **Edge** → Relationship (Follow)

---

## 2 Why Not Store Followers Inside User?

You _could_ do this:

```js
{
  _id: userId,
  name: "Prince",
  followers: [userId1, userId2, userId3],
  following: [userId4, userId5]
} // Ye old way hai, jahan hum user ke andar hi array banate the
```

### Problems:

| Problem             | Why It’s Bad                                                             |
| ------------------- | ------------------------------------------------------------------------ |
| Large array growth  | A popular user(celebrity eg: Virat kohli) may have millions of followers |
| Document size limit | MongoDB has 16MB document limit                                          |
| Hard to scale       | Every follow/unfollow updates same document                              |
| Concurrency issues  | High contention on popular users                                         |

So instead of embedding, we create a **relationship collection**.

---

# 3 Edge Collection for Followers

## Collections Structure

### Users Collection

```js
{
  _id: ObjectId,
  username: String,
  email: String
} // User ka basic schema
```

---

### Follows Collection (Edge Collection)

```js
{
  _id: ObjectId,
  follower: ObjectId,   // kisne follow kiya
  following: ObjectId,  // kiske follow kiya
  createdAt: Date
} // Ye edge collection hai jo do users ke beech ka link store karta hai
```

Here:

- `follower` → source node
- `following` → destination node

This document represents:

> User A follows User B

---

# 4 Real World Example – Instagram Style

Imagine on Instagram:

If **User A follows User B**

We store:

```js
{
  follower: A,
  following: B
} // Simple mapping: User A ne User B ko follow kiya
```

This is exactly how large systems model relationships internally — not via arrays inside user document.

---

# 5 Schema Implementation (Mongoose)

### User Model

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
}); // Normal User model definition

module.exports = mongoose.model("User", userSchema);
```

---

### Follow Model (Edge Collection)

```js
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
); // Edge collection schema: follower aur following dono users hain

followSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = mongoose.model("Follow", followSchema);
```

### Why Unique Index?

To prevent:

```
User A follows User B multiple times
```

---

# 6 Follow API (Express)

### Follow User

```js
router.post("/follow/:id", async (req, res) => {
  const followerId = req.user.id; // from auth middleware
  const followingId = req.params.id;

  if (followerId === followingId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  const follow = await Follow.create({
    follower: followerId,
    following: followingId,
  }); // Nayi entry create karna edge collection mein

  res.json({ message: "Followed successfully" });
});
```

---

### Unfollow User

```js
router.delete("/unfollow/:id", async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  await Follow.findOneAndDelete({
    follower: followerId,
    following: followingId,
  }); // Entry delete karke unfollow karna

  res.json({ message: "Unfollowed successfully" });
});
```

---

# 7 Getting Followers List

```js
const followers = await Follow.find({ following: userId }).populate(
  "follower",
  "username email",
); // Mere followers nikalne ka logic
```

This means:

> Give me all users who follow this user.

---

# 8 Getting Following List

```js
const following = await Follow.find({ follower: userId }).populate(
  "following",
  "username email",
); // Jinhe main follow kar raha hoon unki list
```

---

# 9 Counting Followers Efficiently

Instead of fetching all documents:

```js
const count = await Follow.countDocuments({ following: userId }); // Count nikalne ke liye optimized tarika
```

---

# 10 Indexing for Performance

Always index:

```js
followSchema.index({ follower: 1 }); // Searching fast karne ke liye indexing
followSchema.index({ following: 1 });
```

Why?

Because queries will mostly be:

- Who follows X?
- Who does X follow?

Without index → Full collection scan
With index → O(log n)

---

# 11 Benefits of Edge Collection

| Feature                  | Benefit                    |
| ------------------------ | -------------------------- |
| Separate collection      | Clean separation of data   |
| Scales to millions       | No document growth issue   |
| Easy querying            | Simple find queries        |
| Works well with sharding | High scalability           |
| Graph-like modeling      | Supports complex relations |

---

# 12 Advanced: Mutual Followers (Common Friends)

```js
db.follows.aggregate([
  { $match: { follower: userA } },
  {
    $lookup: {
      from: "follows",
      localField: "following",
      foreignField: "follower",
      as: "mutual",
    },
  },
]); // Complex query for mutual friends
```

Edge collection makes graph-style queries possible.

---

# 13 When To Use Edge Collection?

Use it when:

- Many-to-many relationships
- High scalability requirement
- Relationship has metadata (timestamp, status)
- Social features (followers, friends, likes, connections)

Avoid it when:

- Relationship is small and bounded
- Low scale application

---

# Final Understanding

Edge collection means:

> Instead of storing relationships inside document,
> Store them as separate documents representing connections.

For followers feature:

- Users = Nodes
- Follows = Edges

That’s scalable system design.
