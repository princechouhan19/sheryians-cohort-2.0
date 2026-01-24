Cohort 2.0 - Origin
* How to run script outside the browser
* What are packages
© How to install packages
© How to use packages
* What is server
* Create server with Express
* Program server to response to users
* Deploy server



## 1. How to Run Script Outside the Browser

- Normally, JavaScript runs inside a browser.
- To run JavaScript **outside the browser**, we use **Node.js**.
- Node.js provides a runtime environment to execute JS on a computer/server.

**Example:**

```bash
node app.js

```

---

## 2. What Are Packages

- **Packages** are reusable pieces of code written by other developers.
- They help avoid writing everything from scratch.
- Examples: `express`, `nodemon`, `mongoose`

---

## 3. How to Install Packages

- Node.js uses **npm (Node Package Manager)**.
- First initialize a project:

```bash
npm init -y

```

- Install a package:

```bash
npm install express

```

- Install as a development dependency:

```bash
npm install nodemon --save-dev

```

---

## 4. How to Use Packages

- Installed packages are used with `require()` or `import`.

**Example:**

```jsx
const express =require("express");

```

- The package functionality can now be used in the file.

---

## 5. What Is a Server

- A **server** is a program that:
    - Listens for client requests
    - Processes those requests
    - Sends back responses
- Servers usually run on a **port number** (e.g., 3000).

---

## 6. Create Server with Express (Basic Code)

### Step 1: Install Express

```bash
npm install express

```

### Step 2: Basic Server Code

```jsx
const express = require("express");

const app = express();



// server listen
app.listen(3000,() => {
console.log("Server started on port 3000");
});

```

### Step 3: Run Server

```bash
node index.js

```

```

---

## 2. What Are Packages

- **Packages** are reusable pieces of code written by other developers.
- They help avoid writing everything from scratch.
- Examples: `express`, `nodemon`, `mongoose`

---

## 3. How to Install Packages

- Node.js uses **npm (Node Package Manager)**.
- First initialize a project:

```bash
npm init -y

```

- Install a package:

```bash
npm install express

```

- Install as a development dependency:

```bash
npm install nodemon --save-dev

```

---

## 4. How to Use Packages

- Installed packages are used with `require()` or `import`.

**Example:**

```jsx
const express =require("express");

```

- The package functionality can now be used in the file.

---

## 5. What Is a Server

- A **server** is a program that:
    - Listens for client requests
    - Processes those requests
    - Sends back responses
- Servers usually run on a **port number** (e.g., 3000).

---

## 6. Create Server with Express (Basic Code)

### Step 1: Install Express

```bash
npm install express

```

### Step 2: Basic Server Code

```jsx
const express = require("express");

const app = express();



// server listen
app.listen(3000,() => {
console.log("Server started on port 3000");
});

```

### Step 3: Run Server

```bash
node index.js

```