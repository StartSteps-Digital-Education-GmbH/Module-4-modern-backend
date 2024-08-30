# 4: Building Frontend

### **Step 1: Create the Containers Folder**

**Objective:** Organize the main UI components into separate, manageable files.

**Explanation:**
- When building a React application, it's essential to keep your code organized by grouping related components together.
- By creating a containers folder, we're adhering to a common practice in React development, which is to organize components by their functionality or purpose. This makes the project more maintainable and easier to navigate as it grows.

**Instructions:**

1. **Create a New Folder:**
   - In the `client/src` directory, create a new folder named `containers`.
   - **Explanation:** This folder will house the main UI components of our application, such as the Messages and Rooms containers. Organizing components into separate folders is a **common practice** in React development. It keeps your project organized and makes components easy to find and maintain.

2. **Create the Messages.tsx File:**
   - Inside the `containers` folder, create a file named `Messages.tsx`.
   - **Explanation:** This component will be responsible for displaying chat messages. Keeping it in a separate file adheres to the **single responsibility principle**, which is a **best practice** in software development.

   ```typescript
   // Messages.tsx
   export const MessagesContainer = () => {
     return <div>Messages</div>;
   };
    ```

   **Explanation**
   This code defines a simple functional component that returns a div containing the text "Messages". This is a placeholder for where we will later display chat messages.

3. **Create the Rooms.tsx File:**
- Inside the `containers` folder, create a file named `Rooms.tsx`.
- **Explanation:** This component will serve as the sidebar where users can see a list of available chat rooms. Like `Messages.tsx`, separating this logic into its own file is a **best practice** for maintainability and readability.

```typescript
// Rooms.tsx
export const RoomsContainer = () => {
  return <div>Rooms</div>;
};
```


4. **Create an Index File for Easier Imports:**
- Inside the `containers` folder, create an `index.tsx` file to export both `MessagesContainer` and `RoomsContainer`.
- **Why**: An index.tsx file allows you to import multiple components from a single location, which simplifies the import statements in other files. This is a common practice in React projects to keep the code clean and avoid long or repetitive import statements.

```typescript
// index.tsx
export { MessagesContainer } from "./Messages";
export { RoomsContainer } from "./Rooms";
```


### **Step 2: Render Containers in App.tsx**

**Objective:** Integrate the Messages and Rooms containers into the main application.

**Explanation**
- Now that we've created the `Messages` and `Rooms` components, it's time to integrate them into our application. We'll do this by rendering them in the App component.
- This follows the best practice of keeping the main application logic centralized in a single component (`App.tsx`) while breaking out specific UI sections into their own components.

**Instructions:**

1. **Import Containers into App.tsx:**
- In `App.tsx`, import the `MessagesContainer` and `RoomsContainer` components from the `containers` folder.

```typescript
import { MessagesContainer, RoomsContainer } from "./containers";
```
2. **Render the Containers:**
Update the `App` component to render both the `MessagesContainer` and `RoomsContainer`

```typescript
function App() {
  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  );
}

export default App;
```

### Step 3: Add Username Validation
Objective: Prevent users from accessing chat rooms and messages without entering a username.

**Explanation:**
- Before allowing users to interact with chat rooms and messages, we need to ensure they have provided a username. This adds a layer of user validation and personalization to the app.
- Best Practice: Validating user input (like ensuring a username is provided) is a best practice in web development, as it helps prevent errors and ensures a smoother user experience.

1. **Modify the Context to Store Username:**
  - Update the SocketContext to include a username state that will be passed down through the context.
- **Step 1: Adding State for Username**
  - A username state needs to be added using the useState hook.
  - A setUsername function needs to be added to update the username state.
  - **Why:**
    - The `username` state allows the app to store the user's username. This username will be passed down through the context to any component that needs it.
    - The `setUsername` function is necessary to change the username state based on user input.
   ```typescript
   const [username, setUsername] = useState<string | undefined>("");
   ```
   
