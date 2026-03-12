# Frontend Architecture – 4-Layer Model (React)

This note describes a simple, scalable way to structure a React frontend into **4 strict layers**:

```
UI (Presentation)
  ↓
Hooks (Orchestration)
  ↓
State (Memory)
  ↓
API (Backend Communication)
```

Each layer has a **single responsibility**. When layers leak into each other, technical debt starts.

---

## Quick Overview (Read This First)

### What each layer is for (with example + real-life use case)

| Layer | What it does (brief) | Tiny example | Real-life use case |
|---|---|---|---|
| **UI** | Renders screens/components and collects user input. Calls hooks, shows loading/error. | `onSubmit={() => login(email, pass)}` | Login form page, profile screen, post list UI |
| **Hooks** | Coordinates flows: call API, update state, decide what UI needs (loading/error). | `await loginApi(); setUser(user)` | Login flow, create-post flow, follow/unfollow flow |
| **State** | Stores app/feature data + derived values. No HTTP, no navigation. | `isAuthenticated = !!user` | Keep logged-in user in memory, cache feed list |
| **API** | Talks to backend via HTTP. Normalizes responses/errors. No React. | `axios.post('/auth/login', body)` | Central place to change endpoints/headers/token handling |

### Folder convention (example)

```
features/
  auth/
    pages/            # UI
    components/       # UI
    hooks/            # Orchestration
    store/ or *.context.tsx   # State
    services/         # API
```

---

## 1) UI Layer (Presentation Layer)

**Location**

```
features/*/pages/
features/*/components/
```

**Responsibility**

- Render UI
- Handle form input
- Trigger actions (`onClick`, `onSubmit`)
- Display loading and error states
- Navigate between routes

**UI must NOT**

- Call API directly
- Access cookies/localStorage
- Parse tokens
- Manage global state directly
- Contain business rules
- Know backend response structure

UI should be **dumb and declarative**.

**Example**

```jsx
const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
};
```

**Real-life use case**

- A login page that only collects email/password, calls `useAuth().login`, and shows “Logging in…” / error text.

**Why keep UI dumb?**

- Refactoring becomes safer
- Testing becomes easier
- Less duplication
- Business rules don’t leak into every component

---

## 2) Hooks Layer (Orchestration Layer)

**Location**

```
features/*/hooks/
```

Example:

```
useAuth.js
usePosts.js
```

### What does "orchestration" actually mean?

Think of the hook as a **manager at a restaurant**.

- The UI is the **waiter** (takes order from customer, shows the food).
- The API layer is the **kitchen** (makes the food).
- The State layer is the **order board** (tracks what's ready, what's cooking).
- The Hook is the **manager** — when the waiter says "new order", the manager tells the kitchen to cook, updates the order board, and tells the waiter when it's done.

The manager doesn't cook. The manager doesn't serve. The manager **coordinates**.

### Responsibility

- Receive intent from UI ("user wants to log in")
- Call the right API function
- Take the API response and update State
- Handle loading/error transitions
- Return a **simple interface** to UI (`{ handleLogin, loading, error }`)

### What the hook actually does step-by-step (login example)

```
1. UI calls handleLogin(username, password)
2. Hook sets loading = true, error = null        ← updates State
3. Hook calls loginApi(username, password)        ← calls API
4. API returns response
5. Hook sets user = response.user                 ← updates State
6. Hook sets loading = false                      ← updates State
7. UI automatically re-renders (because State changed)
```

### Full Example (from our codebase)

```js
import { useCallback, useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export function useAuth() {
    const { setUser, setLoading, setError, ...state } = useContext(AuthContext);

    const handleLogin = useCallback(async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setError, setLoading, setUser]);

    return { ...state, handleLogin };
}
```

Notice: the hook **does not store data itself**. It reads setters from State, calls API, and passes results into State.

### What UI sees vs what hook hides

| UI sees (simple) | Hook hides internally |
|---|---|
| `handleLogin(user, pass)` | Which API endpoint to call |
| `loading` (true/false) | When to flip loading on/off |
| `error` (object or null) | How to catch/normalize errors |
| `user` (object or null) | Where user data comes from |

UI doesn't know about `axios`, `loginApi`, `setUser`, or `setLoading`. It just calls one function and reads the result.

### Hooks must NOT

- Render UI or return JSX
- Directly manipulate DOM
- Contain infrastructure logic (like axios instance setup)
- Store data themselves — they write into **State**, not into local variables that persist

### Real-life use case

- `usePosts()` exposes `{ posts, isLoading, error, createPost, refresh }` — internally it calls `fetchPostsApi()`, updates `PostsContext`, and manages loading transitions. UI just renders `posts.map(...)` and shows a spinner when `isLoading` is true.

### Why this layer is critical

Without hooks as a middle layer:

```
UI → API directly  (Login.jsx imports axios and calls /auth/login)
```

This means:
- Every page duplicates loading/error handling
- Every page knows the backend URL structure
- Changing one API endpoint means editing 5 different components

With hooks:

```
UI → Hook → API    (Login.jsx calls handleLogin(), hook handles the rest)
```

- Logic lives in one place
- UI stays simple
- Changing the API only affects the hook

