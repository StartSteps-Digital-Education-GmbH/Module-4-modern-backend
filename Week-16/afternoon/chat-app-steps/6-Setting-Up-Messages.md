Implementing Chat Messaging
---------------------------

In this section, we will implement the messaging functionality for our chat application. Messaging is a core feature of any chat application, allowing users to communicate in real-time within chat rooms. To achieve this, we will follow a similar pattern to how we implemented chat rooms, but with a focus on handling messages.

### Objectives

-   **Expand the Event System**: Add specific events to handle sending and receiving messages.
-   **Create a Message Structure**: Define the structure of messages to ensure consistency and type safety.
-   **Manage Messages in the Context**: Extend our global state management (context) to handle messages.
-   **Implement Client-Side Message Handling**: Create a UI component to allow users to send and display messages.
-   **Set Up Server-Side Message Broadcasting**: Ensure the server can process and broadcast messages to all clients in a specific chat room.

### Why Are We Doing This?

-   **Real-Time Communication**: Messaging is the primary mode of communication in a chat application. By implementing this feature, we allow users to interact with each other in real-time.
-   **Consistency Across Components**: Managing messages in the global context ensures that all parts of our application have access to the latest messages, maintaining consistency.
-   **Best Practices**: Using established patterns such as React Context for state management and Socket.IO for real-time communication ensures that our code is maintainable, scalable, and easy to understand.

* * * * *

### **Client-side Implementation**

### **Step 1: Expand the `EVENTS` Object**

**Objective:** Define new events to handle messaging between the client and the server.

**Why?**

-   **Centralized Event Management**: By defining all events in a central location, we make it easier to manage and maintain our codebase. It becomes straightforward to see what events exist and how they are used.
-   **Consistency**: Ensuring that the same event names are used across both client and server prevents errors caused by typos or mismatched strings.

**Instructions:**

1.  **Go to `events.ts` in `client/src/config`:**
2.  **Add the following event under both `CLIENT` and `SERVER` sections:**
   
```typescript
export const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE", // New event for sending a message
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE", // New event for broadcasting a message
  },
};
```

**Explanation:**

-   **SEND_ROOM_MESSAGE**: This event is triggered by the client when a user sends a message.
-   **ROOM_MESSAGE**: This event is used by the server to broadcast the message to all users in the specified room.

* * * * *

### **Step 2: Define the `Message` Interface**

**Objective:** Create a TypeScript interface to describe the structure of a message.

**Why?**

-   **Type Safety**: Using TypeScript interfaces helps us ensure that all messages have a consistent structure, reducing the chance of runtime errors.
-   **Maintainability**: Defining the structure of messages in a single location makes it easier to modify or extend later.

**Instructions:**

1.  **In `socket.context.tsx`, add the following interface:**

```typescript
interface Message {
  username: string;
  content: string;
  time: string;
}
```

**Explanation:**

-   This interface ensures that every message object will have a `username`, `content`, and `time`. This helps maintain a consistent message format across the application.

* * * * *

### **Step 3: Update the Context to Handle Messages**

**Objective:** Extend the global context to manage messages.

**Why?**

-   **Global State Management**: By adding messages to the context, we make sure that any component within our application can access and update the list of messages. This is essential for a chat application where multiple components may need to display or interact with messages.
-   **Best Practice**: Using React Context for managing global state is a common best practice, especially when dealing with state that needs to be shared across many components.

**Instructions:**

1.  **Extend the `Context` interface in `socket.context.tsx`:**

```typescript
interface Context {
      socket: Socket;
      username?: string;
      setUsername: (value?: string) => void;
      roomId?: string;
      rooms: Room[];
      messages?: Message[];
      setMessages: (value?: Message[]) => void;
    }
```

2. **Extend the SocketContext instance to include `setMessages`**
   
```typescript
// Create a context to store the socket instance and other values
export const SocketContext = createContext<Context>({
  socket,
  setUsername: () => {}, // Provide a default no-op function to match the expected type
  rooms: [{id: "", name: ""}],
  setMessages: () => []
});
```

3.  **Create `messages` and `setMessages` state in `SocketsProvider`:**

```typescript
const [messages, setMessages] = useState<Message[] | undefined>([]);
```

4. **Listen for Incoming Messages from the Server**

    **Objective:** Update the client to listen for incoming messages from the server and update the messages state accordingly.
    
    **Why?**
    
    -   **Real-Time Updates:** In a chat application, it's crucial that messages sent by other users in the same room are immediately displayed to everyone in that room. Listening for the `ROOM_MESSAGE` event ensures that all users see new messages as they arrive.
    -   **State Management:** By updating the messages state whenever a new message is received, the UI will re-render to show the latest messages, providing a seamless user experience.
    
    **Instructions: Add an event listener for `ROOM_MESSAGE` in the `useEffect` hook**:
    
        -   Use the `socket.on` method to listen for the `ROOM_MESSAGE` event emitted by the server.
        -   When the event is received, update the `messages` state to include the new message.
    
      ```typescript
      socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ content, username, time }) => {
        if (messages) {
          setMessages([...messages, { content, username, time }]);
        }
      });
      ```
      
      **Explanation:**
      
      -   **socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ content, username, time }))**: This line sets up an event listener that listens for `ROOM_MESSAGE` events from the server.
      -   **setMessages([...messages, { content, username, time }])**: This line updates the `messages` state by appending the new message to the existing list of messages. The spread operator (`...messages`) ensures that all previous messages are preserved in the state.
      
      **Best Practice:**
      
      -   Listening for events and updating the state in response to those events is a common practice in real-time applications. This ensures that your UI is always in sync with the current state of the server, providing a responsive and up-to-date user experience.

