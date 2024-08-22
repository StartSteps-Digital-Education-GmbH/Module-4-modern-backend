## Exercise 2: Setting Up HTTP and HTTPS Servers in Node.js

### Objective

Configure both an HTTP and HTTPS server using Node.js, building upon your refactored Express project.

### Learning Explanation

#### Difference Between HTTP and HTTPS

- **HTTP (HyperText Transfer Protocol):** The foundation of data communication on the web. It's used to transfer data over the internet in an unsecured way.
- **HTTPS (HTTP Secure):** An extension of HTTP that uses SSL/TLS to encrypt the data transferred between the server and the client, providing a secure communication channel.

#### What about our previously set up Express app?

You already have an Express server handling your routes. By adding HTTP and HTTPS servers, you're simply wrapping your existing Express app in these servers, which allows you to serve your API over both HTTP and HTTPS.

When you "wrap" an Express app in an HTTP or HTTPS server, it means that the server is handling all incoming requests and then passing them to the Express app to handle routing and responses. Essentially, the HTTP or HTTPS server acts as the entry point for the application, and the Express app processes the requests.

This is where you "see" the wrapping:

```typescript
const expressServer = https.createServer(options, app);
```

In this code, the `https.createServer()` method takes the `app` as a second argument, meaning all incoming requests to the HTTPS server are routed through the Express app. The same applies to an HTTP server.


### Folder Structure
Before proceeding, create the `cert` folder within your project directory to store your SSL certificate and key files. While you will reference these files in this exercise, note that you will generate them in the next exercise.

Your folder structure should look something like this;
```text
my-express-project/
├── cert/           # Directory to store SSL certificates
├── src/
│   ├── index.ts    # Main server file
│   ├── routes.ts   # Router file for Express routes
│   ├── config.ts   # Configuration file for environment variables
│   └── ...         # Other files (e.g., helpers, middleware)
└── package.json    # Node.js package file
```


### Instuctions

To integrate the HTTP and HTTPS servers into your existing Express-based project, you need to manage two different servers within your `index.ts` file. The HTTP server can serve as a fallback or redirect to HTTPS, while the HTTPS server will handle secure requests. You'll add the HTTP server setup alongside your current Express setup and then set up the HTTPS server separately.

### Steps

1. **Set up the HTTP server:**

   - **Step 1:** At the top of your `index.ts` file, import the `http` module.
   
     ```typescript
     import http from 'http';
     ```

   - **Step 2:** Create an HTTP server that wraps your existing Express app.

     <details>
       <summary>Click to reveal a hint for Step 2</summary>

       You'll need to use `http.createServer(app)` to wrap the Express app.

     </details>

   - **Step 3:** Make the server listen on port 3000 and log a message that it's running.

     <details>
       <summary>Click to reveal a hint for Step 3</summary>

       Use `httpServer.listen` and pass the port number and a callback to log the message.

     </details>

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution for HTTP setup</summary>

       ```typescript
       const httpPort = 3000;
       const httpServer = http.createServer(app)

       httpServer.listen(httpPort, () => {
           console.log(`HTTP server running on http://localhost:${httpPort}`);
       });
       ```

     </details>

2. **Set up the HTTPS server:**

   - **Step 1:** Import the `https` module and `fs` module for reading the SSL certificates.

     ```typescript
     import https from 'https';
     import fs from 'fs';
     ```

     **Explanation:** The `fs` (File System) module is required to read the SSL certificate files from your local directory. These certificates are necessary to encrypt the data between your server and clients.

   - **Step 2:** Create a `const options` object that stores the paths to the SSL key and certificate files.  Note that you haven't generated these files yet; you will do so in the next exercise.

     <details>
       <summary>Click to reveal a hint for Step 2</summary>

       You'll use `fs.readFileSync('cert/key.pem')` to read the files into the options object.

     </details>

   - **Step 3:** Create an HTTPS server that wraps your existing Express app and listens on port 3443.

     <details>
       <summary>Click to reveal a hint for Step 3</summary>

       Use `https.createServer(options, app)` and `res.end('Hello from HTTPS server')`.

     </details>

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution for HTTPS setup</summary>

       ```typescript
       const options = {
           key: fs.readFileSync('cert/key.pem'),
           cert: fs.readFileSync('cert/cert.pem'),
       };

       const httpsPort = 3443;

       const httpsServer = https.createServer(options, app);

       httpsServer.listen(httpsPort, () => {
           console.log(`HTTPS server running on https://localhost:${httpsPort}`);
       });
       ```

     </details>

### Best Practices
- **Security First:** Always use HTTPS for secure data transmission. In production, use certificates from a trusted Certificate Authority (CA) instead of self-signed certificates.
- **Proper Setup:** Set up HTTP and HTTPS servers correctly to ensure your application can handle both secure and non-secure requests as needed.

### Testing
- We **can not test* the code, because The HTTPS server won’t work yet because we haven’t generated the SSL certificates. We will do this in the next exercise!

