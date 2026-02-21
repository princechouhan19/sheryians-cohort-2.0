# 1. Authentication

## What is Authentication?

**Authentication = Who are you?**

It checks **user identity**.

Examples:

- Login with email & password
- Login with OTP
- Login with Google

### Real-life analogy

> Showing your **ID card** at the gate
> 

---

## Basic Authentication Flow

1. User signs up
2. Password is **hashed**
3. User logs in
4. Server verifies password
5. Server issues **JWT token**

---

# 2. Authorization

## What is Authorization?

**Authorization = What are you allowed to do?**

It checks **permissions / roles**.

Examples:

- Only admin can delete users
- Only logged-in user can update their profile

### Real-life analogy

> You entered the building (auth)
> 
> 
> But only managers can enter the server room (authorization)
> 

---

# 3. Validation

## What is Validation?

**Validation = Is the data correct?**

It checks **input correctness** before saving.

Examples:

- Email format valid?
- Password length >= 6?
- Required fields present?

---

## Types of Validation

1. **Frontend validation**
2. **Backend validation**
3. **Database validation (Mongoose)**

---

## Example: Validation using Mongoose

```jsx
email: {
type:String,
required:true,
unique:true,
match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

```

---

## Example: Validation using Express

```jsx
if (!email || !password) {
return res.status(400).json({message:"All fields required" });
}

```

---

## Example: Validation using express-validator

```bash
npm install express-validator

```

```jsx
const { body, validationResult } =require("express-validator");

app.post("/register",
body("email").isEmail(),
body("password").isLength({min:6 }),
(req, res) => {
const errors =validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({errors: errors.array() });
    }
    res.send("Valid Data");
});

```

---

# 4. Verification

## What is Verification?

**Verification = Proving something is real or confirmed**

Usually happens **after authentication**

Examples:

- Email verification
- OTP verification
- Phone number verification

---

## Email Verification Flow

1. User registers
2. Server sends verification link
3. User clicks link
4. Account becomes verified

---

##