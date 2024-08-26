# Exercise 4: WebSocket Chat Application in TypeScript

## Objective
In this step, you will modify your server.ts file to integrate the WebSocket server with an Express application. This setup will allow your server to serve static files (like your HTML and client-side JavaScript) while also handling WebSocket connections.

### Learning Explanation: Why Both Server-Side and Client-Side Code?

In a WebSocket-based application, both the server-side and client-side code play crucial roles:

- **Server-Side**: This is where you set up the WebSocket server that listens for connections, handles incoming messages, and broadcasts messages to other connected clients. The server is the backbone of the application, managing real-time communication between all clients.
  
- **Client-Side**: The client-side code is what runs in the user's browser. It establishes a connection to the WebSocket server and handles the sending and receiving of messages. Without the client-side code, the user would not be able to interact with the WebSocket server.

Together, the server-side and client-side components enable real-time communication between multiple users. This is essential for applications like chat rooms, live notifications, or multiplayer games.

## Create the Server

### Step 1: Import the necessary modules for the server.

**Instructions:** At the top of your `server.ts` file, add the following imports: `express`, `createServer` from `http`.

<details> 
  <summary>Click to reveal the solution for Step 1.2.1</summary>

```typescript
import express from 'express';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import path from 'path';
```

**Explanation:**
- `express`: Manages routes and serves static files.
- `createServer`: Creates an HTTP server to handle requests.
- WebSocket and WebSocketServer: Manage WebSocket connections.
- `path`: Helps manage file paths across different environments.
</details> 


## Step 2: Create an Express Application
You need to create an instance of an Express application. This app will handle HTTP requests and serve static files.

*Static files* are files that are served to clients as they are, without any modification or processing by the server. They typically include: HTML Files, CSS Files, JavaScript Files, and more.

<details>
  <summary>Click to reveal a hint</summary>
  
  Use `express()`
</details>

<details> 
  <summary>Click to reveal the solution for Step 2</summary>

  ```typescript
    const app = express();
  ```
</details>

## Step 3:  Create an HTTP Server
Create an HTTP server that uses your Express application. This server will handle HTTP requests and WebSocket connections.

<details>
  <summary>Click to reveal a hint</summary>
  
  Use `createServer()` and refer to the app
</details>

<details>
  <summary>Click to reveal the solution for Step 3</summary>

  ```typescript
  const server = createServer(app);
  ```
</details>

## Step 4: Modify WebSocket Server Setup
**Objective**: Modify your existing WebSocket server setup to use the newly created HTTP server. This integrates the WebSocket server with the Express application.

Change `const wss = new WebSocketServer({ port: 8080 });` to `const wss = new WebSocketServer({ server });` to ensure the websocket server instance is set up with the HTTP server.

This ensures that the WebSocket server instance is set up with the HTTP server, allowing WebSocket connections to be handled by the same server that handles HTTP requests.

## Step 5: Serve Static Files
Configure Express to serve static files from the public directory. This is where your client-side files (HTML, CSS, JavaScript) are stored. Use
- `app.use()`  to set up middleware for serving static files.
- `express.static(...)`: Middleware function used by Express to serve static files.
- `path.join(x, y)`: x and y to be filled in yourself. It should constructs the path to the public directory, ensuring that static files can be found and served correctly.

<details>
  <summary>Click to reveal the solution for Step 5</summary>
  ```typescript
  app.use(express.static(path.join(__dirname, 'public')));
  ```
  Explanation:
  - `express.static(path.join(__dirname, 'public'))`: Middleware function used by Express to serve static files from the public directory.
  - `path.join(__dirname, 'public')`: Constructs the path to the public directory, ensuring that static files can be found and served correctly.







<details> 
  <summary>Click to reveal the solution</summary>
  
```typescript
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', (message: string) => {
    console.log('Received:', message);
    
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

**Explanation:**
createServer(app): Creates an HTTP server to handle requests, using the Express app to serve files.
new WebSocketServer({ server }): Creates a WebSocket server that listens for WebSocket connections.
wss.on('connection', ...): Handles new client connections, allowing the server to interact with each client.
ws.on('message', ...): Listens for messages from connected clients and broadcasts them to all other clients.
wss.clients.forEach(...): Iterates over all connected clients to send messages.
server.listen(3000, ...): Starts the server on port 3000.
</details>
