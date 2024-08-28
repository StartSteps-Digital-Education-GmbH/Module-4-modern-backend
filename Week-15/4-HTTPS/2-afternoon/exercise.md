# Node.js HTTP and HTTPS Server Exercises

## Introduction

In these exercises, you'll learn how to set up both HTTP and HTTPS servers using Node.js. You'll also generate SSL certificates, serve an HTML form over HTTPS, and handle form submissions securely. These skills are crucial for developing secure web applications.

### Prerequisites

- Basic understanding of Node.js
- Node.js installed on your system
- A text editor or IDE of your choice
- OpenSSL installed on your system (for generating SSL certificates)

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

2. **Step 2:** Import `express` and create a router instance in `routes.ts`.

    ```typescript
    import express from 'express';
    const router = express.Router();
    ```

   - **Explanation:** The `router` instance will now handle all route definitions.

3. **Step 3:** Move all route definitions from `index.ts` to `routes.ts`.

    ```typescript
    // routes.ts
    import { Request, Response } from 'express';
    import { students, Student } from './dummyData';
    import { getHelloMessage } from './helpers';

    // Root route to display the custom message
    router.get('/', (req: Request, res: Response) => {
        res.send(getHelloMessage());
    });

    // GET endpoint to fetch all students, with optional filtering by grade
    router.get('/students', (req: Request, res: Response) => {
        const grade = req.query.grade as string;
        if (grade) {
            const filteredStudents = students.filter(s => s.grade === grade);
            if (filteredStudents.length > 0) {
                res.status(200).json(filteredStudents);
            } else {
                res.status(404).json({ message: `No students found with grade ${grade}` });
            }
        } else {
            res.status(200).json(students);
        }
    });

    // GET endpoint to fetch a specific student by ID with optional grade inclusion
    router.get('/students/:id', (req: Request, res: Response) => {
        const studentId = parseInt(req.params.id);
        const includeGrade = req.query.includeGrade === 'true';
        const student = students.find(s => s.id === studentId);

        if (student) {
            const response = includeGrade ? student : { id: student.id, name: student.name };
            res.status(200)
                .set('X-Student-Found', 'true')
                .json({
                    success: true,
                    data: response,
                    message: 'Student retrieved successfully',
                });
        } else {
            res.status(404)
                .set('X-Student-Found', 'false')
                .json({
                    success: false,
                    message: 'Student not found',
                });
        }
    });

    // POST endpoint to add a new student with validation middleware
    router.post('/students', (req: Request, res: Response) => {
        console.log('Received Student Data:', req.body);
        const newStudent: Student = req.body;
        students.push(newStudent);
        res.status(201).json(newStudent);
    });

    // PUT endpoint to update a student’s grade
    router.put('/students/:id', (req: Request, res: Response) => {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);

        if (studentIndex !== -1) {
            students[studentIndex].grade = req.body.grade;
            res.json(students[studentIndex]);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    });

    // DELETE endpoint to remove a student
    router.delete('/students/:id', (req: Request, res: Response) => {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);

        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            res.status(204).send(); // No content after deletion
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    });

    export default router;
    ```

   - **Explanation:** By moving these routes, you're keeping your `index.ts` clean and focused only on application setup.

4. **Step 4:** Import `router` in `index.ts` and use it with `app.use()`.

    ```typescript
    import router from './routes';

    app.use('/api', router);
    ```

   - **Explanation:** Prefixing with `/api` means all your routes will be accessible under `/api`, e.g., `/api/students`.

### Best Practices

- **Modular Code:** Breaking down your application into modules makes it easier to manage and scale as your project grows.
- **Readability:** Keeping the main `index.ts` file clean improves readability and maintainability of your codebase.

---

## Exercise 2: Setting Up HTTP and HTTPS Servers in Node.js

### Objective

Configure both an HTTP and HTTPS server using Node.js, building upon your refactored Express project.

### Learning Explanation

#### Difference Between HTTP and HTTPS

- **HTTP (HyperText Transfer Protocol):** The foundation of data communication on the web. It's used to transfer data over the internet in an unsecured way.
- **HTTPS (HTTP Secure):** An extension of HTTP that uses SSL/TLS to encrypt the data transferred between the server and the client, providing a secure communication channel.

#### SSL Keys and Certificates

- **SSL (Secure Sockets Layer):** A standard security protocol for establishing encrypted links between a web server and a browser.
- **SSL Certificates:** Files that digitally bind a cryptographic key to an organization's details. When installed on a web server, it activates the padlock and the HTTPS protocol, allowing secure connections from a web server to a browser.

#### Best Practices for HTTPS

- **Always use HTTPS:** Especially when dealing with sensitive user data, like login credentials or payment information.
- **Use strong encryption:** Ensure your SSL certificates use strong encryption algorithms.
- **Regularly update certificates:** SSL certificates have expiration dates. Ensure they are regularly updated and renewed.

### Instructions

1. **Step 1:** Set up the HTTP server in `index.ts`.

    - Create a server that responds with "Hello from HTTP server" to all requests.

      <details>
      <summary>Click to reveal a hint for Step 1</summary>
  
      Use `http.createServer()`, `res.writeHead()` for the headers, and `res.end()` to send the response.
  
      </details>