5.  **Update the `SocketContext.Provider` to pass down `messages` and `setMessages`:**

```typescript
return (
      <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId, messages, setMessages }}>
        {children}
      </SocketContext.Provider>
    );
```

**Explanation:**

-   **State Management**: By keeping `messages` in the state and passing them through the context, we ensure that any component that needs to display or modify messages has access to the current state of messages.
-   **Scalability**: This approach scales well as the application grows, allowing additional components to interact with the message data without requiring significant changes to the existing code.

* * * * *

### **Step 4: Set Up the `MessagesContainer` Component**

**Objective:** Create a React component that handles the display and sending of messages.

**Why?**

-   **Component Separation**: Keeping the logic for handling messages within a dedicated component makes the application easier to maintain and understand. Each component has a clear responsibility.
-   **User Interaction**: This component will provide the UI elements necessary for users to interact with the chat, such as sending messages and viewing chat history.

**Instructions:**

1.  **Create `MessagesContainer.tsx` in `client/src/containers`:**

2.  **Access the context values at the top of the component:**

```typescript
const { socket, messages, roomId, username, setMessages } = useSockets();
```

3.  **Create a state for the new message input using `useRef`:**

```typescript
const newMessageRef = useRef<HTMLTextAreaElement>(null);
```

4.  **Implement the `handleSendMessage` function to handle sending messages:**

  ```typescript
   const handleSendMessage = () => {
    const messageContent = newMessageRef.current?.value; //Retrieve message from input field
    if (!String(messageContent).trim()) return; // Exit function when message is empty

    // Send message to server with message details
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      messageContent,
      username,
    });

    // Update the local state in context to include the new message
    const date = new Date();
    if (messages && messageContent) {
      setMessages([
        ...messages,
        {
          username: "You",
          content: messageContent,
          time: `${date.getHours()}:${date.getMinutes()}`,
        },
      ]);
    }

    // Clear input field
    if (newMessageRef.current) {
      newMessageRef.current.value = "";
    }
  };
  ```

5.  **Render the message input and the list of messages:**
   - **Render the List of Messages**: Display the messages that have been sent in the chat.
      ```typescript
      {messages?.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      ```
      *Explanation*:
      - Maps over the messages array and creates a paragraph (`<p>`) element for each message.
      - Also called `Dynamic Rendering`; As new messages are added to the messages array, they will automatically appear in the UI because the component re-renders whenever the state changes.
   
   - ***Render the Message Input Field and Send Button**: Provide an interface for users to type and send new messages.

      ```typescript
      <div>
        <textarea rows={1} placeholder="Message" ref={newMessageRef} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      ```

      *Explanation*:
      -   This `div` contains a `textarea` for typing new messages and a `button` to send the message.
  
      -   **`<textarea rows={1} placeholder="Message" ref={newMessageRef} />`**:
          -   `rows={1}`: This sets the height of the `textarea` to show only one row, making it look like a single-line input field.
          -   `placeholder="Message"`: This text appears inside the input field when it is empty, guiding the user to enter a message.
          -   `ref={newMessageRef}`: The `ref` attribute is used to directly access the DOM element. `newMessageRef` is a reference created using `useRef`. This allows the code to get or set the value of the `textarea` without triggering a re-render.
      -   **`<button onClick={handleSendMessage}>Send</button>`**:
          -   `onClick={handleSendMessage}`: This sets up an event listener that triggers the `handleSendMessage` function when the user clicks the "Send" button. This function will handle extracting the message content, sending it to the server, and updating the message list.
      - **Efficiency**: Using ref with the textarea allows the component to manage the input field without unnecessary re-renders, which can be more efficient in some cases compared to using useState.

**Final Code for step 5** 

```typescript
return (
      <div>
        {messages?.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
        <div>
          <textarea rows={1} placeholder="Message" ref={newMessageRef} />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
```

**Explanation:**

-   **Message Handling**: The `handleSendMessage` function takes care of retrieving the message content, emitting it to the server, and updating the local state to reflect the new message.
-   **UI Rendering**: The component dynamically renders all messages in the current room and provides a text area for the user to type new messages.
-   **Efficient Updates**: By updating the messages state directly and using the spread operator, we ensure that the UI is updated efficiently without unnecessary re-renders.

* * * * *

### **Server-side Implementation**

### **Step 5: Handle Message Broadcasting on the Server**

**Objective:** Process incoming messages on the server and broadcast them to all clients in the room.

**Why?**

-   **Real-Time Updates**: Broadcasting messages ensures that all clients in a room receive the latest messages in real-time, which is the core functionality of a chat application.
-   **Best Practice**: Using socket events to handle communication between the client and server is a best practice for real-time applications. It provides a scalable and efficient way to manage real-time data flow.

**Instructions:**

1.  **Go to `socket.ts` in `server/src`:**
2.  **Expand the EVENTS constant**
    ```typescript
    export const EVENTS = {
      connection: "connection",
      CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE", // New event for sending a message
      },
      SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE", // New event for broadcasting a message
      },
    };
    ```

3.  **Add the following event handler to manage incoming messages:**

```typescript
socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, content, username }) => {
      const date = new Date();
      socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        content,
        username,
        time: ${date.getHours()}:${date.getMinutes()}`,
      });
    });
```

**Explanation:**

-   **Event Handling**: The server listens for the `SEND_ROOM_MESSAGE` event from the client. When this event is received, the server broadcasts the message to all clients in the specified room.
-   **Room-Specific Broadcasting**: By using `socket.to(roomId).emit`, we ensure that the message is only sent to clients in the same room, maintaining the integrity of separate chat rooms.
-   **Date Management**: The server also handles time-stamping the message, ensuring that all messages have a consistent format.