- **Step 2: Modyfing the Context Creation**
  - The `createContext` function needs to be updated to include both the   `username` and `setUsername` values in addition to the existing `socket`.
  - **Why:** By including username and setUsername in the context, we're making these values available to any component that consumes the context. This is crucial for components that need to know the current username or allow the user to change it.

   ```typescript
   export const SocketContext = createContext({
  socket, 
  username: "", 
  setUsername: () => {}
   });
   ```
- **Step 3: Updating the `SocketsProvider`:**
  ```typescript
  <SocketContext.Provider value={{ socket, username, setUsername }}>
     {children}
   </SocketContext.Provider>
   ```
  - The SocketsProvider component is updated to pass the username and setUsername values through the context. Now, any child component within this provider can access and modify the username.
 
- **Step 4: Create an interface for context shape**
  - Create an interface defining the context shape after the imports:
     ```typescript
      // Define an interface to describe the context shape
      interface Context {
         socket: Socket;
         username?: string;
         setUsername: (value?: string) => void;
      }
     ```

- **Final Version:**
- 
  ```typescript
   import { createContext, useContext, useState } from 'react';
   import io, { Socket } from 'socket.io-client';
   import { SOCKET_URL } from '../config/default';
   
   // Define an interface to describe the context shape
   interface Context {
     socket: Socket;
     username?: string;
     setUsername: (value?: string) => void;
   }
   
   // Initialize a connection with the backend socket server
   export const socket = io(SOCKET_URL);
   
   // Create a context to store the socket instance and other values
   export const SocketContext = createContext<Context>({
     socket,
     setUsername: () => {} // Provide a default no-op function to match the expected type
   });
   
   // Provider component to wrap around the app and provide the socket instance to all child components
   function SocketsProvider({ children }: { children: React.ReactNode }) {
     const [username, setUsername] = useState<string | undefined>("");
   
     return (
       // Pass the socket, username, and setUsername through the context provider
       <SocketContext.Provider value={{ socket, username, setUsername }}>
         {children} {/* Render any child components passed to the provider */}
       </SocketContext.Provider>
     );
   }
   
   // Custom hook to allow easy access to the socket context in any component
   export const useSockets = () => useContext(SocketContext);
   export default SocketsProvider;
   ```

---

## Step 4: Create a Handler to Set the Username
Objective: Create a handler function in `App.tsx` that will *set* the username and *store it in `localStorage`*. We will use both `useState` and context.

### Why Use Both `useState` and Context?

#### 1. **`useState`: Local Component State Management**
- **Purpose**: The `useState` hook is used to manage state within a specific React component. In this case, `useState` is used to keep track of the username within the `App` component.
- **Why It's Necessary**:
  - **Immediate Feedback**: When a user enters their username, you want to immediately reflect this change in the UI. `useState` allows you to do this by instantly updating the state within the component, which triggers a re-render and reflects the change in the UI.
  - **Local Control**: `useState` is perfect for managing state that is local to a component, such as form inputs, toggle states, or any other piece of data that doesn't need to be shared across the entire application.

#### 2. **Context: Global State Management**
- **Purpose**: Context is used to provide and manage state across multiple components in a React application. It's ideal for sharing data that needs to be accessible by multiple components at different levels of the component tree.
- **Why It's Necessary**:
  - **Global Access**: The username needs to be accessed by various components (e.g., `RoomsContainer`, `MessagesContainer`). Using context allows you to store the username in a global state that can be accessed by any component wrapped within the `SocketsProvider`.
  - **Consistency Across Components**: Context ensures that all components using the context will have access to the same, up-to-date username. This is particularly important for maintaining consistent state across different parts of the app.

### How They Work Together

- **`useState`**: Manages the username locally within the `App` component. This allows for immediate updates to the UI when the username changes.
- **Context**: Shares the username (and the ability to update it) with other components in the app. When the username is updated in the `App` component using `setUsername`, the updated value is available to all other components that consume the context.

