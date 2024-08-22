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



### Instuctions

To integrate the HTTP and HTTPS servers into your existing Express-based project, you need to manage two different servers within your `index.ts` file. The HTTP server can serve as a fallback or redirect to HTTPS, while the HTTPS server will handle secure requests. You'll add the HTTP server setup alongside your current Express setup and then set up the HTTPS server separately.

### Steps

1. **Set up the HTTP server:**

   - **Step 1:** At the top of your `index.ts` file, import the `http` module.
   
     ```typescript
     import http from 'http';
     ```

   - **Step 2:** Create a server that responds with "Hello from HTTP server" to all requests.

     <details>
       <summary>Click to reveal a hint for Step 2</summary>

       You'll need to use `http.createServer`, `res.writeHead(200, { 'Content-Type': 'text/plain' })`, and `res.end('Hello from HTTP server')`.

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
       const httpServer = http.createServer((req, res) => {
           res.writeHead(200, { 'Content-Type': 'text/plain' });
           res.end('Hello from HTTP server');
       });

       httpServer.listen(httpPort, () => {
           console.log(`HTTP server running on http://localhost:${httpPort}`);
       });
       ```

       **Explanation:**
       - This code sets up a basic HTTP server that responds to every request with a plain text message "Hello from HTTP server".
       - The `http.createServer()` method creates the server, and `res.end()` sends the response.

     </details>

2. **Set up the HTTPS server:**

   - **Step 1:** Import the `https` module and `fs` module for reading the SSL certificates.

     ```typescript
     import https from 'https';
     import fs from 'fs';
     ```

     **Explanation:** The `fs` (File System) module is required to read the SSL certificate files from your local directory. These certificates are necessary to encrypt the data between your server and clients.

   - **Step 2:** Create a `const options` object that stores the paths to the SSL key and certificate files.

     <details>
       <summary>Click to reveal a hint for Step 2</summary>

       You'll use `fs.readFileSync('path_to_your_key')` to read the files into the options object.

     </details>

   - **Step 3:** Create an HTTPS server that listens on port 3443 and responds with "Hello from HTTPS server" to all requests.

     <details>
       <summary>Click to reveal a hint for Step 3</summary>

       Use `https.createServer(options, callback)` and `res.end('Hello from HTTPS server')`.

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

       const httpsServer = https.createServer(options, (req, res) => {
           res.writeHead(200, { 'Content-Type': 'text/plain' });
           res.end('Hello from HTTPS server');
       });

       httpsServer.listen(httpsPort, () => {
           console.log(`HTTPS server running on https://localhost:${httpsPort}`);
       });
       ```

       **Explanation:**
       - This code sets up an HTTPS server using the previously defined `options` object for SSL certificates.
       - The server responds with "Hello from HTTPS server" when accessed.

     </details>

### Best Practices
- **Security First:** Always use HTTPS for secure data transmission. In production, use certificates from a trusted Certificate Authority (CA) instead of self-signed certificates.
- **Proper Setup:** Set up HTTP and HTTPS servers correctly to ensure your application can handle both secure and non-secure requests as needed.

### Testing
- We **can not test* the code, because The HTTPS server won’t work yet because we haven’t generated the SSL certificates. We will do this in the next exercise!

