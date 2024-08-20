
# Building a Simple REST API with Express.js

These exercises will build on the foundation you’ve already created, moving from a basic Node.js server to creating a REST API with Express.js. You’ll start by setting up Express, then work with dummy data representing student information (ID, name, and grade), and gradually implement simple CRUD operations. The goal is to introduce REST APIs, Express.js, and basic CRUD principles in the simplest possible way.

The exercises will cover:
- **Introduction to Express.js and Setting Up the Project:** Integrating Express into your existing TypeScript and Node.js setup.
- **Creating Dummy Data:** Setting up an array of students with ID, name, and grade for use in the REST API.
- **Implementing Simple REST API Endpoints:** Creating GET, POST, PUT, and DELETE routes to perform CRUD operations on the student data.
- **Testing and Running the API:** Running the server and testing the API with tools like Postman or cURL.

Let’s dive into each exercise step by step:

## Exercise 1: Setting Up Express.js in Your Existing Node.js and TypeScript Project

### Objective:
Install and configure Express.js in your TypeScript project.

### Instructions:

1. **Install Express.js and Types:**

    To get started, you need to install the Express.js library and its TypeScript types in your project. This will allow you to use Express with TypeScript.

    ```bash
    npm install express
    npm install @types/express --save-dev
    ```

2. **Update Your `index.ts` to Use Express:**

    When transitioning from using the built-in `http` module (from yesterday) to using Express.js, the idea is to replace the existing HTTP server setup with Express, while keeping the other functionalities (like logging) in place.

    Here’s what you need to do:

    - **Step 1:** Replace the import for `http` with `express` and keep the import for `dotenv` and other necessary modules like `logServerMessage`.
    - **Step 2:** Initialize the Express application. 
        <details>
        <summary>Click to reveal a hint for step 2 </summary>

        `const app = ...`

        -> Fill in the '...' yourself! :wink:

        </details>


    - **Step 3:** Set up middleware to handle JSON requests.

        <details>
        <summary>Click to reveal a hint for step 3</summary>

        `app.use(...)`

        -> Fill in the '...' yourself! :wink:

        </details>


    - **Step 4:** Replace the existing `http.createServer` with `app.listen` to start the Express server.
    - **Step 5:** Ensure that your custom logging still works by using `logServerMessage` in the `listen` callback.

    Try to implement this on your own based on the steps above!

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
      <summary>Click to reveal the solution & explanation of the solution</summary>

      ```typescript
      import express from 'express';
      import dotenv from 'dotenv';
      import { port } from './config';
      import { logServerMessage } from './logger';

      dotenv.config();

      const app = express();

      app.use(express.json());

      app.listen(port, () => logServerMessage(`Server running on port ${port}`));
      ```

      **Explanation of the solution:**
      - **Replacing http with Express:** You no longer need `http` since Express takes care of handling HTTP requests and responses
      - **Initializing Express:** `const app = express();` creates an Express application that you can use to define routes and middleware.
      - **Handling JSON Requests:** `app.use(express.json());` allows your server to parse JSON bodies in incoming requests, which is crucial for working with APIs.
      - **Starting the Server with Logging:** `app.listen(port, () => logServerMessage(...));` starts the Express server on the specified port and logs a message when it's running.

    </details>

### Done? :
- The server is now using **Express**, which simplifies the process of building REST APIs compared to the built-in `http` module.
- **Best Practice:** Using middleware like `express.json()` is a common pattern in Express.js to parse incoming requests with JSON payloads, making it easier to interact with JSON data.




-----------

## Exercise 2: Setting Up Dummy Data for Students

### Objective:
Similarly to what you did this morning, create an array of dummy student data that will be used in the API.

### Instructions:
1. In the `src` directory, create a new file named `dummyData.ts`. 

1. In this file, define a `Student` Interface with an id, name and grade.

2. Then, create a Dummy Student Array `students` of 3-5 students.

### Explanation:
- The array `students` holds some basic student data with IDs, names, and grades. This data will serve as the foundation for performing CRUD operations in the upcoming exercises.

### Best Practices
- Defining interfaces like `Student` helps enforce a consistent structure for data, making your TypeScript code more robust and maintainable.
- **Separation of Concerns**: By moving the interface and dummy data to a separate file, you're keeping your index.ts file cleaner and more focused on setting up and running the server. This makes it easier to reuse and maintain.
- **Simplicity and Clarity**: For a small project, keeping the interface and dummy data together in one file (like dummyData.ts) helps in maintaining clarity without over-complicating the file structure.
- **For Bigger Projects**: If your project grows larger, it might make sense to separate the interface into a dedicated interfaces.ts file. This way, you can manage complex data models more effectively without cluttering your data files.
  