### Step-by-Step Breakdown

#### Step 1: Access Context Values
```typescript
const { socket, username, setUsername } = useSockets();
```
### Explanation: 
Here, you’re accessing the values provided by the `SocketContext`. These values include `socket` (the WebSocket connection), `username` (the current username stored in the context), and `setUsername` (a function to update the username in the context).

**Why Both `useState` and Context?**: 
`setUsername` is provided by the context but is controlled by the `useState` hook within the `SocketsProvider`. This setup allows any component using the context to update the username, but the actual state management is handled by `useState`.

### Step 2: Create a State for the Username Input

```typescript
const [localUsername, setLocalUsername] = useState<string>(""); // Create state for username input
```


**Explanation**: 
`useState` is used here to manage the local state of the username input field. This allows you to directly control the value of the input and update it whenever the user types something.

**Why?**: 
Using `useState` ensures that the input value is part of the component's state, which triggers re-renders and provides immediate feedback to the user as they type.

### Step 3: Define the Handler Function

```typescript
const handleSetUsername = () => {
  if (!localUsername.trim()) return;

  setUsername(localUsername);
  localStorage.setItem("username", localUsername);
};

```

**Explanation:**

-   **Extracting Username:** The `localUsername` variable holds the current value of the input field.
-   **Validation:** `if (!localUsername.trim()) return;` ensures the function exits if the username is empty or just whitespace.
-   **Updating State and Context:** `setUsername(localUsername);` updates both the local state within the `App` component and the global state in the context.
-   **Storing in `localStorage`:** `localStorage.setItem("username", localUsername);` saves the username to `localStorage`, providing persistence across page refreshes.

### Why Not Just One?

- **`useState` Alone**: If you used only `useState` without context, you’d limit the scope of the username to the `App` component. Other components wouldn’t be able to access or react to changes in the username unless you passed it down explicitly through props, which can become cumbersome in a larger application.
  
- **Context Alone**: If you used context without `useState`, you’d lose the ability to manage local component state efficiently. For example, you wouldn’t be able to provide immediate feedback in the UI when the username changes, as context changes might not trigger re-renders in the same way that `useState` does.

---

### Step 5: Conditional Rendering Based on Username
**Objective:** Render different UI elements depending on whether a username is present.

**Why?**
This approach ensures that the user is prompted to enter a username before they can interact with the rest of the application. It enhances user experience by guiding them through necessary steps in a clear and logical manner.

**Instructions:**

#### Check if Username is Present:

```typescript
if (!username) {
  return (
    <div>
      <input placeholder="username" ref={usernameRef} />
      <button onClick={handleSetUsername}>Log In</button>
    </div>
  );
}
```
**Explanation:**
- **Conditional Rendering:** `if (!username) { ... }` checks if the `username` state is empty. If it is, the application will render a form prompting the user to enter a username. Conditional rendering is a common practice in React to display different components based on application state.
- **Rendering the Login Form**: The input field and button allow the user to enter and submit their username. The `onClick` event on the button triggers the `handleSetUsername` function to update the username.

### Render the Main Application if Username Exists:

```typescript
return (
  <div>
    <RoomsContainer />
    <MessagesContainer />
  </div>
);
```

**Explanation:**
- If a username is present, the main components of the application (`RoomsContainer` and `MessagesContainer`) are rendered. This ensures that only authenticated or identified users can access the chat rooms and messages. This practice is a common practice in applications that require user identification.

### Final Code
```typescript
function App() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSetUsername = () => {
    const usernameValue = usernameRef.current?.value;
    if (!usernameValue) return;

    setUsername(usernameValue);
    localStorage.setItem("username", usernameValue);
  };

  if (!username) {
    return (
      <div>
        <input placeholder="username" ref={usernameRef} />
        <button onClick={handleSetUsername}>Log In</button>
      </div>
    );
  }

  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  );
}

export default App;
```
