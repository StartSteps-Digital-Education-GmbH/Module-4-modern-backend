# Advanced Express.js Exercises: Routing, Middleware, and Requests/Responses

## Introduction

In these exercises, we'll build upon your existing knowledge of Express.js to explore more advanced concepts. We'll cover advanced routing techniques, custom middleware creation, and sophisticated request/response handling. These skills will help you create more robust and flexible web applications.

## Exercise 1: Advanced Routing in Express.js

### Objective

Learn how to implement dynamic routes using parameters and query strings.

### Learning Explanation:

#### What Makes Routing Dynamic?

Dynamic routing refers to routes that include dynamic parameters or variables in the URL path. For example, instead of having a static route like `/students/1`, a dynamic route might look like `/students/:id`. The `:id` part of the route is a placeholder for any value, meaning this single route can handle requests for different student IDs (e.g., `/students/1`, `/students/2`, etc.).

This flexibility makes dynamic routes essential for applications that need to handle various resources or data items in a scalable way.

#### Syntax for Creating API Routes with Parameters:

In Express.js, API routes can be created to handle both dynamic parameters and query strings. Here's how you can define these routes:

- **Route with Dynamic Parameter that we created yesterday:**

    ```typescript
    app.get('/api/students/:id', (req, res) => {
        const studentId = parseInt(req.params.id);
        const student = students.find(s => s.id === studentId);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    });
    ```

    - **`/api/students/:id`**: This defines a route with a dynamic parameter `:id`. When a request is made to this route, the value provided in place of `:id` will be accessible via `req.params.id`.


#### What are Query Strings?

Query strings are a part of the URL that allows you to pass additional information to the server. They follow the `?` symbol in the URL and are typically used to filter, sort, or provide additional options to the data being requested. Query strings are formatted as key-value pairs, separated by an `&` if there are multiple parameters. For example, `/people?hairColour=Brunette` filters a list of people to only include those with a haircolour of `Brunette`.


### Instructions


**Modify the existing route for fetching all students to support filtering by `grade`:**

- **Step 1:**  Retrieve the grade from the request. 

    <details>
    <summary>Click to reveal a hint for Step 1</summary>

    Use `req.query` to access query parameters. You can check if the `grade` parameter is provided.

    </details>

- **Step 2:** If the `grade` query parameter is present, filter the students array based on the grade.

    <details>
    <summary>Click to reveal a hint for Step 2</summary>

    Use `.filter()` to filter students by grade.

    </details>

- **Step 3:** Return the filtered students as a JSON response. If no grade is provided, return all students.

<details>
<summary>Click to reveal the solution & explanation</summary>

```typescript
app.get('/api/students', (req, res) => {
    const grade = req.query.grade as string;
    if (grade) {
        const filteredStudents = students.filter(s => s.grade === grade);
        res.json(filteredStudents);
    } else {
        res.json(students);
    }
});
```

**Explanation:**
- The `req.query.grade` accesses the query parameter from the URL (e.g., `?grade=A`).
- If `grade` is present, the students array is filtered to only include students with that grade.
- If `grade` is not present, the entire students array is returned.

</details>

### Best Practices

- **Use Route Parameters for Identifiers:** Route parameters like `:id` are perfect for handling resource identifiers (e.g., student IDs). This keeps your URLs clean and semantic.
- **Use Query Strings for Filters:** Query strings are ideal for filtering data. They allow you to provide additional options or filters without modifying the route itself.

### Testing

- Start your Express server.
- Use a tool like Postman to make GET requests:
  - `http://localhost:3000/api/students/1` (replace `1` with any student ID)
  - `http://localhost:3000/api/students?grade=A` (replace `A` with any grade)

---

## Exercise 2: Creating Middleware for Validation and Logging

### Objective

Implement custom middleware functions for request logging and data validation.

### Learning Explanation:

#### What is Middleware?

Middleware in Express.js is like a series of functions that are executed in sequence when a request is made to your server. These functions can perform various tasks such as logging, validating data, or checking authentication before the request reaches its final destination, which is usually a route handler.

Think of middleware as a checkpoint in the request-response cycle. As a request travels through your server, it can pass through one or more middleware functions before a response is sent back to the client.

#### Key Concepts of Middleware:

1. **Order Matters:** Middleware functions are executed in the order they are added. This means that if you want certain checks or actions (like authentication) to happen before others (like validation), you need to add them in the correct sequence.

2. **Access to Request and Response Objects:** Middleware functions have access to the `req` (request) and `res` (response) objects, which means they can read or modify the incoming request or the outgoing response.

3. **The `next()` Function:** Middleware functions have a third argument, `next`, which is a function that passes control to the next middleware in the stack. If you don’t call `next()`, the request will stop there, and the following middleware or route handler won’t be executed.

