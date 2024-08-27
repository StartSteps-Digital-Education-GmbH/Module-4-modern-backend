## Summary of Morning Steps

### Setting up the Environment

1. **Folder Structure:**
   - **Step**: Create a project folder named `chat-app`. Inside `chat-app`, create two subfolders: `client` (for React frontend) and `server` (for Node.js backend).
   - **Explanation**: Separating the client and server code into different folders is a **common practice** in full-stack development. This structure helps maintain a clear separation of concerns between the frontend and backend, making the project easier to manage and scale.
   - **Page Reference**: [Slide 6]

2. **Initialize React and Node.js:**
   - **Client (React)**: Navigate into the `client` folder and run the following command to set up a React project:
     ```bash
     npx create-react-app ./ --template typescript
     ```
     This initializes a React project with TypeScript in the `client` folder.
   - **Server (Node.js)**: Navigate into the `server` folder and run:
     ```bash
     npm init -y
     ```
     This initializes a Node.js project in the `server` folder.
   - **Explanation**: Using React for the frontend and Node.js for the backend is a **best practice** because it leverages the strengths of each technology—React for building interactive UIs and Node.js for handling backend logic and WebSocket connections.
   - **Page Reference**: [Slide 7]

3. **Setup TypeScript:**
   - **Step**: Install TypeScript and node type definitions in the `server` folder:
     ```bash
     npm install typescript @types/node --save-dev
     ```
   - **Step**: Create a TypeScript configuration file:
     ```bash
     npx tsc --init
     ```
   - **Explanation**: Setting up TypeScript is a **best practice** for ensuring type safety and catching potential errors early in the development process. The `tsconfig.json` file configures TypeScript's behavior, which is critical for maintaining a consistent development environment.
   - **Page Reference**: [Slide 8]

4. **Install Nodemon:**
   - **Step**: Install Nodemon globally to automatically restart the server on file changes:
     ```bash
     npm install -g nodemon
     ```
   - **Step**: Add a script in the `server/package.json` to run the server using Nodemon:
     ```json
     "scripts": {
       "dev": "nodemon src/index.ts"
     }
     ```
   - **Explanation**: Using Nodemon is a **common practice** that improves the development workflow by automatically restarting the server whenever changes are detected. This eliminates the need to manually stop and restart the server, speeding up the development process.
   - **Page Reference**: [Slide 9]

5. **Install Dependencies:**
   - **Step**: In the `server` folder, install the following dependencies:
     ```bash
     npm install express pino dayjs pino-pretty socket.io-client --save
     ```
     These libraries will be used for logging, date formatting, and managing WebSocket connections.
   - **Explanation**: Installing essential libraries like Express and Socket.IO is a **best practice** because it sets up the core functionality needed for the server. Each library serves a specific purpose—Express for HTTP requests, Pino for logging, and Socket.IO for WebSocket connections.
   - **Page Reference**: [Slide 10]

### Setting up the Backend

1. **Create and Configure Express App:**
   - **Step**: Import the necessary libraries:
     ```typescript
     import express from 'express';
     import { createServer } from 'http';
     import { Server as SocketIOServer } from 'socket.io';
     import config from 'config';
     ```
   - **Explanation**: This step is crucial for setting up the server's foundation. Express handles routing and static files, while Socket.IO manages WebSocket connections. Using the `config` library to manage environment-specific configurations is a **best practice** for scalable applications.
     - `express`: A minimal web framework for Node.js that helps manage routes, serve static files, and handle HTTP requests.
     - `createServer`: This is used to create an HTTP server that can handle both regular HTTP requests and WebSocket connections.
     - `Server as SocketIOServer`: This sets up the WebSocket server using the Socket.IO library.
     - `config`: A library used to handle configuration settings, allowing you to manage different environments (development, production, etc.) more easily.
   - **Page Reference**: [Slide 12]

2. **Set up an Express app and create an HTTP server:**
   - **Step**: Initialize the Express app and create an HTTP server:
     ```typescript
     const app = express();
     const server = createServer(app);
     ```
   - **Explanation**: Creating an HTTP server that uses the Express app is a **common practice** because it allows the server to handle both HTTP requests and WebSocket connections seamlessly. Handling both is crucial because it enables the server to serve static files (HTML, CSS, JavaScript) while simultaneously managing real-time WebSocket connections. This unified approach simplifies the architecture, making it easier to manage both HTTP and WebSocket interactions within a single application.
   - **Page Reference**: [Slide 12]

3. **Use Socket.IO for WebSocket Management:**
   - **Step**: Set up Socket.IO to manage WebSocket connections:
     ```typescript
     const io = new SocketIOServer(server, {
       cors: {
         origin: config.get('corsOrigin'),
         methods: ["GET", "POST"]
       }
     });
     ```
   - **Explanation**: Socket.IO simplifies the process of setting up WebSocket connections by providing an easy-to-use API for managing real-time events. It also includes built-in fallbacks (like long polling) for environments where WebSocket support may be limited. Setting up CORS (Cross-Origin Resource Sharing) is important for security reasons—it ensures that only trusted domains can communicate with your server. This setup is a **best practice** because it helps prevent security vulnerabilities and ensures a consistent user experience across different environments.
   - **Page Reference**: [Slide 13]

4. **Setup a Basic Route:**
   - **Step**: Add a basic route to check if the API is running:
     ```typescript
     app.get('/', (req, res) => {
       res.send('API is running...');
     });
     ```
   - **Explanation**: A basic route is a simple HTTP endpoint that allows you to verify that your server is up and running. In this case, it responds with a simple message when the root URL (`/`) is accessed. This is a **common practice** because it provides a quick way to check if your server is working correctly before you add more complex routes and functionality.
   - **Page Reference**: [Slide 13]

5. **Setup Logging with Pino:**
   - **Step**: Create a `logger.ts` file inside a `utils` folder and set up Pino for logging:
     ```typescript
     import pino from 'pino';
     import dayjs from 'dayjs';

     const log = pino({
       transport: {
         target: 'pino-pretty'
       },
       base: {
         pid: false
       },
       timestamp: () => `,"time":"${dayjs().format()}"`,
     });

     export default log;
     ```
   - **Explanation**: Logging is crucial for monitoring your application’s behavior and diagnosing issues. Pino is a fast and low-overhead logging library that’s suitable for both development and production environments. By using `pino-pretty`, you get readable logs during development, and by integrating `dayjs`, you can include timestamps in your logs. This setup is a **best practice** because it balances performance with usability, making your logs both efficient and easy to read.
     - `pino`: A fast logging library.
     - `dayjs`: A library for parsing, validating, manipulating, and displaying dates and times.
     - `pino-pretty`: Adds formatting to Pino logs, making them easier to read during development.
   - **Page Reference**: [Slide 14]

6. **Handling WebSocket Connections:**
   - **Step**: Set up a socket event for user connections in `app.ts`:
     ```typescript
     io.on('connection', (socket) => {
       log.info(`New connection: ${socket.id}`);

       socket.on('disconnect', () => {
         log.info(`Socket disconnected: ${socket.id}`);
       });
     });
     ```
   - **Explanation**: Managing WebSocket connections is crucial for real-time applications. This code sets up listeners for when a client connects or disconnects. By logging these events, you can track user activity and identify potential issues (like unexpected disconnections). This is a **best practice** for handling user sessions in a chat application, ensuring that your application can manage multiple users in real-time effectively.
   - **Page Reference**: [Slide 15]

### Setting up the Frontend

1. **Clean up the React Boilerplate:**
   - **Step**: Remove unnecessary files and code generated by the `create-react-app` command. Ensure only essential files (like `App.tsx`, `index.tsx`, etc.) remain.
   - **Explanation**: Cleaning up boilerplate code is a **common practice** that helps maintain a clean project structure, making the codebase easier to navigate and manage.
   - **Page Reference**: [Slide 17]

2. **Install Axios:**
   - **Step**: Install Axios for making HTTP requests:
     ```bash
     npm install axios
     ```
   - **Explanation**: Axios is a promise-based HTTP client for the browser and Node.js. It's simpler to use than the built-in `fetch` API and provides powerful features like request and response interceptors. This is a **best practice** for handling HTTP requests in a React application.
   - **Page Reference**: [Slide 18]

3. **Setting up a WebSocket Provider in React:**
   - **Step**: Set up a context provider in React to manage the WebSocket connection:
     ```typescript
     import React, { createContext, useContext, useEffect, useState } from 'react';
     import io from 'socket.io-client';

     const SocketContext = createContext();

     export const useSocket = () => useContext(SocketContext);

     export const SocketProvider = ({ children }) => {
       const [socket, setSocket] = useState(null);

       useEffect(() => {
         const newSocket = io('http://localhost:4000', { transports: ['websocket'] });
         setSocket(newSocket);

         return () => newSocket.close();
       }, []);

       return (
         <SocketContext.Provider value={socket}>
           {children}
         </SocketContext.Provider>
       );
     };
     ```
   - **Explanation**: Using a context provider to manage the WebSocket connection in a React app is a **best practice**. It allows the WebSocket connection to be easily accessed by any component within the application, maintaining a clean and modular codebase. This setup also simplifies the management of WebSocket connections, ensuring they are properly established when needed and closed when no longer required.
   - **Page Reference**: [Slides 20-21]

---
