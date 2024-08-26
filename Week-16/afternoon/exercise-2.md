Exercise 2: Echo WebSocket Server in TypeScript
Objective
Modify the server to send back (echo) any messages it receives from clients.

Learning Explanation
An echo server is a basic server that sends back whatever it receives. This helps you see how messages are handled in WebSockets.

Instructions
Step 1: Update the server to handle messages

Step 1.1: Listen for messages sent from the client.

Instructions: Inside the connection event handler, add code to listen for messages from the client.

<details> <summary>Click to reveal a hint for Step 1.1</summary>
Use the message event on the WebSocket instance (ws) to listen for incoming messages.

</details> <details> <summary>Click to reveal the solution for Step 1.1</summary>
typescript
Copy code
ws.on('message', (message: string) => {
  console.log('Received:', message);
});
Explanation: This listens for any message sent by the client and logs it to the console.

</details>
Step 1.2: Echo the received message back to the client.

Instructions: Use the send method on the WebSocket instance (ws) to send the received message back.

<details> <summary>Click to reveal a hint for Step 1.2</summary>
Use ws.send(...) to send the message back to the client.

</details> <details> <summary>Click to reveal the solution for Step 1.2</summary>
typescript
Copy code
ws.send(`Server received: ${message}`);
Explanation: The server sends the message back to the client, confirming it was received.

</details>
Step 2: Run the server

Restart the server with this command:

bash
Copy code
npx ts-node server.ts
Explanation: Now, whenever a client sends a message, the server will send it back.
