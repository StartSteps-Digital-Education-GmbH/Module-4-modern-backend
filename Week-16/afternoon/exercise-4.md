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


### Step 2: Create an Express Application
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

### Step 3:  Create an HTTP Server
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

### Step 4: Modify WebSocket Server Setup
**Objective**: Modify your existing WebSocket server setup to use the newly created HTTP server. This integrates the WebSocket server with the Express application.

Change `const wss = new WebSocketServer({ port: 8080 });` to `const wss = new WebSocketServer({ server });` to ensure the websocket server instance is set up with the HTTP server.

This ensures that the WebSocket server instance is set up with the HTTP server, allowing WebSocket connections to be handled by the same server that handles HTTP requests.

### Step 5: Serve Static Files
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
  <summary>Click to reveal the server solution</summary>
  
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

## Client-Side
Now that the server is set up, you need to create the client-side code that will connect to the WebSocket server, send messages, and display incoming messages in the browser.

### Step 1: Create the HTML file
This file will create the user interface for the chat application.
- Create a `div` in which we will display messages. Give it an insightful id.
- Create an input field where users can type their messages
- create a button to send the message. Add an onclick function for when the button is clicked
- load the client.js file (client-side JavaScript file), which will handle the WebSocket communication. This file will be created in the next step.

<details>
  <summary>
    Click to reveal solution!
  </summary>
  
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WebSocket Chat</title>
  </head>
  <body>
      <h1>WebSocket Chat</h1>
      <div id="chat"></div>
      <input type="text" id="message" placeholder="Type a message...">
      <button onclick="sendMessage()">Send</button>
  
      <script src="client.js"></script>
  </body>
  </html>
  ```
</details>

### Step 2: Write the Client-Side Typescript
Now, create the client-side JavaScript (TypeScript) file that will handle WebSocket communication.

**Instructions:** In the `public` directory, create a file named `client.ts`. Here we will set up the WebSocket connection, handle incoming messages, and allow the user to send messages.

## Step 2.1: Create the WebSocket Connection
**Explanation**: A WebSocket connection allows your client (the browser) to establish a persistent connection to the server. This means that after the initial handshake, both the client and server can send data to each other at any time without re-establishing the connection.

**Instructions**: Start by creating a WebSocket connection to the server running on ws://localhost:3000.
- We do this by creating a new websocket instance that connects to the server running on `ws://localhost:3000`. Save this connection in a const socket (or any other suitable name)
- The `socket` represents this connection, and you can use it to send and receive messages between the client and server.

<details> 
  <summary>Click to reveal a hint for Step 2.2.1</summary>
  Use `new WebSocket('ws://localhost:3000')` to create the connection.
</details>

<details>
  <summary>Click to reveal the solution for Step 2.2.1</summary>
  ```typescript
  const socket: WebSocket = new WebSocket('ws://localhost:3000');
  ```
</details>

## Step 2.2: Handle Incoming Messages
**Learning Explanation**: When the server sends a message to the client, we need to capture that message and display it in the chat interface. This is done by listening for the `onmessage` event, which is triggered whenever a new message is received.

**Instructions:** Add an event listener for the `onmessage` event to handle incoming messages.
When a message is received, display it in the chat div.

<details>
  <summary>Click to reveal a hint for Step 2.2.2</summary>
  Use `socket.onmessage = (event: MessageEvent) => {...}` to handle the incoming messages. 
  Access the message data using `event.data`. 
</details>

<details>
  <summary>Click to reveal the solution for Step 2.2.2</summary>
  ```typescript
  const chat = document.getElementById('chat') as HTMLDivElement;

  socket.onmessage = (event: MessageEvent) => {
      const messageElement = document.createElement('p');
      messageElement.textContent = event.data;
      chat.appendChild(messageElement);
  };
  ```

Explanation:

socket.onmessage: This event listener is triggered whenever a message is received from the server.
event.data: This contains the message data sent by the server.
document.getElementById('chat'): This gets a reference to the chat div where messages will be displayed.
document.createElement('p'): This creates a new paragraph element (<p>), which will hold the message text.
chat.appendChild(messageElement): This adds the newly created paragraph element to the chat div, displaying the message in the user interface.
</details>