---

## 3) State Layer (Global or Feature State)

**Location**

```
features/*/*.context.jsx
```

OR

```
features/*/store/
```

### What is the State layer?

Think of it as a **shared whiteboard** mounted on the wall.

- Anyone (any component) can **look at** the whiteboard to see current data.
- Only authorized people (hooks) are allowed to **write on** it.
- The whiteboard itself doesn't decide what to write — it just holds the data and shouts "Hey, I changed!" so everyone looking at it can update.

State is **passive**. It stores values. It doesn't fetch, navigate, or decide.

### Responsibility

- Hold shared data (`user`, `posts`, etc.)
- Provide derived/computed values (`isAuthenticated = !!user`)
- Expose setter functions (`setUser`, `setLoading`, `setError`)
- Trigger re-renders when data changes

That's it. **Nothing else.**

### Full Example (from our codebase)

```jsx
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,   // ← derived value
            loading,
            error,
            setUser,                    // ← setter for hooks to call
            setLoading,
            setError,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
```

Notice what's **not** here: no `axios`, no `async/await`, no `try/catch`, no API imports. Pure storage.

### "But why does `loading` live in State if the Hook controls it?"

This is the most common confusion. Here's why:

- `loading` needs to be **shared** — multiple components (Login page, a navbar spinner, a disabled button) might need to know if auth is in progress.
- The **Hook decides when** to set loading true/false (that's orchestration).
- The **State holds the value** so any component anywhere in the tree can read it.

Analogy: The manager (hook) writes "COOKING" on the whiteboard (state). Both the waiter and the cashier can see it — they don't need to ask the manager directly.

### State vs Hooks — side-by-side

| | State Layer | Hooks Layer |
|---|---|---|
| **Purpose** | Hold data + expose setters | Coordinate actions + call setters |
| **Contains** | `useState`, `useMemo`, derived values | `async` functions, API calls, `try/catch` |
| **Knows about** | Nothing outside itself | State (to write) + API (to fetch) |
| **Analogy** | Whiteboard / Database | Manager / Controller |
| **Async logic?** | No | Yes |
| **Imports API?** | Never | Yes |
| **Example** | `const [user, setUser] = useState(null)` | `const res = await loginApi(); setUser(res.user)` |

### State layer must NOT

- Call API directly (no `axios`, no `fetch`)
- Navigate routes
- Render UI (it provides a `<Provider>`, but that just wraps children)
- Show alerts/toasts
- Handle cookies/localStorage directly
- Contain `async` functions or `try/catch` blocks

### Real-life use case

- `AuthContext` stores `{ user, loading, error }` and derived `isAuthenticated`, so:
  - The **Login page** can show a spinner when `loading` is true
  - The **Navbar** can show the username from `user`
  - A **ProtectedRoute** component can redirect when `isAuthenticated` is false
  - All of them read from the same shared state, without knowing how the data got there

### Why separate state from hooks?

**Hooks orchestrate. State stores.**

If you put API calls inside the context (state layer), you get:
- State that "does things" — hard to predict, hard to test
- Multiple async flows competing inside one provider
- No clear place to add a second consumer (e.g., a `useAuthStatus` hook that only reads, never writes)

If you keep state passive:
- You can write **multiple hooks** that read/write the same state differently
- State is predictable — you can look at the context and instantly know the shape of your data
- Testing is trivial — just check that the right values are in state

---

## 4) API Layer (Backend Communication Layer)

**Location**

```
features/*/services/
```

Example:

```
auth.api.ts
posts.api.ts
```

**Responsibility**

- Communicate with backend
- Send HTTP requests
- Normalize responses
- Normalize errors

This layer isolates the app from backend changes.

**Example**

```ts
export const loginApi = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
```
---

**API layer must NOT**

- Update React state
- Navigate
- Show UI errors
- Access React hooks
- Render anything

API layer should be **pure infrastructure**.

**Why this layer matters**

If UI talks directly to axios:

- Every component knows backend structure
- Backend changes break many files
- Error handling becomes duplicated

With an API layer:

- Only one file changes if the backend changes

---

## Full Request Flow Example

Login Flow:

```
User clicks Login button
    ↓
UI Layer calls login() from useAuth
    ↓
Hook Layer calls loginApi()
    ↓
API Layer sends request to backend
    ↓
Response returned to Hook
    ↓
Hook updates State Layer
    ↓
UI re-renders automatically
```

Each layer performs exactly one responsibility.

---

## Strict Layer Rules

### UI can talk to:

* Hooks

### Hooks can talk to:

* State
* API

### State can talk to:

* Nothing (pure storage)

### API can talk to:

* Backend only

No skipping layers.

---

## Common Architecture Mistakes

- UI calling API directly
- API updating React state
- State handling navigation
- Hooks manipulating cookies directly
- Business rules inside components

Every violation increases coupling.

---

## Conclusion

Your 4-layer frontend architecture consists of:

1. **UI Layer** – renders and interacts
2. **Hooks Layer** – orchestrates logic
3. **State Layer** – stores data
4. **API Layer** – communicates with backend

When each layer respects its boundary,
your React app remains scalable and maintainable.