2. **Step 2:** Make the server listen on port 3000 and log a message that it's running.

    <details>
    <summary>Click to reveal a hint for Step 2</summary>

    Use `server.listen(3000, () => console.log('HTTP server running on port 3000'))`.

    </details>

3. **Step 3:** Set up the HTTPS server in `index.ts` using SSL certificates.

    - Create a `cert` folder in your project and generate SSL certificates using OpenSSL. (See Exercise 3 for SSL generation steps.)

    - Set up the HTTPS server similarly to the HTTP server, but include the `key` and `cert` options.

      <details>
      <summary>Click to reveal a hint for Step 3</summary>

      Use `https.createServer(options, (req, res) => {...})` where `options` includes the SSL key and cert.

      </details>

4. **Step 4:** Make the HTTPS server listen on port 3443 and log a message that it's running.

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
    <summary>Click to reveal the solution & explanation</summary>

    ```typescript
    import http from 'http';
    import https from 'https';
    import fs from 'fs';
    import path from 'path';
    import express from 'express';
    import router from './routes';
    import { port } from './config';
    import { logServerMessage } from './logger';

    const app = express();
    app.use(express.json());
    app.use('/api', router);

    // HTTP Server
    const httpPort = 3000;
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort, () => logServerMessage(`HTTP server running on http://localhost:${httpPort}`));

    // HTTPS Server
    const httpsPort = 3443;
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    };
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(httpsPort, () => logServerMessage(`HTTPS server running on https://localhost:${httpsPort}`));
    ```

    **Explanation:**
    - **HTTP Server Setup:** Simple HTTP server wrapping the Express app, running on port 3000.
    - **HTTPS Server Setup:** HTTPS server configured with SSL certificates, wrapping the same Express app, running on port 3443.

    </details>

### Best Practices

- **Secure Development:** Always develop with HTTPS in mind, especially when dealing with sensitive data.
- **Certificate Management:** In production, use certificates from a trusted Certificate Authority (CA) instead of self-signed certificates.

---

## Exercise 3: Generating SSL Certificates Using OpenSSL

### Objective

Generate a self-signed SSL certificate using OpenSSL for development purposes.

### Instructions

1. **Step 1:** Open your terminal or command prompt.
2. **Step 2:** Create a directory to store your certificates:

    ```bash
    mkdir cert
    ```

3. **Step 3:** Generate the SSL certificate and key using OpenSSL:

    ```bash
    openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365
    ```

    - **Explanation:** This command generates a self-signed certificate (cert.pem) and a private key (key.pem) valid for 365 days. In a production environment, you'd use certificates from a trusted Certificate Authority instead.

4. **Testing**

    After generating the certificates, restart your Node.js server. You should now be able to access `https://localhost:3443` in your browser. You’ll see a security warning because the certificate is self-signed, which is normal for development.

---

## Exercise 4: Serving a Simple HTML Form Over HTTPS

### Objective

Create and serve an HTML form over your HTTPS server.

### Instructions

1. **Step 1:** Create a new file named `form.html` in your project directory with the following content:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTTPS Form</title>
    </head>
    <body>
        <form action="/submit" method="POST">
            <label for="message">Enter your message:</label>
            <input type="text" id="message" name="message">
            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
    ```

2. **Step 2:** Modify your HTTPS server code to serve this form when a GET request is made to the root URL (`/`).

    <details>
    <summary>Click to reveal a hint for Step 2</summary>

    Use `fs.readFile()` to read the `form.html` file and `res.end(data)` to send the content as the response.

    </details>

3. **Step 3:** Provide a placeholder response for POST requests to `/submit`.

    **Need help?** Reveal the solution below, but please try by yourself first!

    <details>
    <summary>Click to reveal the solution & explanation</summary>

    ```typescript
    import path from 'path';

    const httpsServer = https.createServer(options, (req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            const filePath = path.join(__dirname, 'form.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading the form');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.method === 'POST' && req.url === '/submit') {
            res.writeHead(200);
            res.end('Form submitted');
        }
    });
    ```

    **Explanation:**
    - **GET Request:** Serves the HTML form when the root URL is accessed.
    - **POST Request:** Provides a basic response indicating form submission.

    </details>

### Best Practices

- **Serving Static Files:** Ensure that HTML files like `form.html` are stored in a location accessible to the server, such as the `dist` folder after a build process.
- **Form Action & Method:** The `action` attribute specifies where the form data is sent, and `method` specifies how the data is sent (GET or POST).

---

## Conclusion

These exercises have introduced you to creating secure web servers using Node.js. You've learned how to:

- Set up both HTTP and HTTPS servers
- Generate self-signed SSL certificates for development
- Serve HTML content over HTTPS
- Handle form submissions securely

Remember, while self-signed certificates are fine for development, always use certificates from a trusted Certificate Authority in production environments. Practice these concepts and try extending the functionality, such as storing submitted messages in a database or creating more complex HTML forms.

