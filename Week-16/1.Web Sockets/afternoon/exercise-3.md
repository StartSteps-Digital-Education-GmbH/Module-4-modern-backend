# Exercise 3: Broadcasting WebSocket Server in TypeScript

## Objective
Enhance the server to broadcast received messages to all connected clients.

## Learning Explanation
Broadcasting means sending a message to all connected clients, not just the one that sent it. This is important for scenarios like group chats where all participants should receive the messages.

## Instructions

### Step 1: Update the `server.ts` file to broadcast messages

#### Step 1.1: Access all connected clients
**Instructions**: To broadcast a message, you first need to access all the clients connected to the WebSocket server.

<details> 
<summary>Click to reveal a hint for Step 1.1</summary>
Use the `wss.clients` property. It contains a set of all currently connected clients.
</details>

**Explanation**:
- **`wss.clients`**: This property contains a set of all active WebSocket connections (clients). It allows you to iterate over each connected client to perform actions like sending messages.

---

#### Step 1.2: Iterate over each client
**Instructions**: Next, you need to loop through all connected clients so you can send the broadcast message to each one.

<details> 
<summary>Click to reveal a hint for Step 1.2</summary>
Use the `forEach` method to iterate over the set of clients in `wss.clients`.
</details>

**Explanation**:
- **`forEach`**: This is a method available on arrays and sets that allows you to run a function for every element in the collection. Here, it’s used to loop through each client.

---

#### Step 1.3: Check if the client is ready to receive messages
**Instructions**: Before sending a message, you should ensure the client is ready to receive it.

<details> 
<summary>Click to reveal a hint for Step 1.3</summary>
Check if `client.readyState` equals `WebSocket.OPEN` before sending the message.
</details>

**Explanation**:
- **`client.readyState`**: This property indicates the state of the connection. It should be `WebSocket.OPEN` to confirm that the connection is open and ready to communicate.
- **`WebSocket.OPEN`**: This constant represents the state where the connection is open and ready to communicate.

---

#### Step 1.4: Send the broadcast message to each client
**Instructions**: Finally, send the message to each connected client.

<details> 
<summary>Click to reveal a hint for Step 1.4</summary>
Use the `send` method on each client to send the message.
</details>

**Explanation**:
- **`client.send(...)`**: This method sends data from the server to the client. In this case, it sends the received message to all connected clients with a "Broadcast:" prefix.

---

<details> 
<summary>Click to reveal the full solution</summary>

```typescript
ws.on('message', (message: string) => {
  console.log('Received:', message);
  
  // Broadcast to all clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Broadcast: ${message}`);
    }
  });
});
```

**Explanation**:

The `wss.clients` property contains all active WebSocket connections.
The `forEach` method is used to send the message to every connected client.
The `client.readyState === WebSocket.OPEN` check ensures that only clients with an open connection receive the message.
The `client.send(...)` method broadcasts the received message to all connected clients.

</details>

### Step 2: Run and test the server
**Instructions**: Restart the server using the same command as before:

```bash
npx ts-node server.ts
```

**Explanation:**
Restarting the server is necessary to apply the changes. Now, the server will broadcast messages to all connected clients.

**Testing the server:**
- Open a WebSocket client tool like WebSocket King, or use the browser's developer tools.
- Connect to ws://localhost:8080.
- Send a message from one client. You should see the message logged in the terminal and broadcast to all other connected clients.
