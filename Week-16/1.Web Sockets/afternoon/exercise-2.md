# Exercise 2: Echo WebSocket Server in TypeScript

## Objective
Modify the server to send back (echo) any messages it receives from clients.

## Learning Explanation
An echo server is a basic type of server that sends back to the client exactly what it receives. This exercise will help you understand how messages are transmitted between the client and server using WebSockets. By echoing messages, you can see how data flows through your WebSocket server.

## Instructions

### Step 1: Update the server to handle messages

#### Step 1.1: Listen for messages sent from the client.

**Instructions:** Inside the `connection` event handler (where you already log when a client connects), add code to listen for messages from the client. This is how your server will know when a client has sent data.

<details> 
  <summary>Click to reveal a hint for Step 1.1</summary>
  
  Use the `message` event on the WebSocket instance (`ws`) to listen for incoming messages. 
  This event is triggered whenever the client sends a message.
</details> 

<details> 
  <summary>Click to reveal the solution for Step 1.1</summary>

  ```typescript
  ws.on('message', (message: string) => {
    console.log('Received:', message);
  });
  ```

</details> 

### Explanation:

- **`ws.on('message')`**: Listens for messages from the client. The `message` event is triggered each time the client sends data to the server.
- **`message: string`**: The data sent from the client is captured in the `message` parameter, which is then logged to the console. This lets you see what the server received from the client.

---

#### Step 1.2: Echo the received message back to the client.

**Instructions**: Once the server receives a message, you’ll want to send that message back to the client. This will demonstrate the two-way communication capabilities of WebSockets.

<details> 
  <summary>Click to reveal a hint for Step 1.2</summary>
  
  Use `ws.send(...)` to send the received message back to the client. The `send` method sends data from the server to the client.
</details>

<details> 
  <summary>Click to reveal the solution for Step 1.2</summary>
  
  ```typescript
  ws.send(`Server received: ${message}`);
  ```

  Explanation:
  
  - ws.send(...): Sends a message back to the client. In this case, it sends back the original message received from the client, along with a confirmation text ("Server received:"). This shows that the server successfully received and processed the client's message.
    
</details>

### Step 2: Run the server

**Instructions**: After updating the server code, you need to restart the server to apply the changes. Run the following command in your terminal:

```bash
npx ts-node server.ts
```

**Explanation**: `npx ts-node server.ts`: This command restarts the server, now with the ability to echo back messages it receives from clients. Once running, you can connect a client and test the server to see the echoed messages.

### Step 3: Testing the server
1. Open a WebSocket client tool like WebSocket King, or use the browser's developer tools.
2. Connect to ws://localhost:8080.
3. Send a message from the client. You should see the server log the message and then send it back to you.
4. Verify that the message you sent is echoed back to the client with the prefix "Server received:".
