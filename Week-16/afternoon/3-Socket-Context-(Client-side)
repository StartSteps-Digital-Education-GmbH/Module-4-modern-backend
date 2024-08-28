
# Socket Context

We created socket events on the backend side. Now, to fully utilize them, we need to wrap everything on the **client side**. 

**Why Wrap Everything on the Client Side?**
- **Global Access**:  Wrapping the socket connection on the client side allows every component in your React app to easily access the WebSocket connection. This is essential for managing real-time updates across your application.
- **Separation of Concerns**: Separating your WebSocket logic from the rest of your server logic allows you to keep your code modular, making it easier to manage and scale.
  
### 1. Create a Context Folder
- **Objective**: Set up a context for managing socket connections in the React app. By centralizing the WebSocket logic in a context provider, you keep your code clean and maintainable, ensuring that only components that need access to the socket connection use it.
- **Instructions**: 
  - In the `client` directory, create a new folder named `context`.
  - Inside the `context` folder, create a file named `socket.context.tsx`.
  - This will wrap our whole application
- **Explanation**:
      - **Context**: Context in React provides a way to pass data through the component tree without having to pass props down manually at every level. This is a **best practice** for managing global state or connections, like a WebSocket connection, that need to be accessed by multiple components.


### 2. Set Up Socket Context
- **Objective**: Create a context to manage and provide the socket connection throughout the React app.

