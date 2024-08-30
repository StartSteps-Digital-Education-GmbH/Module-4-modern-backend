### WebSocket Chat Application Exercises - Part 4: 

These exercises build on the chat application you've been working on, adding more advanced features. 
You can keep working on what Ahmad showed you this week, experiment with/add new features and styling or take inspiration from the following exercises. 😄

* * * * *

## Possible Creative Enhancements

### Exercise 1: Personalized User Profiles

#### **Objective**

Enhance the chat application by allowing users to create and customize their profiles.

#### **Task**

Implement a user profile system where users can set an avatar, choose a display name, and select a theme color for their messages.

#### **Step-by-Step Instructions**

##### Step 1: Create the `UserProfile` Component

**Objective:** Create a user profile component that allows users to set their avatar, display name, and theme color.

**Why:** Adding user profiles enhances the personalization of the chat experience, making it more engaging.

**Instructions:**

1.  **Create the `UserProfile` Component File:**

    -   In the `src/components/` directory, create a new file named `UserProfile.tsx`.
    -   **Explanation:** This component will handle user profile settings such as avatar selection, display name, and theme color. By creating a separate component, you keep your code organized and modular.
2.  **Import Necessary Modules:**

    -   At the top of `UserProfile.tsx`, import the `useState` hook from React and the `useSockets` hook from your socket context.
    - **Example solution**:
      
        <details>
        <summary> click to reveal example solution </summary>
        
        ```typescript
        import React, { useState } from 'react';
        import { useSockets } from '../context/socket.context';
        ```
      
        </details>

    -   **Explanation:**
        -   `useState` is a React hook that allows you to add state to your functional components. You'll use it to manage the user's display name, avatar, and theme color.
        -   `useSockets` is a custom hook you've created earlier to access the socket connection and other global state variables like `username`.
3.  **Set Up State for Profile Settings:**

    -   Inside the `UserProfile` component, use `useState` to create state variables for `displayName`, `avatar`, and `themeColor`.
    -   **Instructions:**
        -   Initialize `displayName` with the `username` from the context or an empty string if no username exists.
        -   Set the initial `avatar` state to one of the emoji characters (e.g., `'🐱'`).
        -   Set the initial `themeColor` state to a default color value (e.g., `'#000000'`).
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary>
      ```typescript const [displayName, setDisplayName] = useState(username || '');
      const [avatar, setAvatar] = useState('🐱');
      const [themeColor, setThemeColor] = useState('#000000');
      ``` 
      </details>

    -   **Explanation:**
        -   `displayName`: Holds the name that the user wants to display in the chat.
        -   `avatar`: Represents the selected avatar, which is an emoji.
        -   `themeColor`: Stores the color chosen by the user for their message theme.
4.  **Create a Function to Handle Profile Saving:**

    -   Define a function named `handleSaveProfile` that will update the user's profile settings in the global state.
    -   **Instructions:**
        -   This function should update the `username` in the global state using the `setUsername` function from the context.
        -   It should also update the user's profile with the selected `avatar` and `themeColor` using the `setUserProfile` function from the context.
    - **Example solution**:
      <details>
      <summary> click to reveal example solution </summary>
      ```typescript const handleSaveProfile = () => {
        setUsername(displayName);
        setUserProfile({ avatar, themeColor });
      };
      ``` 
      </details>

    -   **Explanation:**
        -   `handleSaveProfile`: This function saves the profile settings by updating the global state with the new values. By saving the settings in the global state, you ensure that the profile information is accessible throughout the application.