Step 2.2.3: Capture User Input
Learning Explanation: In a chat application, the user needs to be able to type a message and send it to the server. We'll capture the user's input from the text field and prepare it to be sent to the server when they click the "Send" button.

Instructions:

Get a reference to the input field where the user types their message.
Store this reference in a variable so you can access the user's input later.
<details> <summary>Click to reveal a hint for Step 2.2.3</summary> Use `document.getElementById('message')` to get a reference to the input field. </details> <details> <summary>Click to reveal the solution for Step 2.2.3</summary>
typescript
Copy code
const messageInput = document.getElementById('message') as HTMLInputElement;
Explanation:

document.getElementById('message'): This gets a reference to the input field with the id message, where the user will type their messages.
as HTMLInputElement: This casts the element to an HTMLInputElement type so that TypeScript knows you're working with an input field and can provide proper type checking and intellisense.
</details>
Step 2.2.4: Send Messages to the Server
Learning Explanation: Once the user has typed a message, they need to send it to the server. This is done by capturing the form submission event, preventing the default behavior (which would refresh the page), and then sending the message over the WebSocket connection.

Instructions:

Write a sendMessage function that:
Prevents the default form submission behavior.
Captures the message from the input field.
Sends the message to the server using the WebSocket connection.
Clears the input field after sending the message.
<details> <summary>Click to reveal a hint for Step 2.2.4</summary> Use `socket.send(...)` to send the message to the server, and use `event.preventDefault()` to prevent the form from refreshing the page. </details> <details> <summary>Click to reveal the solution for Step 2.2.4</summary>
typescript
Copy code
function sendMessage(event: Event): void {
    event.preventDefault();
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
}
Explanation:

event.preventDefault(): This prevents the form from refreshing the page when the "Send" button is clicked.
messageInput.value: This retrieves the value (text) from the input field.
socket.send(message): This sends the message to the server over the WebSocket connection.
messageInput.value = '': This clears the input field after the message is sent, readying it for the next message.
</details>
Step 2.2.5: Make sendMessage Available to the Button
Learning Explanation: To make sure that the "Send" button can trigger the sendMessage function when clicked, you need to expose sendMessage to the global scope. This way, the HTML onclick attribute can access it.

Instructions:

Expose the sendMessage function to the global scope so that the button can call it when clicked.
<details> <summary>Click to reveal a hint for Step 2.2.5</summary> Use `(window as any).sendMessage = sendMessage` to make the function globally accessible. </details> <details> <summary>Click to reveal the solution for Step 2.2.5</summary>
typescript
Copy code
(window as any).sendMessage = sendMessage;
Explanation:

(window as any).sendMessage = sendMessage: This line of code makes the sendMessage function accessible globally, allowing the HTML button to call it when the form is submitted. The as any is used here to bypass TypeScript's strict type checking for global objects.
</details>
Step 2.3: Compile the Client-Side TypeScript
Since you've written the client-side code in TypeScript, you'll need to compile it into JavaScript so that it can run in the browser.

Instructions:

Run the following command in your terminal to compile the client.ts file:
bash
Copy code
npx tsc public/client.ts --outDir public
Explanation:

This command compiles the TypeScript file (client.ts) into a JavaScript file (client.js) and places it in the public directory so that it can be loaded by the HTML file.
Step 3: Run the Chat Application
Now that both the server-side and client-side code is ready, you can run the application and see it in action.

Step 3.1: Start the Server
Instructions:

Start the server by running the following command:
bash
Copy code
npx ts-node server.ts
Explanation: The server will now run, allowing you to open the chat application and connect to the WebSocket server.

Step 3.2: Open the Chat Application
Instructions:

Open your web browser and navigate to http://localhost:3000.
Explanation:

When you visit http://localhost:3000, you should see the chat interface. You can type messages in the input field and click "Send" to send them to the server. These messages will be broadcast to all connected clients (including yourself), and you should see them appear in the chat area.