- **Step 1: Imports**: 
  - In `socket.context.tsx`, start by importing the necessary modules:

    ```typescript
    // Import necessary modules from React and Socket.IO client
    import { createContext, useContext } from 'react';
    import io from 'socket.io-client';
    import { SOCKET_URL } from '../config/default';
    ```
    **Explanation:**

    - `createContext` and `useContext`: These are React hooks used to create and consume context. Context helps in sharing data (in this case, the WebSocket connection) across components without passing props.
    - `io from 'socket.io-client'`: This is the client-side library for Socket.IO, which helps establish a WebSocket connection with the server.
    - `SOCKET_URL`: This is the URL of the WebSocket server (likely http://localhost:4000), retrieved from a configuration file.

- **Step 2: Initializing connection**
  - Initialize a connection to the WebSocket server and create a context to store the socket instance:
    
    ```typescript
    // Initialize a Socket.IO connection using the SOCKET_URL from the config file
    export const socket = io(SOCKET_URL);

    // Create a context to store the socket instance, which can be accessed by any component in the app
    export const SocketContext = createContext(socket);
    ```

    **Explanation:**
    - **Socket Initialization**: `io(SOCKET_URL)` creates a new WebSocket connection to the specified server.         This socket instance will be shared across the application.
    - **SocketContext**: This context will hold the socket instance, allowing it to be accessed by any component in the app. This is a **best practice** for managing global state or connections.

- **Step 3: Provider Component**
  - Define a provider component that will wrap the entire app and provide the socket instance to all child components:

    ```typescript
    // Define a provider component to wrap around the app and provide the socket instance to all child components
    function SocketsProvider({ children }: { children: React.ReactNode }) {
      return (
        // Use the context provider to pass the socket instance to any component that needs it
        <SocketContext.Provider value={socket}>
          {children} {/* Render any child components passed to the provider */}
        </SocketContext.Provider>
      );
    }
    ```
    
    **Explanation:**
    - **SocketsProvider**: This component wraps your app and provides the socket instance to any component that needs it. This is a best practice for ensuring that the socket connection is globally accessible.
    - **Children Prop**: `{children}` represents any child components passed to `SocketsProvider`. This ensures that the entire React app, wrapped in `SocketsProvider`, has access to the socket connection.
      
- **Step 4: Custom Hook**
  - Create a custom hook that simplifies accessing the socket context and makes it easier to understand:
    ```typescript
    // Custom hook to allow easy access to the socket context in any component
    export const useSockets = () => useContext(SocketContext);
    ```

    **Explanation**:
    - The socket instance can now be accessed with `useSockets()` instead of `useContext(SocketContext)`.
    - **Clarity**: This clearly communicates the intent of the code; accession the socket connection. Thus abstracts away the complexity
    
- **Step 5: Export the Provider**
  - Export `SocketsProvider` as the default export:
    ```typescript
    export default SocketsProvider;
    ```
    **Explanation**: This allows you to import it easily in your index.tsx file and wrap your entire application with it.


### 3. Create a Config Folder

**Objective:** Store configuration settings for the client-side application.

**Instructions:**

1. In the `client` directory, create a new folder named `config`.
2. Inside the `config` folder, create a file named `default.ts`.
3. In `default.ts`, define the `SOCKET_URL` as follows:

    ```typescript
    export const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000";
    ```

**Explanation:**

- This line attempts to retrieve the `SOCKET_URL` from the environment variables. If it's not defined, it defaults to `http://localhost:4000`, which is the address of the Socket.IO server running on the backend.

---

### Step 4: Wrapping the App Component

**Objective:** Use the `SocketsProvider` to wrap the entire React application, making the socket connection available throughout the app.

**Instructions:**

- `Index.tsx` is the entry point of our frontend application, as it is attaching root component: App to the HTML document.
- **Step 1:** In `index.tsx`, import the `SocketsProvider`:
  ```typescript
    import SocketsProvider from './context/socket.context';
  ```
- **Step 2:** Use the `SocketsProvider`.
  - We will do this in `root.render()` by wrapping our `App` with our `SocketsProvider`.

    ```typescript
    root.render(
      <React.StrictMode>
        <SocketsProvider>
          <App />
        </SocketsProvider>
      </React.StrictMode>
    );
    ```

**Explanation:**

- Wrapping the `App` component with `SocketsProvider` ensures that the socket connection is available to any component in the app that needs it.

---

### Step 5: Accessing the Socket in the App Component

**Objective:** Use the socket connection in the `App` component to manage and display the socket ID.

### Step 5.1: Clear Out the Existing `App` Component

**Instructions:**

1. Open `App.tsx`.
2. Clear out any existing code inside the `App` function, so you start with an empty function.
3. Your `App.tsx` file should look like this:

    ```typescript
    function App() {
      // Your new code will go here
    }

    export default App;
    ```

**Explanation:**

- This step ensures that you’re starting with a clean slate, making it easier to follow the upcoming instructions.

### Step 5.2: Import Necessary Modules

**Instructions:**

1. At the top of your `App.tsx` file, import the `useEffect` and `useState` hooks from React.
2. Also, import `useSockets` from the `socket.context` file.

    ```typescript
    import { useEffect, useState } from 'react';
    import { useSockets } from './context/socket.context';
    ```

**Explanation:**

- `useEffect` and `useState` are React hooks that allow you to manage state and side effects within your component.
- `useSockets` is the custom hook you created earlier to easily access the socket connection from the context.

### Step 5.3: Initialize the Socket and State

**Instructions:**

1. Inside the `App` function, use `useSockets` to retrieve the socket connection.
2. Initialize a `socketId` state variable with an empty string as the initial value.

    ```typescript
    function App() {
      const { socket } = useSockets();
      const [socketId, setSocketId] = useState<string | undefined>("");
    ```

**Explanation:**

- `socket`: The socket connection retrieved from the context, which you will use to interact with the server.
- `socketId`: A state variable that will store the ID of the connected socket.

### Step 5.4: Set Up a `useEffect` Hook to Listen for the `connect` Event

**Instructions:**

1. Inside the `App` function, add a `useEffect` hook to listen for the `connect` event.
2. When the `connect` event is triggered, update the `socketId` state with the socket’s ID.

    ```typescript
      useEffect(() => {
        socket.on("connect", () => setSocketId(socket.id));

        return () => {
          socket.off("connect", () => setSocketId(socket.id));
        };
      }, [socket]);
    ```

**Explanation:**

- `useEffect`: This hook is used to run side effects in your component, such as setting up event listeners.
- `socket.on("connect")`: Listens for the `connect` event, which is emitted by the server when the socket connection is established. When this event occurs, the `socketId` state is updated with the current socket ID.
- `socket.off("connect")`: Cleans up the event listener when the component unmounts, preventing memory leaks.

### Step 5.5: Display the `socketId` in the UI

**Instructions:**

1. Add a `return` statement to the `App` function that displays the `socketId` in the UI.

    ```typescript
      return <div>{socketId}</div>;
    }
    ```

**Explanation:**

- The `socketId` is rendered inside a `<div>` element, allowing you to see the connected socket’s ID in the UI.

### Step 5.6: Export the `App` Component

**Instructions:**

1. Ensure that `App` is exported as the default export at the end of the file.

    ```typescript
    export default App;
    ```

**Final Code in `App.tsx`:**

```typescript
import { useEffect, useState } from 'react';
import { useSockets } from './context/socket.context';

function App() {
  const { socket } = useSockets();
  const [socketId, setSocketId] = useState<string | undefined>("");

  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));

    return () => {
      socket.off("connect", () => setSocketId(socket.id));
    };
  }, [socket]);

  return <div>{socketId}</div>;
}

export default App;

