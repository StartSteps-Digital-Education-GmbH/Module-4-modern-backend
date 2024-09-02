### **Implementing the Join Room Feature**

In this chapter, we'll enhance our chat application by allowing users to join existing rooms. Currently, users can only create rooms without the ability to join them. The goal of this feature is to allow users to join any available room and chat with others in that room.

### **Objectives**

1.  **Join Room Feature**: Implement functionality to allow users to join a specific room.
2.  **UI Enhancement**: Format each room into a clickable button that users can interact with.
3.  **Room Management**: Automatically join users to the room they create and disable the button for the room they are currently in.

### **Why Are We Doing This?**

-   **User Experience**: Allowing users to join and switch between different rooms enhances the user experience by making the chat application more dynamic and interactive.
-   **Best Practices**: Implementing this feature using context and socket events ensures that our application remains scalable, maintainable, and follows best practices in real-time communication.

### Step 1: Extend EVENTS on client and serverside:
```
export const EVENTS = {
    connection: "connection",
    CLIENT:{
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM"
    },//events that client can emit, and the server can listen to(on)
    SERVER:{
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    }//events that server can emit, and the client can listen to(on)
}
```

### **Step 1: Handle Room Joining on the Client Side**

**Objective**: Implement the client-side logic to allow users to join a room when they click on it.

**Why?**

-   **Interactive UI**: By turning each room into a clickable button, users can actively choose which room they want to join.
-   **Real-Time Room Switching**: Users can switch between rooms in real-time, allowing them to participate in multiple conversations without leaving the application.

**Instructions:**

1.  **Go to `RoomsContainer.tsx` in `client/src/containers`:**

2.  **Add the `handleJoinRoom` function to manage room joining:**

typescript

Copy code

`const handleJoinRoom = (key: string) => {
    if (key === roomId) return; // Exit function if the user is already in the room

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key); // Emit the JOIN_ROOM event to the server with the roomId
};`

**Explanation**:

-   **handleJoinRoom**: This function receives a room ID (`key`) as a parameter and emits a `JOIN_ROOM` event to the server. If the user is already in the room, the function returns early, preventing unnecessary operations.

**Best Practice**: Early return is a common practice to avoid unnecessary processing, especially in scenarios where an operation is not required.

### **Step 2: Modify the JSX to Render Room Buttons**

**Objective**: Update the JSX to render each room as a button that users can click to join.

**Why?**

-   **User Interaction**: Rendering each room as a button provides a clear and intuitive way for users to join rooms.
-   **Visual Feedback**: Disabling the button for the room the user is currently in provides visual feedback, enhancing the user experience.

**Instructions:**

1.  **Update the `RoomsContainer` return statement to map rooms to buttons:**

typescript

Copy code

`return (
    <nav>
        <div>
            <input placeholder="Room Name" ref={newRoomRef} />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>

        {rooms.map(({ id, name }) => (
            <div key={id}>
                <button
                    disabled={id === roomId} // Disable the button if the user is already in this room
                    title={`Join ${name}`}
                    onClick={() => handleJoinRoom(id)} // Handle room joining on button click
                >
                    {name} {/* Display the room name */}
                </button>
            </div>
        ))}
    </nav>
);`

**Explanation**:

-   **Mapping Rooms to Buttons**: The `rooms.map` function iterates over each room in the `rooms` array and creates a button for each one. The button is disabled if the user is already in that room.
-   **Dynamic Rendering**: This approach ensures that as rooms are created or updated, the UI reflects these changes in real-time.

**Common Practice**: Using `.map` to dynamically render UI elements based on data arrays is a common practice in React, enabling dynamic and responsive UIs.

### **Step 3: Handle Room Creation and Joining on the Server Side**

**Objective**: Ensure that the server correctly handles room creation and automatically joins the user to the new room.

**Why?**

-   **Room Management**: Managing room creation and joining on the server ensures that all users have a consistent experience and that the state of the application remains synchronized across all clients.

**Instructions:**

1.  **Go to `socket.ts` in `server/src`:**

2.  **Update the `socket.on(EVENTS.CLIENT.CREATE_ROOM)` event handler:**

typescript

Copy code

`const rooms: Room[] = []; // Initialize rooms as an empty array

function socket({ io }: { io: Server }) {
    logger.info("Sockets enabled");

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            logger.info(`Created Room: ${roomName}`);

            // Create Room
            const roomId = v4();
            rooms.push({ id: roomId, name: roomName });

            // Join Room
            socket.join(roomId);

            // Broadcast event saying alerting users about new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            // Emit all the rooms back to the room creator
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            // Emit back to user that he joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
    });
}`

**Explanation**:

-   **Initialization of `rooms`**: The `rooms` array is initialized as an empty array, ensuring no default rooms are present.
-   **Room Creation and Joining**: When a user creates a room, the server generates a new room ID, adds the room to the `rooms` array, and automatically joins the user to that room.
-   **Broadcasting Room Information**: The server broadcasts the updated list of rooms to all connected clients and sends a `JOINED_ROOM` event back to the user who created the room.

### **Testing the Feature**

Now that we've implemented the join room feature, it's time to test our application.

