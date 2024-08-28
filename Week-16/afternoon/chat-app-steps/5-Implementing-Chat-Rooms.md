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

### Step 1: Add Rooms Logic to the Context

**Objective:** Manage room-related data (like room IDs and names) globally within the app by adding it to the context.

**Why?** By managing room-related data in the context, we ensure that all components can access and update this data easily. This is essential for a chat application where multiple components need to know which rooms are available and which room the user has joined.

**Instructions:**

1.  **Create a New Interface for Room:**

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

3.  **Create State for Room ID and Rooms in Context Provider:**

    **Explanation:**
    -   We want room-related data to be dynamically updated and accessed by any component in the context.
    -   Use `useState` to manage `roomId` and `rooms` within the context provider.
    -   Managing state with useState within a context provider is a best practice for ensuring that state is easily shareable across components.

    ```typescript
    const [roomId, setRoomId] = useState<string | undefined>("");
    const [rooms, setRooms] = useState<Room[]>([{ id: "", name: "" }]);
    ```

4.  **Update the Context Provider Value:**

    **Explanation:**
    -   We want to make room data accessible to any component wrapped with this provider, ensuring that the UI stays in sync with the application state.
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

1.  **Create an `events.ts` File:**

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

1.  **Create State for Room Name:**

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

### Step 4: Handle Room Creation on the Server

**Objective:** Process room creation requests from the client, generate unique room IDs, and broadcast room updates.

**Why?** Handling room creation on the server ensures that room data is consistent and shared among all connected clients.

**Instructions:**

1.  **Set Up the Socket Event Listener:**

    **Explanation:**

    -   Listen for the room creation event, log the room name, and generate a unique room ID using `uuid`.
    -   This is a best practice for ensuring that each room has a unique identifier, preventing name collisions.

    ```typescript
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      logger.info(`Created Room: ${roomName}`);

      const roomId = v4();
      rooms.push({ id: roomId, name: roomName });

      socket.join(roomId);

      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
    ```

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
            -   `default.ts`: Stores configuration settings like the SOCKET_URL.
            -   `events.ts`: Stores constants for different events used in the application.
        -   **App.tsx**: The main component that renders the RoomsContainer and MessagesContainer. It handles the user's login and displays the appropriate UI based on whether the user has entered a username.
-   **server/**
    -   **src/**
        -   `socket.ts`: Handles all socket-related events on the server side, such as room creation and broadcasting updates to connected clients.
        -   `utils/logger.ts`: Provides logging functionality for the server, helping to track events like room creation and user connections.
