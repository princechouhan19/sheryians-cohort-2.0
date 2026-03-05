# 📸 Instagram Clone - Backend Development

![Instagram Clone Banner](instagram_clone_banner.png)

Welcome to **Day 13** of the Backend Cohort! This session completed the second half of the Instagram Clone lecture. We focused on refactoring the project into a professional **MVC architecture** using Controllers, integrating **Multer** for file uploads, and connecting **ImageKit** for cloud-based media storage.

---

## 🚀 Key Features

### 🔐 1. Authentication System

- **User Registration** — Saves user data securely, hashes the password with `bcrypt`, and returns a JWT token on success.
- **Login** — Supports login via either **email** or **username** + password using a single `$or` query.
- **Logout** — _(Planned)_ Token blacklisting to prevent reuse of revoked tokens.

### 🖼️ 2. Post Management

- **Create Post** — Accepts an image file (via `form-data`) and a caption.
- **Get User Posts** — Fetch all posts created by the authenticated user.
- **Post Details** — Retrieve specific post details with strict ownership verification.
- **JWT Authorization** — Securely identifies the user via tokens stored in cookies.
- **ImageKit Folders** — Organized storage of media in specific project folders.
- **Social Feed** — _(Planned)_ Dynamic timeline showing posts from followed users.
- **Interactions** — _(Planned)_ Like and Save posts.

### 👥 3. User Relationships _(Planned)_

- Follow / Unfollow system
- Followers & Following counts

---

## 🛠️ Tech Stack

| Package            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `express`          | Core HTTP server & routing                     |
| `mongoose`         | MongoDB ODM & schema modeling                  |
| `bcryptjs`         | Password hashing                               |
| `jsonwebtoken`     | JWT generation & verification                  |
| `cookie-parser`    | Reading cookies from requests                  |
| `multer`           | Parsing `multipart/form-data` for file uploads |
| `@imagekit/nodejs` | Cloud image upload & delivery                  |
| `dotenv`           | Managing environment variables (`.env`)        |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

---

## 🏗️ Architectural Pattern: MVC with Controllers

### Why Controllers?

Route files should only define **paths** and **HTTP methods** — they must not contain business logic. All logic (DB queries, hashing, token generation) lives in dedicated **Controller** files.

```
Without Controllers (❌ messy)          With Controllers (✅ clean)
─────────────────────────────           ─────────────────────────────
router.post('/register', async          router.post('/register',
  (req, res) => {                         authController.registerController)
    // 50 lines of logic here
  })
```

**Benefits:**

- **Cleaner route files** — easy to read at a glance
- **Scalability** — adding features (Likes, Comments) doesn't clutter routes
- **Reusability** — the same controller can be reused across multiple routes

---

## 📂 Project Structure

```text
Day-13-Instagram/
├── server.js              # Entry point — starts the HTTP server
└── src/
    ├── app.js             # Express app setup, middleware & route mounting
    ├── controllers/
    │   ├── auth.controller.js   # Register & Login logic
    │   └── post.controller.js   # Create post + ImageKit upload
    ├── models/
    │   ├── user.model.js        # User schema (username, email, password, bio, profile_image)
    │   └── post.model.js        # Post schema
    ├── routes/
    │   ├── auth.routes.js       # Registration & Login
    │   └── post.routes.js       # Create Post, Get User Posts, Post Details
    └── config/
        └── database.js          # MongoDB connection
```

---

## 📡 API Routes

### Auth Routes — `/api/auth`

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| `POST` | `/api/auth/register` | Register a new user, returns JWT token |
| `POST` | `/api/auth/login`    | Login with email/username + password   |

### Post Routes — `/api/posts`

