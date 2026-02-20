# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Express Backend Notes (Integration Examples)

These are common Express patterns used in backend projects inside this cohort.

### 1) Serve Static Files

Use static middleware to serve HTML, CSS, JS, images, etc. from `public`:

```js
const express = require("express");
const app = express();

app.use(express.static("./public"));
```

If your `public` folder has `index.html`, it can open directly at `/`.

### 2) Use `__dirname` for Safe Absolute Paths

`__dirname` gives the current file directory and helps avoid path issues.

```js
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
```

This is better than relying only on relative paths when running from different folders.

### 3) Basic Middleware + Route Integration

Typical integration flow in one server:

```js
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, "public"))); // static files

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
```

### 4) `app.use("*", ...)` for Catch-All Handling

Use this when no route matched (often for 404 or fallback):

```js
app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});
```

Keep this at the end of your routes.

### 5) Named Path Middleware Example (`/:name`)

If you want middleware/route logic based on a dynamic segment:

```js
app.use("/:name", (req, res, next) => {
  console.log("Name param:", req.params.name);
  next();
});
```

Then visiting `/sherinas` gives `name = "sherinas"`.

### 6) Recommended Server Start Pattern

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

This supports local and deployment environments.
