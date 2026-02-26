# 📸 Instagram Clone - Backend Development

![Instagram Clone Banner](instagram_clone_banner.png)

Welcome to the **Day 14** of the Backend Cohort! Today, we focused on building the core infrastructure for an Instagram-like application, focusing on robust authentication, media storage, and social features.

---

## 🚀 Key Features

### 🔐 1. Authentication System

- **User Registration**:
  - Securely saves user data to the database.
  - Generates and returns an authentication token upon successful registration.
  - **[Planned] OTP Based Registration**: Enhancing security via email/SMS verification.
- **Login**: Traditional credential-based login system.
- **Logout**: Implements secure sign-out logic.
  - **Token Blacklisting**: Ensures that once a user logs out, their previous token cannot be reused for unauthorized access.

### 🖼️ 2. Post Management

- **Create Posts**: Users can upload content (images/videos) with captions.
- **Social Feed**: A dynamic timeline showing posts from followed users.
- **Interactions**:
  - **Like Posts**: Implemented using optimized collection types for performance.
  - **Save Posts**: Allow users to bookmark their favorite content.

### 👥 3. User Relationships

- **Follow/Unfollow System**: Build a network of users.
- **Followers & Following**: Track user growth and social reach.

---

## ☁️ Media Storage

For profile pictures and post media, we are utilizing **[ImageKit.io](https://imagekit.io)**.

- **Benefits**: Real-time image optimization, resizing, and fast delivery via CDN.
- **Integration**: Seamlessly handles cloud uploads and returns manageable URLs for the database.

---

## 🛠️ Tech Stack

- **Node.js & Express**: Core backend framework.
- **MongoDB & Mongoose**: NoSQL database for flexible user and post schemas.
- **Crypto / MD5**: For initial password hashing experiments.
- **ImageKit**: Cloud-native image management.

---

## 📝 Lecture Notes Summary

- **Efficiency**: Using `$or` operators in Mongoose for single-query existence checks (checking both email and username simultaneously).
- **Security**: Moving towards JWT-based authentication with proper blacklisting on logout.
- **Schema Design**: Default profile images are hosted on ImageKit to ensure a consistent UI from day one.

---

## 🗺️ Project Structure

```text
src/
├── models/      # Database schemas (User, Post)
├── routes/      # API endpoints (Auth, Post)
├── config/      # Database & Service configurations
└── app.js       # Express application setup
```

---

> [!TIP]
> Always check for user existence using an optimized query to avoid redundant database calls. This improves API response times significantly.

---

Made with ❤️ by Prince Chouhan