-----

## Exercise 3: Implementing Simple REST API Endpoints (CRUD Operations)

### Objective:
Create API routes to get, add, update, and delete students.


### Learning Explanation:

#### What is an API Route?

An API route is a defined endpoint in your application that responds to HTTP requests. When a client (like a web browser or a tool like Postman) makes a request to this endpoint, the server processes the request and returns a response. Each API route typically corresponds to a specific operation, such as retrieving data (GET), creating new data (POST), updating existing data (PUT), or deleting data (DELETE).

#### Understanding the Syntax to Create an API Route in Express:

In Express.js, you create an API route using methods like `app.get()`, `app.post()`, `app.put()`, and `app.delete()`. Here’s a basic breakdown of the syntax:

```typescript
app.method('route', (req, res) => {
    // Handler function to process the request
    // req is the request object
    // res is the response object
});
```

- `app.method`: This specifies the type of request (GET, POST, PUT, DELETE, etc.).
- `route`: This is the path or URL where the route will be accessible (e.g., `/api/students`).
- `(req, res) => { ... }`: This is the handler function that gets executed when the route is accessed. The `req` object represents the request made by the client, and the `res` object is used to send a response back to the client.

**Example**
To create a route that handles GET requests to `/api/students`:

```typescript
app.get('/api/students', (req, res) => {
    res.json(students);
});
```

- `app.get('/api/students', ...)`: Defines a GET route at `/api/students`.
- `res.json(students)`: Sends the `students` array as a JSON response to the client.


#### Common Practices for Defining API Routes

It depends on the size and complexity of the project:

1. **Defining Routes in `index.ts`:**
   - **When:** This approach is most common for smaller projects or when the application only has a few routes. By defining the routes directly in the main server file (such as `index.ts`), everything is kept in one place.
   - **Advantages:** Simple, easy to understand, and involves minimal setup. All your routes and server configurations are in the same file.

2. **Organizing Routes in Separate Files (Routing Modules):**
   - **When:** This approach is typically used in larger projects where the number of routes grows and it becomes important to keep the main server file clean and manageable. Routes are organized into separate files or modules, often grouped by feature or functionality.
   - **Advantages:** Better organization, especially as the project scales. By separating routes into their own files, it becomes easier to manage and navigate your codebase. Promotes reusability and maintainability as different parts of the application can be developed and updated independently.

**Recommended for now:** For simplicity I would recommend organizing your api routes in `index.ts`.

---
### Instructions:
---
1. **Create a GET Endpoint to Fetch a Specific Student:**
   - **Step 1:** Set up a route in Express to handle GET requests for a specific student based on their ID.
   - **Step 2:** Extract the student ID from the request parameters.
   - **Step 3:** Find the student in the `students` array using the extracted ID.
   - **Step 4:** Send the `student` as a JSON response if found, or send a `404 Not Found` response if the student does not exist.

    Try to implement this on your own!

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
      <summary>Click to reveal the solution</summary>

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

      **Explanation:**
      - The `app.get` method creates a GET route that listens for requests to `/api/students/:id`, where `:id` is a dynamic parameter representing the student's ID.
      - The `req.params.id` extracts the ID from the URL, and `parseInt` converts it from a string to a number.
      - The `students.find(s => s.id === studentId)` searches for the student in the array by their ID.
      - If the student is found, it is returned as a JSON response with `res.json(student)`.
      - If the student is not found, a `404 Not Found` response is sent with `res.status(404).json({ message: 'Student not found' })`.
      ```

    </details>

---

2. **Create a POST Endpoint to Add a New Student:**
   - **Step 1:** Set up a route in Express to handle POST requests to `/api/students`.
   - **Step 2:** Extract the new student data from the request body.
   - **Step 3:** Add the new student to the `students` array.
   - **Step 4:** Send a response with the new student and a status code of 201 (Created).

    Try to implement this on your own!

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
      <summary>Click to reveal the solution</summary>

      ```typescript
      app.post('/api/students', (req, res) => {
          const newStudent: Student = req.body;
          students.push(newStudent);
          res.status(201).json(newStudent);
      });
      ```

      **Explanation:**
      - The `app.post` method creates a POST route that listens for requests to `/api/students`.
      - The `req.body` contains the new student data sent in the request.
      - The new student is added to the `students` array with `students.push(newStudent)`.
      - A status code of `201` (Created) is returned along with the new student data.
      ```

    </details>
