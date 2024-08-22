## Exercise 4: Serving an HTML Form Over HTTPS and Handling Form Data

> **Note:** This exercise is quite challenging, so don’t worry if you can’t get through it all yet. Ahmad will do a live coding session on this next lecture day!

### Objective

Learn to serve an HTML form over HTTPS, handle form submissions, and log the submitted data to the server, building on your existing Express and HTTPS setup.

### Learning Explanation

#### The Big Picture

In this exercise, we will create a simple HTML form and serve it via HTTPS. Users will fill out the form, submit their data, and we will capture and log that data on the server. Here’s what we will need to do:

1. **Serve the HTML Form (GET Request)**: We will create a GET route to serve an HTML file when a user visits the root URL. This file will contain our form.
2. **Handle Form Submissions (POST Request)**: Once the form is submitted, we will create a POST route to handle the data submitted by the user. This data will be logged on the server, and then the user will be redirected back to the form.
3. **HTTPS Server**: We will use our previously created HTTPS server to serve the form and handle the submission securely.

#### Understanding HTTP Methods in this Context

- **GET Method**: We use the GET method to retrieve and serve the HTML form to the user. This is because GET requests are typically used to request data from the server, such as web pages or files. Serving a form with a GET request is intuitive for the browser and ensures the form can be easily accessed by users.

- **POST Method**: POST is used to send data to the server, like the form data submitted by the user. POST requests are more secure than GET requests for sending data, as they don’t expose the data in the URL.

#### Understanding `res.send` and `res.sendFile`

- **`res.send`**: This method is used to send a response back to the client. It can send strings, objects, or buffers. It automatically sets the appropriate headers for you.
  
- **`res.sendFile`**: This method sends a file as an HTTP response. It takes care of reading the file and sending it over the network. The file path needs to be specified, and this is where `__dirname` comes in handy.

---

### Creating the HTML Form

1. **Step 1: Create the HTML Form**

   **Explanation**: We need to create a form so that users can submit data to our server. The form will collect a message and send it to the `/msg` route via a POST request.

   - **Create a new file named `index.html`** in your project's root directory.

   - **Add the following HTML code to the file**:

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>HTTPS Server</title>
     </head>
     <body>
         <h1>Welcome to HTTPS Server</h1>
         <h3>Enter your message</h3>

         <form action="/msg" method="post">
             <textarea name="message" id="message" cols="30" rows="10"></textarea>
             <button type="submit">Send</button>
         </form>
     </body>
     </html>
     ```

   **Explanation**: 
   - The form's **action** is set to `/msg`, meaning when the form is submitted, the data will be sent to the `/msg` route on the server.
   - The **method** is `POST`, which is the recommended method for sending form data securely. POST requests send data in the request body rather than appending it to the URL (as with GET requests).

---

### Serving and Handling the HTML Form

1. **Step 1: Set up `__dirname` and serve the HTML Form Using a GET Request**

   **Explanation**: We need to create a route to serve the HTML form we just created. When users visit the root URL (`/`), they should receive the HTML file containing the form.

   - **Step 1.1**: Set up `__dirname` in your `index.ts` if it is not defined. This is necessary to correctly locate your `index.html` file.

     **Instructions**: Add the following at the top of your `index.ts` file:

     ```typescript
     import path from 'path';
     import { fileURLToPath } from 'url';
     
     const __filename = fileURLToPath(import.meta.url);
     const __dirname = path.dirname(__filename);
     ```

     **Explanation**: 
     - **`fileURLToPath()`**: Converts a file URL to a file path. This is used because in ES modules, `__filename` and `__dirname` are not available by default, unlike in CommonJS.
     - **`import.meta.url`**: Represents the URL of the current module file. It’s used here to create an absolute path to the file.
     - **`path.dirname()`**: Returns the directory name of a path. In this case, it is used to extract the directory name from `__filename`.

   - **Step 1.2**: After the middleware setup lines in `index.ts`, add a GET route that serves the HTML form:

     **Instructions**:
     - This GET route should listen for requests to the root URL (`/`).
     - Use `res.sendFile()` to send the `index.html` file to the client. The `__dirname` variable ensures the correct path to the file is used.

     <details>
       <summary>Click to reveal a hint for Step 1.2</summary>
       Use `res.sendFile()` to serve the form file, and be sure to use `__dirname` to specify the file location.
     </details>
    
        <details>
           <summary>Click to reveal the solution</summary>
          
           ```typescript
           app.get("/", (req: Request, res: Response) => {
             res.sendFile(__dirname + "/index.html");
           });
           ```
    
         </details>
  

     **Explanation**: This GET route serves the `index.html` file to the client when they visit the root URL (`/`). The `__dirname` variable ensures that the correct path to the `index.html` file is used, which is crucial for sending the file correctly.

---

2. **Step 2: Handling Form Submissions Using a POST Request**

   **Explanation**: We need to set up a POST route to handle the form submissions. When the user submits the form, the server will log the message and redirect the user back to the form page.

   - **Step 2.1**: Use the `body-parser` middleware to parse incoming form data:

     **Instructions**: Add the following line before any route definitions in your `index.ts` file:

     ```typescript
     app.use(express.urlencoded({ extended: false }));
     ```

     **Explanation**: 
     - `express.urlencoded()` parses incoming request bodies in a middleware before your handlers, making the data accessible through `req.body`.
     - The `extended: false` option ensures that we are using the querystring library to parse the data. It’s a good choice for simple forms like this one.

   - **Step 2.2**: Set up the POST route to handle the form data submission:

     **Instructions**:
     - Create a POST route that listens for submissions to the `/msg` route.
     - Use `req.body.message` to access the form data.
     - After logging the data to the server console, redirect the user back to the root URL.

     <details>
       <summary>Click to reveal a hint for Step 2.2</summary>
       Use `req.body.message` to access the form data and `res.redirect("/")` to redirect the user back to the form.
     </details>

     <details>
       <summary>Click to reveal the solution for Step 2.2</summary>
      
       ```typescript
       app.post("/msg", (req: Request, res: Response) => {
           console.log(req.body.message);
           res.redirect("/");
       });
       ```

       **Explanation**:
       - The POST route listens for form submissions at the `/msg` route, which corresponds to the `action="/msg"` attribute in your HTML form.
       - `req.body.message` contains the message submitted by the user, which is logged to the console.
       - After logging the data, the user is redirected back to the root URL.

     </details>

---

3. **Step 3: Set Up the HTTPS Server**

   **Explanation**: Now we will use the HTTPS server setup from the previous exercise to serve the form securely.

   - **Step 3.1**: Ensure your HTTPS server setup looks like this:

     ```typescript
     const options = {
         key: fs.readFileSync("server.key"),
         cert: fs.readFileSync("server.cert")
     };

     https.createServer(options, app).listen(3000, () => {
         console.log("HTTPS Server started at port 3000");
     });
     ```

     **Explanation**: The `https.createServer()` function wraps the Express app in an HTTPS server. The server listens on port 3000 and serves both the form and the POST request handler over HTTPS.

---

4. **Step 4: Test the Application**

   - **Compile** your TypeScript code if necessary using `tsc`.
   - **Start your server** by running `node dist/index.js` (or the appropriate command for your setup).
   - **Visit `https://localhost:3000`** in your browser. You should see the HTML form.
   - **Submit a message** in the form and check the server console to see if the message was logged correctly.

---

### Best Practices

- **Data Encryption**: Always serve forms and handle form submissions over HTTPS to ensure data is encrypted during transmission.
- **Form Validation**: In production environments, always validate user input before processing it on the server to prevent security vulnerabilities like SQL injection or cross-site scripting (XSS).
