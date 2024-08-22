# Node.js HTTP and HTTPS Server Exercises

## Introduction

In these exercises, you'll learn how to restructure your project so far and to use express.Router(), then you will learn to set up both HTTP and HTTPS servers using Node.js. You'll also generate SSL certificates, serve an HTML form over HTTPS, and handle form submissions securely. These skills are crucial for developing secure web applications.

---

## Exercise 1: Restructuring Express Routes Using `express.Router()`

### Objective

Refactor your existing Express routes into a separate router module using `express.Router()`. This will prepare your project for more complex routing and better organization.

### Learning Explanation

#### What is `express.Router()`?

`express.Router()` is a built-in Express module that allows you to organize your route handlers into modular, mountable route handlers. A `Router` instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

Using `express.Router()` helps in:

- **Organizing Routes**: Keep your route definitions in separate files or modules for better maintainability.
- **Modularity**: Group related routes together, making it easier to manage and scale your application.

### Instructions

1. **Step 1:** Create a new file named `routes.ts` in your project directory.

   - **Explanation:** This file will hold all the route definitions that were previously in `index.ts`.

2. **Step 2:** Move all route definitions from `index.ts` to `routes.ts`.

    - **Explanation:** Moving the routes to a dedicated file will keep your `index.ts` clean and focused on application setup.

3. **Step 3:** Change `app.get()` (and other `app` methods) to `router.get()` (and other `router` methods).

    ```typescript
    // routes.ts
    import express, { Request, Response, NextFunction } from 'express';
    import { students, Student } from './dummyData';
    import { getHelloMessage } from './helpers';

    const router = express.Router();

    // Root route to display the custom message
    router.get('/', (req: Request, res: Response) => {
        res.send(getHelloMessage());
    });

    // Other routes (GET, POST, PUT, DELETE) go here...
    ```

    - **Explanation:** The `router` instance is a mini Express application. By switching from `app.get()` to `router.get()`, you are making your routes modular and easier to manage. The `router` instance will later be integrated into the main Express application.

4. **Step 4:** Export the `router` from `routes.ts`.

    ```typescript
    export default router;
    ```

    - **Explanation:** Exporting the router allows it to be imported and used in `index.ts`. This makes your route definitions modular and reusable.

5. **Step 5:** Move route-specific middleware into `routes.ts`.

    ```typescript
    // Validation middleware for POST requests
    const validateStudent = (req: Request, res: Response, next: NextFunction) => {
        const { id, name, grade } = req.body;
        if (typeof id !== 'number' || typeof name !== 'string' || typeof grade !== 'string') {
            return res.status(400).json({ message: 'Invalid student data' });
        }
        next();
    };

    router.post('/students', validateStudent, (req: Request, res: Response) => {
        const newStudent: Student = req.body;
        students.push(newStudent);
        res.status(201).json(newStudent);
    });
    ```

    - **Explanation:** Route-specific middleware, such as validation, should be kept close to the routes it applies to. This keeps your code organized and easier to understand.

6. **Step 6:** Import the `router` into `index.ts` and use it.

    ```typescript
    import express, { Request, Response, NextFunction } from 'express';
    import { port } from './config';
    import { logServerMessage } from './logger';
    import router from './routes';

    const app = express();
    app.use(express.json());

    // Middleware for logging requests
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} request to ${req.url}`);
        next();
    });

    // Use the router for handling routes prefixed with /api
    app.use('/api', router);

    app.listen(port, () => logServerMessage(`Server running on port ${port}`));
    ```

    - **Explanation:** The `router` is now imported into `index.ts` and mounted with the prefix `/api`. This keeps `index.ts` clean and modular, with a clear separation between the application setup and the route handling.

### Best Practices

- **Organizing Routes:** Using `express.Router()` keeps your project modular, making it easier to scale and maintain.
- **Middleware Placement:** Place global middleware (like logging) in `index.ts` and route-specific middleware (like validation) in the route modules themselves.

### Outcome

After completing this exercise, your project will be more organized, making it easier to manage as it scales.