1.  **Run the Application**: Start both the client and server and open the application in your browser.
2.  **Create and Join Rooms**: Test the feature by creating rooms and switching between them. Ensure that the button for the current room is disabled and that the application updates in real-time across multiple browser windows or tabs.

By following these steps, we've successfully implemented the join room feature and enhanced the overall user experience in our chat application.### **Implementing the Join Room Feature**

In this chapter, we'll enhance our chat application by allowing users to join existing rooms. Currently, users can only create rooms without the ability to join them. The goal of this feature is to allow users to join any available room and chat with others in that room.

### **Objectives**

1.  **Join Room Feature**: Implement functionality to allow users to join a specific room.
2.  **UI Enhancement**: Format each room into a clickable button that users can interact with.
3.  **Room Management**: Automatically join users to the room they create and disable the button for the room they are currently in.

### **Why Are We Doing This?**

-   **User Experience**: Allowing users to join and switch between different rooms enhances the user experience by making the chat application more dynamic and interactive.
-   **Best Practices**: Implementing this feature using context and socket events ensures that our application remains scalable, maintainable, and follows best practices in real-time communication.

### **Step 1: Handle Room Joining on the Client Side**

**Objective**: Implement the client-side logic to allow users to join a room when they click on it.

**Why?**

-   **Interactive UI**: By turning each room into a clickable button, users can actively choose which room they want to join.
-   **Real-Time Room Switching**: Users can switch between rooms in real-time, allowing them to participate in multiple conversations without leaving the application.

**Instructions:**

1.  **Go to `RoomsContainer.tsx` in `client/src/containers`:**

2.  **Add the `handleJoinRoom` function to manage room joining:**

typescript

Copy code

`const handleJoinRoom = (key: string) => {
    if (key === roomId) return; // Exit function if the user is already in the room

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key); // Emit the JOIN_ROOM event to the server with the roomId
};`

**Explanation**:

-   **handleJoinRoom**: This function receives a room ID (`key`) as a parameter and emits a `JOIN_ROOM` event to the server. If the user is already in the room, the function returns early, preventing unnecessary operations.

**Best Practice**: Early return is a common practice to avoid unnecessary processing, especially in scenarios where an operation is not required.

### **Step 2: Modify the JSX to Render Room Buttons**

**Objective**: Update the JSX to render each room as a button that users can click to join.

**Why?**

-   **User Interaction**: Rendering each room as a button provides a clear and intuitive way for users to join rooms.
-   **Visual Feedback**: Disabling the button for the room the user is currently in provides visual feedback, enhancing the user experience.

**Instructions:**

1.  **Update the `RoomsContainer` return statement to map rooms to buttons:**

typescript

Copy code

`return (
    <nav>
        <div>
            <input placeholder="Room Name" ref={newRoomRef} />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>

        {rooms.map(({ id, name }) => (
            <div key={id}>
                <button
                    disabled={id === roomId} // Disable the button if the user is already in this room
                    title={`Join ${name}`}
                    onClick={() => handleJoinRoom(id)} // Handle room joining on button click
                >
                    {name} {/* Display the room name */}
                </button>
            </div>
        ))}
    </nav>
);`

**Explanation**:

-   **Mapping Rooms to Buttons**: The `rooms.map` function iterates over each room in the `rooms` array and creates a button for each one. The button is disabled if the user is already in that room.
-   **Dynamic Rendering**: This approach ensures that as rooms are created or updated, the UI reflects these changes in real-time.

**Common Practice**: Using `.map` to dynamically render UI elements based on data arrays is a common practice in React, enabling dynamic and responsive UIs.

### **Step 3: Initialize rooms as empty array on client side**
Rooms array is initialized with an object that contains empty strings of id and name.
That causes rooms to always have at least one room, and we want it to be empty by default since there are no created rooms at the moment.


- in socketcontext set rooms as empty array: `rooms: [],`
- in socketsprovider set rooms state as empty array:
  `const [rooms, setRooms] = useState<Room[]>([]);`

### **Step 4: Initialize rooms as empty array on the Server Side**

**Objective**: Ensure that the server correctly handles room creation and automatically joins the user to the new room.

**Why?**

-   **Room Management**: Managing room creation and joining on the server ensures that all users have a consistent experience and that the state of the application remains synchronized across all clients.

**Instructions:**

1.  **Go to `socket.ts` in `server/src`:**

2.  **Update the `socket.on(EVENTS.CLIENT.CREATE_ROOM)` event handler:**

`const rooms: Room[] = []; // Initialize rooms as an empty array`


**Explanation**:

-   **Initialization of `rooms`**: The `rooms` array is initialized as an empty array, ensuring no default rooms are present.
-   **Room Creation and Joining**: When a user creates a room, the server generates a new room ID, adds the room to the `rooms` array, and automatically joins the user to that room.
-   **Broadcasting Room Information**: The server broadcasts the updated list of rooms to all connected clients and sends a `JOINED_ROOM` event back to the user who created the room.

### **Testing the Feature**

Now that we've implemented the join room feature, it's time to test our application.

1.  **Run the Application**: Start both the client and server and open the application in your browser.
2.  **Create and Join Rooms**: Test the feature by creating rooms and switching between them. Ensure that the button for the current room is disabled and that the application updates in real-time across multiple browser windows or tabs.