| Method | Endpoint                     | Body (form-data)          | Auth Required | Description                                      |
| ------ | ---------------------------- | ------------------------- | ------------- | ------------------------------------------------ |
| `POST` | `/api/posts`                 | `caption`, `image` (file) | **Yes (JWT)** | Create a new post, uploads image to ImageKit     |
| `GET`  | `/api/posts`                 | -                         | **Yes (JWT)** | Fetch all posts of the logged-in user            |
| `GET`  | `/api/posts/details/:postId` | -                         | **Yes (JWT)** | Get specific post details (with ownership check) |

---

## 📝 Concept Notes

### 🔒 Password Hashing with bcrypt

```js
// Hash on register (salt rounds = 10)
const hash = await bcrypt.hash(password, 10);

// Compare on login
const isPasswordValid = await bcrypt.compare(password, user.password);
```

- The **salt rounds** (10) make the hash computationally expensive — harder to brute-force.
- Never store plain-text passwords. Always store the hash.

---

### 🗄️ Efficient Duplicate User Check (`$or` operator)

Instead of making two separate DB queries (one for email, one for username), use a single `$or` query:

```js
// ❌ Less efficient — two queries
const byEmail = await userModel.findOne({ email });
const byUsername = await userModel.findOne({ username });

// ✅ Efficient — single query
const exists = await userModel.findOne({
  $or: [{ email }, { username }],
});
```

---

### 📁 File Uploads with Multer

When a route needs to accept a file (e.g., an image for a post), the `multipart/form-data` content type is used. **Multer** is the Express middleware that parses this.

```js
// In post.routes.js
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);
```

**Storage options:**

| Option            | Where file is stored   | Use case                                                    |
| ----------------- | ---------------------- | ----------------------------------------------------------- |
| `memoryStorage()` | RAM (temporary buffer) | When uploading directly to a cloud service (e.g., ImageKit) |
| `diskStorage()`   | Server disk            | When keeping files locally (not recommended for production) |

After Multer processes the request, the file is available as **`req.file`**.

```js
// Inside the controller
console.log(req.file); // { buffer, originalname, mimetype, size, ... }
```

> **Why not store images on the server?**  
> Storage is expensive, bandwidth is expensive, and scaling is harder. Cloud providers (ImageKit, Cloudinary, S3) handle CDN delivery, optimization, and scalability for you.

---

### ☁️ Cloud Image Storage with ImageKit

**ImageKit** is used for uploading and serving all profile pictures and post media.

**Why ImageKit (or any cloud provider)?**

- Real-time image resizing and optimization
- Fast global delivery via CDN
- No server storage cost

**Integration flow:**

```js
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Convert buffer from Multer → upload to ImageKit
const file = await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), "file"),
  fileName: "post-image",
});

// 'file.url' is what gets stored in the database
```

**Sample ImageKit upload response:**

```json
{
  "fileId": "69a54c795c7cd75eb8cc9c5c",
  "name": "Test_hg8uQbJQJ",
  "filePath": "/Test_hg8uQbJQJ",
  "url": "https://ik.imagekit.io/princechouhan/Test_hg8uQbJQJ",
  "fileType": "image",
  "height": 400,
  "width": 400,
  "thumbnailUrl": "https://ik.imagekit.io/princechouhan/tr:n-ik_ml_thumbnail/Test_hg8uQbJQJ"
}
```

**Installation:**

```bash
npm install @imagekit/nodejs
```

**Resources:**

