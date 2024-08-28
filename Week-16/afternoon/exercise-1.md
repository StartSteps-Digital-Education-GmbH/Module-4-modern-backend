
# Exercise 1: Basic WebSocket Server in TypeScript

## Objective
Create a simple WebSocket server that logs when a client connects and disconnects.

## Learning Explanation
WebSockets allow two-way communication between a client and a server, meaning both can send and receive data at the same time. This is different from HTTP, where the client always has to ask for something first. WebSockets are great for real-time applications like chat apps or live updates.

## Instructions

### Step 1: Start a new Node.js project
Run this command to create a new Node.js project:

```bash
npm init -y
```
**Explanation:** This creates a `package.json` file, which keeps track of your project’s settings and dependencies.

### Step 2: Install the necessary libraries
Install WebSocket, TypeScript, and other useful tools with this command:

```bash
npm install ws typescript @types/ws ts-node
```
**Explanation:** These libraries help you write and run WebSocket servers using TypeScript.

### Step 3: Set up TypeScript
Create a `tsconfig.json` file with this content:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```
**Explanation:** This file tells TypeScript how to compile your code into JavaScript.

### Step 4: Create a WebSocket server

#### Step 4.1: Import the necessary modules to set up a WebSocket server.
**Instructions:** In your server.ts file (create this file if it doesn’t exist), you need to import the necessary modules at the top. These imports allow you to create and manage WebSocket connections.

<details> <summary>Click to reveal a hint for Step 4.1</summary>
You'll need to import `WebSocket` and `WebSocketServer` from the `ws` library.
</details> 

<details> <summary>Click to reveal the solution for Step 4.1</summary>

```typescript
import { WebSocket, WebSocketServer } from 'ws';
```
**Explanation:** These imports allow you to create and manage WebSocket connections.

</details>

#### Step 4.2: Set up the WebSocket server to listen on port 8080.
**Instructions:** Initialize the WebSocketServer and specify the port.
Use the `WebSocketServer` class and pass an object with the `port` property set to `8080`.


<details> <summary>Click to reveal the solution for Step 4.2</summary>

```typescript
const wss = new WebSocketServer({ port: 8080 });
```
**Explanation:** This code sets up the WebSocket server to listen for connections on port 8080.

</details>

#### Step 4.3: Add an event listener for when a client connects.
**Instructions:** Listen for the `connection` event to log when a new client connects. This is important for monitoring your server’s activity.

<details> <summary>Click to reveal a hint for Step 4.3</summary>
Use `wss.on('connection', ...)` to handle new connections and log a message.
</details> 

<details> <summary>Click to reveal the solution for Step 4.3</summary>

```typescript
wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');
});
```
**Explanation:** This event fires whenever a client connects to the server, and the server logs "New client connected."
   - wss.on('connection'): Listens for new connections to the server.
   - ws: Represents the connected client.
</details>

#### Step 4.4: Log when a client disconnects.
**Instructions:** Inside the `connection` event, listen for the `close` event to log when a client disconnects. This helps you keep track of who is connected and when they leave.
Use `ws.on('close', ...)` to handle when the client disconnects and log a message.

<details> <summary>Click to reveal the solution for Step 4.4</summary>

```typescript
ws.on('close', () => {
  console.log('Client disconnected');
});
```
**Explanation:** `ws.on('close')` :  This event triggers when a client disconnects from the server, and the server logs "Client disconnected."
</details>

#### Step 4.5: Add a log to indicate that the WebSocket server is running.
**Instructions:** After setting up the WebSocket server, log a message that shows the server is running. This is useful to confirm that your server is active.

<details> <summary>Click to reveal a hint for Step 4.5</summary>
Use `console.log(...)` to log a message indicating the server is running.
</details> 

<details> <summary>Click to reveal the solution for Step 4.5</summary>

```typescript
console.log('WebSocket server is running on ws://localhost:8080');
```
**Explanation:** This confirms that your server is active and listening for connections.
</details>

### Step 5: Run the server
Run this command to start your WebSocket server:

```bash
npx ts-node server.ts
```
**Explanation:** This starts the server, allowing clients to connect on `ws://localhost:8080`.