5.  **Render the Profile Form:**

    -   In the return statement of `UserProfile`, render the input fields and buttons that allow the user to update their profile.
    -   **Instructions:**
        -   Add an input field for the user to type in their display name.
        -   Create a selection of buttons for the user to choose their avatar from the `avatars` array.
        -   Add a color picker input to allow the user to select a theme color.
        -   Include a save button that triggers the `handleSaveProfile` function when clicked.
    - **Example solution**:
      <details>
      <summary> click to reveal example solution </summary> 
      ```typescript
      return (
        <div className="user-profile">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
          <div className="avatar-selection">
            {avatars.map((a) => (
              <button key={a} onClick={() => setAvatar(a)} className={avatar === a ? 'selected' : ''}>
                {a}
              </button>
            ))}
          </div>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      ); 
      ```
      </details>

    -   **Explanation:**
        -   The form includes an input for the display name, a series of buttons for avatar selection, a color picker for theme color, and a save button. When the user interacts with these elements, the corresponding state is updated.

##### Step 2: Integrate `UserProfile` into `App.tsx`

**Objective:** Display the `UserProfile` component in the main app, ensuring that users set up their profiles before accessing chat rooms.

**Why:** This ensures that every user has a profile, making the chat experience more personalized and engaging.

**Instructions:**

1.  **Import `UserProfile` into `App.tsx`:**

    -   At the top of `App.tsx`, import the `UserProfile` component.
    - **Example solution**:
      <details>
      <summary> click to reveal example solution </summary>
      ```typescript
      import { UserProfile } from './components/UserProfile';
      ``` 
      </details>

    -   **Explanation:** You need to import the `UserProfile` component so that you can use it within the `App` component.
2.  **Conditionally Render `UserProfile`:**

    -   Inside the `App` function, check if the `username` is set. If not, render the `UserProfile` component. If the username is set, render the chat components.
    -   **Instructions:**
        -   Use an `if` statement to check if `username` is present.
        -   If `username` is not present, return the `UserProfile` component.
        -   If `username` is present, return the chat components (`RoomsContainer` and `MessagesContainer`).
    - **Example solution**:
      <details>
      <summary> click to reveal example solution </summary>
      ```typescript
      function App() {
        const { username } = useSockets();

        if (!username) {
          return <UserProfile />;
        }

        return (
          <div className="app-container">
            <UserProfile />
            <RoomsContainer />
            <MessagesContainer />
          </div>
        );
      }
      export default App;
      ```
      </details>

    -   **Explanation:** By rendering the `UserProfile` component when `username` is not set, you ensure that users must set up their profile before accessing the chat. This enhances the user experience by making the chat environment more personalized.

* * * * *

### Exercise 2: Emoji Reactions

#### **Objective**

Implement an emoji reaction system for messages.

#### **Task**

Allow users to react to messages with emojis and display these reactions below each message.

#### **Step-by-Step Instructions**

##### Step 1: Update the `MessagesContainer` Component

**Objective:** Extend the `MessagesContainer` to allow users to add emoji reactions to messages.

**Why:** Emoji reactions add an interactive element to the chat, making it more engaging and fun for users.

**Instructions:**

1.  **Import Necessary Modules:**

    -   At the top of `MessagesContainer.tsx`, import `useRef`, `useEffect`, and `useSockets`.
    - **Example solution**:
      <details>
      <summary> click to reveal example solution </summary>
      ```typescript
      import React, { useRef, useEffect } from 'react';
      import { useSockets } from '../context/socket.context'; 
      ``` 
      </details>

    -   **Explanation:**
        -   `useRef`: React hook that allows you to reference a DOM element directly. You'll use it to access the message input field.
        -   `useEffect`: React hook for performing side effects in your component, like setting up event listeners.
        -   `useSockets`: Custom hook that provides access to the global state, including socket connection and messages.
2.  **Define Emoji Options:**

    -   Inside the `MessagesContainer` component, define an array of emojis that users can choose from for reactions.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡']; 
      ```  
      </details>

    -   **Explanation:** This array contains the emojis that users can select to react to messages. You can customize this array to include any emojis that fit your chat application's theme.
3.  **Create a Function to Handle Reactions:**

    -   Define a function named `handleReaction` that takes a `messageId` and an `emoji` as arguments. This function will emit an event to the server to add the reaction to the specified message.
    -   **Instructions:**
        -   The function should call the `addReaction` method from the context and pass the `messageId` and `emoji`.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      const handleReaction = (messageId: string, emoji: string) => {
        addReaction(messageId, emoji);
      }; 
      ```  
      </details>

    -   **Explanation:** This function sends the reaction to the server, which will then broadcast the reaction to all clients, ensuring that the reaction is displayed in real-time.
4.  **Render Messages and Reactions:**

    -   In the return statement of `MessagesContainer`, render each message along with its reactions. Include buttons for adding reactions to each message.
    -   **Instructions:**
        -   Loop through the `messages` array and display each message.
        -   Below each message, render the available emojis as buttons.
        -   When an emoji button is clicked, call `handleReaction` with the message's ID and the selected emoji.
        -   Also, display the current reactions for each message by looping through the `message.reactions` object.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      return (
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>{message.content}</p>
              <div className="reactions">
                {emojis.map((emoji) => (
                  <button key={emoji} onClick={() => handleReaction(message.id, emoji)}>
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="reaction-count">
                {Object.entries(message.reactions).map(([emoji, count]) => (
                  <span key={emoji}>{emoji}: {count}</span>
                ))}
              </div>
            </div>
          ))}
          <textarea ref={messageRef} placeholder="Type a message..." />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      ); 
      ```  
      </details>

    -   **Explanation:**
        -   The component now displays a list of messages, with each message showing its content, available emoji reactions, and the current reaction counts. Users can click on emojis to react to a message, and these reactions will be reflected in the UI.

* * * * *

### Exercise 3: Advanced Room Management

#### **Objective**

Enhance the room system with additional features and improved UI.

#### **Task**

Implement room categories, room passwords, and a search function for rooms.

#### **Step-by-Step Instructions**

##### Step 1: Update the `RoomsContainer` Component

**Objective:** Add new features like room categories, passwords, and search functionality.

**Why:** These features improve the usability of the chat application by making it easier for users to find and join relevant rooms.

**Instructions:**

1.  **Define Room Categories:**

    -   Inside the `RoomsContainer` component, define an array of categories that users can select from when creating a room.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      const categories = ['General', 'Gaming', 'Music', 'Technology', 'Other']; 
      ```  
      </details>

    -   **Explanation:** Room categories help users organize and find rooms based on their interests.
2.  **Create State Variables:**

    -   Use `useState` to create state variables for the search term and the selected category.
    - **Example solution**:
    - <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState(''); 
      ``` 
      </details>

    -   **Explanation:** These state variables track the user's input for searching and filtering rooms.
3.  **Handle Room Creation with Category and Password:**

    -   Update the `handleCreateRoom` function to include the selected category and optional password when creating a room.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript const handleCreateRoom = () => {
        const name = roomNameRef.current?.value;
        const password = passwordRef.current?.value;
        if (name) {
          createRoom(name, selectedCategory, password);
          if (roomNameRef.current) roomNameRef.current.value = '';
          if (passwordRef.current) passwordRef.current.value = '';
        }
      }; 
      ```  
      </details>

    -   **Explanation:** This function now creates a room with a category and password, providing more flexibility for room management.
4.  **Filter and Display Rooms:**

    -   Filter the list of rooms based on the search term and selected category, and render the filtered list.
    - **Example solution**:
      <details> 
      <summary> click to reveal example solution </summary> 
      ```typescript 
      const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || room.category === selectedCategory)
        );

        return (
          <div className="rooms-container">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <div className="create-room">
              <input ref={roomNameRef} placeholder="Room name" />
              <input ref={passwordRef} type="password" placeholder="Room password (optional)" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <button onClick={handleCreateRoom}>Create Room</button>
            </div>
            <div className="room-list">
              {filteredRooms.map(room => (
                <div key={room.id} className="room-item">
                  <span>{room.name} ({room.category})</span>
                  <button onClick={() => joinRoom(room.id, prompt('Enter room password:') || '')}>
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      ```
      </details>

    -   **Explanation:** Users can now search for rooms by name and category, making it easier to find the room they want to join. They can also create rooms with specific categories and optional passwords for added security.