- [ImageKit Node.js SDK Docs](https://github.com/imagekit-developer/imagekit-nodejs)
- [All recommended docs by Ankur Bhaiya](https://github.com/ankurdotio/Difference-Backend-video/)

---

## 🔐 JWT Authorization & Scope Handling

### 🛡️ Token-Based Authorization

To ensure only logged-in users can create posts, we verify the **JWT** stored in the user's cookies. If the token is missing or invalid, the request is rejected.

### 🧠 The "Scope Issue" in JavaScript

When using `try-catch` blocks for operations like `jwt.verify()`, variables declared with `let` or `const` inside the `try` block are **block-scoped**. This means they cannot be accessed outside that block.

**❌ Problem: Inner Scope Limitation**

```js
try {
  const decoded = jwt.verify(token, secret);
} catch (err) {
  /* ... */
}
console.log(decoded); // ReferenceError: decoded is not defined
```

**✅ Solution: Declare outside, assign inside**

By declaring the variable outside the `try` block, we ensure it is accessible to the rest of the function (e.g., when saving the post to the database).

```js
let decoded; // Declared in the function scope
try {
  decoded = jwt.verify(token, secret);
} catch (err) {
  /* handle error */
}
// Now 'decoded' is accessible here!
```

---

## 📁 Organized Cloud Storage (ImageKit)

To maintain a clean storage environment, we now specify a folder path during the upload process. Posts are organized under:
`Cohort-20/Instagram-clone/Posts`

```js
const file = await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), "file"),
  fileName: "post-image",
  folder: "Cohort-20/Instagram-clone/Posts", // 👈 Clean organization
});
```

---

## 🔒 Post Ownership Verification

When fetching a single post's details, it's crucial to verify if the post belongs to the requesting user. In MongoDB, IDs are stored as `ObjectIDs`. To compare them with the user ID from the JWT (which is a string), we must convert the post's user ID to a string or use Mongoose's `.equals()` method.

```js
const userId = decoded.id;
const post = await postModel.findById(postId);

// ❌ Comparison fails if types differ (Object vs String)
// if (post.user == userId) { ... }

// ✅ Correct way: Convert to string or use .equals()
const isValidUser = post.user.toString() === userId;

if (!isValidUser) {
  return res.status(403).json({ message: "Forbidden Content" });
}
```

---

---

## 🏗️ Advanced Pattern: Edge Collections

As discussed in today's lecture, when building scalable social systems like Instagram, we avoid storing "Followers" or "Following" as arrays inside the User document.

### Why not arrays?

- **Document Size**: MongoDB has a 16MB limit. Celebrities with millions of followers would break this.
- **Performance**: High contention when multiple people follow/unfollow the same user simultaneously.
- **Complexity**: Difficult to query "Mutual followers" or "Followers of followers".

### The Solution: Edge Collections

We create a separate collection (e.g., `Follows`) where each document represents a single "Edge" or relationship between two "Nodes" (Users).

```js
{
  follower: ObjectId("user_A"),
  following: ObjectId("user_B")
}
```

This scales to millions of relationships and allows for complex graph-like queries.

---

## 🐞 Known Issue: Postman File Upload Error

### The Error

When uploading a file via Postman (`form-data → file`), you may see:

```
EPERM: insecure file access outside working directory
```

### Cause

This is a **Postman security restriction** — not a backend issue. Postman blocks access to files outside its configured working directory.

### ✅ Fix

1. Open **Postman**
2. Go to **Settings → General**
3. Enable: **"Allow reading files outside working directory"**
4. Restart Postman

After enabling this, `form-data` file uploads will work correctly.

---

> [!TIP]
> Always check for user existence using a single `$or` query instead of two separate `findOne` calls. This halves the number of round-trips to the database and improves API response time.

> [!NOTE]
> The default profile image is hosted on ImageKit (`Default_user720.webp`) and set via the `default` field in the Mongoose schema. This ensures every new user has a valid avatar from day one.

---

## 🛡️ Refactoring: Auth Middleware

To avoid repeating token verification logic across multiple controllers, we've implemented a centralized **Auth Middleware** (`identifyUser`).

### How it works:

1.  **Extracts Token**: Reads the JWT from `req.cookies.token`.
2.  **Verifies JWT**: Uses `jwt.verify` to validate the session.
3.  **Injects User**: Attaches the `decoded` payload (user ID, email, etc.) to the `req.user` object.
4.  **Next Middleware**: Calls `next()` to pass control to the actual controller.

```js
// src/middlewares/auth.middleware.js
async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Now accessible in any controller!
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
```

This ensures our controllers remain lean and focused only on business logic.

---

Made with ❤️ by Prince Chouhan