4. **Common Uses for Middleware:**
   - **Authentication:** Check if a user is logged in or has the necessary permissions.
   - **Validation:** Ensure that the incoming data is formatted correctly or meets certain criteria.
   - **Logging:** Record details about each request, such as the method and URL, for debugging or monitoring purposes.
   - **Route Chaining:** Multiple middleware functions can be chained together to handle more complex logic sequentially.

#### How to Create and Use Middleware in Express:

To create middleware, you define a function that takes `req`, `res`, and `next` as arguments. Then, you use the `app.use()` method to apply the middleware globally, or you can attach it to specific routes.

Here’s how to create and use middleware:

1. **Creating Middleware:**

    ```typescript
    const exampleMiddleware = (req, res, next) => {
        console.log('Middleware executed');
        next(); // Passes control to the next middleware or route handler
    };
    ```

2. **Using Middleware Globally:**

    If you want this middleware to run for all incoming requests, you use `app.use()`:

    ```typescript
    app.use(exampleMiddleware);
    ```

3. **Using Middleware for Specific Routes:**

    If you want the middleware to run only for specific routes, you can add it as a second argument in the route definition:

    ```typescript
    app.get('/specific-route', exampleMiddleware, (req, res) => {
        res.send('This route uses the middleware');
    });
    ```

#### Where Middleware is Typically Created and Used:

- **Global Middleware**: Middleware that should apply to all routes in your application is usually defined early in your index.ts or main server file, before your route definitions. This ensures that every incoming request passes through the middleware.
- **Route-Specific Middleware**: Middleware that only applies to certain routes is defined directly within the route handlers. This is useful for tasks like validation that only need to occur for specific routes (e.g., validating data before adding a new student).

### Instructions

1. **Add Logging Middleware:**

   - **Step 1:** Define a middleware function to log each incoming request. Since we're only logging basic information, we can define and use this middleware directly within the app.use() method.
        - Focus on logging the HTTP method (e.g., GET, POST) and the requested URL.

            <details>
            <summary>Need a hint?</summary>

            To log the method and URL, you might do something like this:
            
            ```typescript
            console.log(`${req.method} request to ${req.url}`);
            ```

            </details>

            <details>
            <summary>Need a bigger hint?</summary>

            To log the method and URL, you might do something like this:
            
            ```typescript
            console.log(`${req.method} request to ${req.url}`);
            ```

            </details>

   - **Step 2:** Call `next()` at the end of your middleware function. `next()` is crucial for allowing the request to proceed. Without it, the request will be stuck in the middleware. 

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.use((req, res, next) => {
           console.log(`${req.method} request to ${req.url}`);
           next();
       });
       ```

       **Explanation:**
       - The `app.use` method applies this middleware to all incoming requests.
       - `console.log` outputs the request method and URL to the console.
       - `next()` passes control to the next middleware or route handler, ensuring the request continues to be processed.

       </details>

2. **Create and Apply Validation Middleware:**

   - **Step 1:** Create a validation middleware for the POST request that adds new students.

     **Hint:** Your validation should check that `id` is a number, and `name` and `grade` are strings.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       const validateStudent = (req, res, next) => {
           const { id, name, grade } = req.body;
           if (typeof id !== 'number' || typeof name !== 'string' || typeof grade !== 'string') {
               return res.status(400).json({ message: 'Invalid student data' });
           }
           next();
       };
       ```

       **Explanation:**
       - The `validateStudent` function checks the types of the `id`, `name`, and `grade` properties in the request body.
       - If any of these are invalid, the function returns a `400` status code and an error message, stopping further processing.
       - If the data is valid, `next()` is called to allow the request to proceed to the next middleware or route handler.

       </details>

   - **Step 2:** Apply the validation middleware to your POST route.

     **Hint:** The validation middleware should be the second argument in the `app.post()` method.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.post('/api/students', validateStudent, (req, res) => {
           const newStudent: Student = req.body;
           students.push(newStudent);
           res.status(201).json(newStudent);
       });
       ```

       **Explanation:**
       - The `validateStudent` middleware is added as the second argument to the POST route.
       - This ensures that the student data is validated before it is added to the `students` array.

       </details>

### Best Practices

- **Middleware for Common Tasks:** Middleware is ideal for tasks that apply to multiple routes, like logging or validation.
- **Data Validation:** Always validate incoming data to prevent invalid or harmful data from being processed.

### Testing

- Restart your server to apply the new middleware.
- Make various requests and check your server console for the logged messages.
- Try to POST invalid student data and valid student data to test the validation.


---

## Please Continue with the exercises in the next file! :smile: 

