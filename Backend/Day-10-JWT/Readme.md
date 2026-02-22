# Day 10 - JWT (Register Flow)

```md
![JWT Flow](./Diagram.svg)
```

This project covers JWT basics using Node.js, Express, MongoDB, and cookies.

## Learning Summary

In this lecture, you implemented:

- Mongoose `userSchema` and `userModel`.
- Unique email handling in schema.
- Auth route with `express.Router()`.
- Existing-user check with `findOne({ email })`.
- Custom `400` response for duplicate email.
- JWT creation using `jwt.sign()` and `JWT_SECRET`.
- Cookie setup using `cookie-parser` and `res.cookie()`.
- API mounting in app with `app.use("/api/auth", authRouter)`.

## Flow You Built

1. Client sends register data (`name`, `email`, `password`).
2. Server checks if email already exists.
3. If duplicate, return `400` with message.
4. If not, create user in MongoDB.
5. Generate JWT with user `id` and `email`.
6. Save token in cookie (`jwt_token`).
7. Return `201` with success response.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- `jsonwebtoken`
- `cookie-parser`
- `dotenv`

## Project Structure

```text
Day-10-JWT/
  server.js
  package.json
  Readme.md
  src/
    app.js
    config/
      database.js
    models/
      user.model.js
    routes/
      auth.routes.js
```

## Environment Variables

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run Locally

```bash
npm install
npm run dev
```

Server starts on `http://localhost:3000`.

## API

### `POST /api/auth/register`

Request body:

```json
{
  "name": "c_test",
  "email": "c_test@test.com",
  "password": "c_password_test"
}
```

Success (`201`):

```json
{
  "message": "user Registered successfully",
  "user": {
    "_id": "...",
    "name": "c_test",
    "email": "c_test@test.com",
    "password": "c_password_test"
  },
  "token": "..."
}
```

Duplicate email (`400`):

```json
{
  "message": "email already exists with this email"
}
```

## Notes

- This is a learning version focused on JWT generation in registration.
- Password hashing and secure cookie options are not added yet.
- If you want to show your SVG diagram in README, add `Diagram.svg` in this folder and use:
