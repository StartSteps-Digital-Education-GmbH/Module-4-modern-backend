# Implementing Chat Rooms

In this chapter, we will focus on implementing the chat rooms functionality in our application.
- Chat rooms allow users to join specific conversations.
- We will manage room-related data, such as room IDs and names, through React's context API and handle real-time communication using Socket.IO.
- This approach ensures that the room data is accessible globally throughout the app and that updates are reflected in real-time for all users.
- Each Room will have its own unique id and name:
  - `{ roomId: string, name: string }`

The implementation will be broken down into several steps:

1. **Adding Room Logic to the Context**: We'll extend our context to include room-related data and provide it to the child components.
2. **Defining Events**: We'll centralize the event names used in our application for better maintainability and consistency.
3. **Setting Up Room Creation in RoomsContainer**: We'll create a form that allows users to create new rooms, which will be displayed dynamically in the UI.
4. **Handling Room Creation on the Server**: We'll process room creation requests, generate unique room IDs, and broadcast updates to all connected clients.

---
## Client-side

### Step 1: Add Rooms Logic to the Context

**Objective:** Manage room-related data (like room IDs and names) globally within the app by adding it to the context.

**Why?** By managing room-related data in the context, we ensure that all components can access and update this data easily. This is essential for a chat application where multiple components need to know which rooms are available and which room the user has joined.

**Instructions:**

1.  **Create a New Interface for Room in `socket.context.tsx`:**

    **Explanation:**

    -   `Room` interface will define the structure for room objects, with `id` and `name` properties.
    -   This is a common practice in TypeScript to ensure consistency and type safety across the application.

    
    ```typescript
    interface Room {
      id: string;
      name: string;
    }
    ```

2.  **Extend the Context Interface:**

    **Explanation:**

    -   We want all components within the context to access and update room-related data, therefore we:
         - Add `roomId`, `rooms`, and their setters to the context interface.
    -   This ensures that any component using the context can access and update the room data.

    ```typescript
    interface Context {
      socket: Socket;
      username?: string;
      setUsername: (value?: string) => void;
      roomId?: string;
      rooms: Room[];
    }
    ```
3. **Add `rooms` to `SocketContext`**
   ```typescript
   rooms: [{id: "", name: ""}]
   ```

4.  **Create State for Room ID and Rooms in Context Provider:**

    **Explanation:**
    -   Use `useState` to manage `roomId` and `rooms` within the **context provider**.
    -   Managing state with useState within a context provider is a best practice for ensuring that state is easily shareable across components.

    In the function `SocketsProvider()` add the following at the top:
    
    ```typescript
    const [roomId, setRoomId] = useState<string | undefined>("");
    const [rooms, setRooms] = useState<Room[]>([{ id: "", name: "" }]);
    ```

5. ### Handle Room Events in `socket.context.tsx`

-  When the server sends updates about available rooms or when a user joins a room, we need to update the state on the client side so that the UI reflects these changes in real-time.

  **Instructions:**
  
  1.  **Listen for Server Events:**
  
      **Explanation:**
  
      -   You need to listen for `EVENTS.SERVER.ROOMS` and `EVENTS.SERVER.JOINED_ROOM` events from the server.
      -   When these events are received, the state of `rooms` and `roomId` should be updated accordingly.
  
      **Add the Following Code in `socket.context.tsx` within the `SocketsProvider` Component:**
  
      typescript
  
      Copy code
  
      `socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
      });
  
      socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
      });`


6.  **Update the Context Provider Value:**

    **Explanation:**
    -   Pass `roomId` and `rooms` along with their setters through the context provider.
    -   This ensures that any component wrapped with this provider can access and update the room data.
    -   Providing state and functions through context is a best practice for managing global state in a React application.

    ```typescript
    return (
      <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId }}>
        {children}
      </SocketContext.Provider>
    );
    ```

### Step 2: Define Events in the Config Folder

**Objective** We want to define constants for different events, separating client and server events.
**Why?** By storing event names in a separate file, you can easily manage and update them in one place. 

**Instructions:**

1.  **Create an `events.ts` File in `client/src/config`:**

    **Explanation:**

    -   Define constants for different events, separating client and server events.
    -   This is a common practice for organizing code and reducing hardcoding.
      
    ```typescript
    export const EVENTS = {
      connection: "connection",
      CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
      },
      SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
      },
    };
    ```

### Step 3: Set Up Room Creation in RoomsContainer

**Objective:** Allow users to create new chat rooms and display them in the UI.

**Why?** Creating new rooms is a fundamental feature of a chat application, allowing users to organize conversations into different topics or groups.

**Instructions:**
1.  **Create `Rooms.tsx`**
     - create a file `Rooms.tsx` in `client/src/containers`

2.  **In SocketsProviderCreate State for Room Name:**

    **Explanation:**

    -   Use `useState` to manage the room name input field value.
    -   This is a common practice to manage input fields in React without directly interacting with the DOM.

  
    ```typescript
    const [newRoomName, setNewRoomName] = useState<string>("");
    ```

3.  **Handle Room Creation:**

    **Explanation:**

    -   `handleCreateRoom` checks if the room name is not empty, emits the create room event to the socket, and clears the input field.
    -   Emitting events to the server is how you synchronize actions between the client and server in real-time applications.

    ```typescript
    const handleCreateRoom = () => {
      if (!String(newRoomName).trim()) return;

      socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName: newRoomName });

      setNewRoomName("");
    };
    ```

