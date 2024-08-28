# Chapter: Building Frontend

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
    ```typescript
    // socket.context.tsx
    export const socket = io(SOCKET_URL);
    export const SocketContext = createContext({ socket, username: "", setUsername: () => {} });
    
    function SocketsProvider({ children }: { children: React.ReactNode }) {
      const [username, setUsername] = useState<string | undefined>("");
    
      return (
        <SocketContext.Provider value={{ socket, username, setUsername }}>
          {children}
        </SocketContext.Provider>
      );
    }
    
    export const useSockets = () => useContext(SocketContext);
    export default SocketsProvider;
    ```