---
3. **Create a PUT Endpoint to Update a Student’s Grade:**
   - **Step 1:** Set up a route in Express to handle PUT requests to `/api/students/:id`.
   - **Step 2:** Extract the student ID from the request parameters.
   - **Step 3:** Find the student in the `students` array by their ID.
   - **Step 4:** If the student exists, update their grade with the new data from the request body.
   - **Step 5:** Send a response with the updated student or a 404 error if the student is not found.

    Try to implement this on your own!

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
      <summary>Click to reveal the solution</summary>

      ```typescript
      app.put('/api/students/:id', (req, res) => {
          const studentId = parseInt(req.params.id);
          const studentIndex = students.findIndex(s => s.id === studentId);
          
          if (studentIndex !== -1) {
              students[studentIndex].grade = req.body.grade;
              res.json(students[studentIndex]);
          } else {
              res.status(404).json({ message: 'Student not found' });
          }
      });
      ```

      **Explanation:**
      - The `app.put` method creates a PUT route that listens for requests to `/api/students/:id`.
      - The `req.params.id` is used to extract the student ID from the request URL.
      - `students.findIndex` finds the student in the array by their ID.
      - If the student exists, their grade is updated with `students[studentIndex].grade = req.body.grade`.
      - If the student is not found, a `404 Not Found` error is returned.
      ```

    </details>
---
4. **Create a DELETE Endpoint to Remove a Student:**
   - **Step 1:** Set up a route in Express to handle DELETE requests to `/api/students/:id`.
   - **Step 2:** Extract the student ID from the request parameters.
   - **Step 3:** Find the student in the `students` array by their ID.
   - **Step 4:** If the student exists, remove them from the `students` array.
   - **Step 5:** Send a 204 status code (No Content) if the student was deleted, or a 404 error if the student is not found.

    Try to implement this on your own!

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
      <summary>Click to reveal the solution</summary>

      ```typescript
      app.delete('/api/students/:id', (req, res) => {
          const studentId = parseInt(req.params.id);
          const studentIndex = students.findIndex(s => s.id === studentId);
          
          if (studentIndex !== -1) {
              students.splice(studentIndex, 1);
              res.status(204).send(); // No content after deletion
          } else {
              res.status(404).json({ message: 'Student not found' });
          }
      });
      ```

      **Explanation:**
      - The `app.delete` method creates a DELETE route that listens for requests to `/api/students/:id`.
      - The `req.params.id` is used to extract the student ID from the request URL.
      - `students.findIndex` finds the student in the array by their ID.
      - If the student exists, they are removed from the array with `students.splice(studentIndex, 1)`.
      - A `204 No Content` status is returned if the student is deleted, otherwise a `404 Not Found` error is returned.
      ```

    </details>
---
### Explanation:
- The GET, POST, PUT, and DELETE routes represent basic CRUD operations, which are the building blocks of any REST API. Each route corresponds to a common operation:
  - **GET:** Retrieve data.
  - **POST:** Create new data.
  - **PUT:** Update existing data.
  - **DELETE:** Remove data.

**Best Practice:** Always validate incoming data (e.g., in POST and PUT requests) to ensure that your application is working with valid and expected data. Error handling, as shown in the PUT and DELETE routes, is crucial for providing clear feedback to API consumers. --> we will do this in the next exercise! :smile: 

------

## Exercise 4: Running and Testing Your REST API

### Objective:
Test the REST API endpoints using tools like Postman or cURL.

### Instructions:
1. **Start Your Server:**

    ```bash
    npm run start
    ```

2. **Test Endpoints Using Postman or cURL:**
   - **GET request** to `http://127.0.0.1:5000/api/students` to fetch all students.
   - **POST request** to `http://127.0.0.1:5000/api/students` with a JSON body to add a student:

        ```json
        {
            "id": 4,
            "name": "David",
            "grade": "A"
        }
        ```

   - **PUT request** to `http://127.0.0.1:5000/api/students/1` to update a student’s grade:

        ```json
        {
            "grade": "B+"
        }
        ```

   - **DELETE request** to `http://127.0.0.1:5000/api/students/1` to remove a student.

### Explanation:
- The API is now fully functional, allowing you to perform CRUD operations on the dummy student data.
- This exercise introduces the fundamentals of working with REST APIs using Express and TypeScript.

**Best Practice:** Testing your API endpoints thoroughly ensures that they work as expected and handle edge cases appropriately. Using tools like Postman or cURL helps simulate real-world API usage and is an essential part of the development process.