4.  **Render the Form and Rooms List:**

    **Explanation:**

    -   Render the input field, button, and a list of rooms.
    -   Mapping through `rooms` allows you to dynamically render each room as it's created.

    ```typescript
    return (
      <nav>
        <div>
          <input
            placeholder="Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleCreateRoom}>Create Room</button>
        </div>

        {rooms.map(({ id, name }) => (
          <div key={id}>{name}</div>
        ))}
      </nav>
    );
    ```

# Server-side

## Step 1: Setting Up the Basics
----------------------------------

### 1\. Define the `Room` Interface

**Why?** Defining an interface ensures that all room objects follow the same structure. This is crucial for maintaining type safety and consistency in a TypeScript application.

**Instructions:**

**Code:**

```typescript
interface Room {
  id: string;
  name: string;
}
```

**Explanation:**

-   The `Room` interface defines the structure for room objects with `id` and `name` properties.
-   This is a common practice in TypeScript to ensure type safety and consistency across the application.

### 2\. Define Events Constants

**Objective:** Add the new events to the `EVENTS` constant.

**Instructions:**

**Code:**

```typescript
const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
  },
};
```

**Explanation:**

-   The `EVENTS` constant stores the event names for both client and server events.
-   This is a common practice for organizing code and reducing hardcoding, making the application more maintainable.

### 3\. Initialize the `rooms` Array

**Objective:** Manage the list of all chat rooms on the server.

**Why?** The `rooms` array will store all the chat rooms created on the server, ensuring that all connected clients have access to the current list of rooms.

**Instructions:**

**Code:**

```typescript
const rooms: Room[] = [{ id: "", name: "" }];
```

**Explanation:**

-   The `rooms` array will hold all the room objects, each following the `Room` interface structure.
-   This setup is crucial for managing the rooms and ensuring that all clients have access to the current list of rooms.

* * * * *

## Step 2. Handle Room Creation on the Server

### 1\. Set Up the Socket Event Listener in `socket.ts`

**Objective:** Process room creation requests from the client, generate unique room IDs, and broadcast room updates.

**Why?** Handling room creation on the server ensures that room data is consistent and shared among all connected clients. This keeps the state of the application uniform across different users, which is crucial in a multi-user environment like a chat application.

**Instructions:**
. **Set Up the Socket Event Listener in `socket.ts`:**
        - **Listening for Room Creation Events:** We want to react when the client sends a request to create a new chat room. The `socket.on` method is used to listen for this event, which will be triggered from the client side.
        - **Logging:** `logger.info` is used to log the name of the room that has been created. This is useful for debugging and monitoring purposes.
        - **Generating a Unique Room ID:** Each room needs to have a unique identifier. We use the `uuid` library (`v4()` method) to generate this ID.
        - **Joining the Room:** Once the room is created, the user who created it should automatically join it. This is done using the `socket.join(roomId)` method.
        - **Broadcasting Updates:** 
          - `socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);` sends the updated list of rooms to all clients except the one that triggered the event.
          - `socket.emit(EVENTS.SERVER.ROOMS, rooms);` sends the updated list of rooms back to the client who created the room.
          - `socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);` informs the client that they have successfully joined the newly created room.


**Code:**

```typescript
`socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
  logger.info(`Created Room: ${roomName}`);

  const roomId = v4(); // Generate a unique ID for the new room
  rooms.push({ id: roomId, name: roomName }); // Add the new room to the rooms array

  socket.join(roomId); // The user who created the room automatically joins it

  // Broadcast the updated list of rooms to all clients except the one that triggered the event
  socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

  // Send the updated list of rooms back to the client who created the room
  socket.emit(EVENTS.SERVER.ROOMS, rooms);

  // Inform the client that they have successfully joined the new room
  socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
});
```

**Explanation:**

-   **Event Listener:** The `socket.on` method listens for the `CREATE_ROOM` event from the client.
-   **Logging:** The `logger.info` method logs the name of the room that was created for debugging and monitoring purposes.
-   **Unique Room ID:** The `v4()` method from the `uuid` library generates a unique ID for each new room to prevent collisions.
-   **Add to Rooms Array:** The new room is added to the `rooms` array, ensuring that it is tracked by the server.
-   **Join Room:** The user who created the room automatically joins it, enabling them to start sending and receiving messages in that room.
-   **Broadcast:** The `socket.broadcast.emit` method sends the updated list of rooms to all other connected clients, ensuring they have the latest information.
-   **Emit to Creator:** The `socket.emit` method sends the updated list of rooms and confirmation that the user joined the room back to the client who created it.

* * * * *

### Folder Structure Overview

Here's an overview of the current folder structure and what each file does:

-   **client/**
    -   **src/**
        -   **context/**
            -   `socket.context.tsx`: Manages the socket connection, room, and username state, providing them to the entire application through React's Context API.
        -   **containers/**
            -   `Rooms.tsx`: Manages room creation on the client side, allowing users to input a room name and submit it.
            -   `Messages.tsx`: Will be used to display the messages for the selected room (implementation is forthcoming).
        -   **config/**
            -   `default.ts`: Stores configuration settings like the `SOCKET_URL`.
            -   `events.ts`: Stores constants for different events used in the application.
        -   **App.tsx**: The main component that renders the `RoomsContainer` and `MessagesContainer`. It handles the user's login and displays the appropriate UI based on whether the user has entered a username.
-   **server/**
    -   **src/**
        -   `socket.ts`: Handles all socket-related events on the server side, such as room creation and broadcasting updates to connected clients.
        -   `utils/logger.ts`: Provides logging functionality for the server, helping to track events like room creation and user connections.
