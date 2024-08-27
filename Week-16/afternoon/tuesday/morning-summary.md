# Morning Recap

This morning you started working on setting up a basic full-stack chat application using React on the frontend and Node.js with WebSocket on the backend. Here is a recap of the steps that were covered this morning.

## Setting up the Environment

### 1. Folder Structure
- **Step**: Create a project folder named `chat-app`. Inside `chat-app`, create two subfolders: `client` (for React frontend) and `server` (for Node.js backend).
- **Explanation**: Separating the client and server code into different folders is a common practice in full-stack development. This structure helps maintain a clear separation of concerns between the frontend and backend, making the project easier to manage and scale.

### 2. Initialize React and Node.js
- **Client (React)**: Navigate into the `client` folder and run the following command to set up a React project:
    ```bash
    npx create-react-app ./ --template typescript
    ```
  - **Explanation**: 
    - `./` indicates that the React app should be created in the current directory (which should be the `client` folder). This helps in organizing the frontend part of the application separately from the backend.
    - `--template typescript` sets up the project with TypeScript configuration, which helps in catching errors early and provides better tooling support.
  - This initializes a React project with TypeScript in the `client` folder.

- **Server (Node.js)**: Navigate into the `server` folder and run:
    ```bash
    npm init -y
    ```
  - **Explanation**: 
    - `npm init -y` quickly creates a `package.json` file with default settings. This is a common practice for initializing a Node.js project, as the `package.json` file is essential for managing dependencies and scripts.
  - This initializes a Node.js project in the `server` folder.

### 3. Setup TypeScript
- **Step**: Install TypeScript and Node type definitions in the `server` folder:
    ```bash
    npm install typescript @types/node --save-dev
    ```
  - **Explanation**: 
    - `typescript` allows you to write code in TypeScript, which provides type safety by catching errors at compile time.
    - `@types/node` provides type definitions for Node.js, ensuring that you have proper type checking for Node.js-specific APIs.
    - Installing these as `devDependencies` (with `--save-dev`) is a best practice because they are only needed during development, not in production.

- **Step**: Create a TypeScript configuration file:
    ```bash
    npx tsc --init
    ```
  - **Explanation**: 
    - `npx tsc --init` generates a `tsconfig.json` file, which is crucial for configuring TypeScript's behavior in your project. This file ensures that TypeScript is set up correctly according to your project's needs.

### 4. Install Nodemon
- **Step**: Install Nodemon globally to automatically restart the server on file changes:
    ```bash
    npm install -g nodemon
    ```
  - **Explanation**: 
    - `nodemon` watches for changes in your files and automatically restarts the server, making it easier to test changes quickly. This is a common practice in development to speed up the workflow.

- **Step**: Add a script in the `server/package.json` to run the server using Nodemon:
    ```json
    "scripts": {
      "dev": "nodemon src/index.ts"
    }
    ```
  - **Explanation**: 
    - Adding a `dev` script allows you to start the server with `npm run dev`, which is a best practice for maintaining consistency in how the server is started across different environments and developers.
- **Step**: in `server`run the following command:
  `npm install @types/config @types/express ts-node @types/pino --save-dev`

### 5. Install Dependencies
- **Step**: In the `server` folder, install the following dependencies:
    ```bash
    npm install express config socket.io pino dayjs
    ```
  - **Explanation**: 
    - `express` is used for handling HTTP requests, which is fundamental for serving files and APIs.
    - `pino` and `pino-pretty` are used for logging. Logging is a best practice as it helps you monitor and debug your application.
    - `dayjs` is used for date formatting, making it easier to work with dates and times in your logs.
    - `socket.io` is used for managing WebSocket connections

- **Step**: In the `client` folder, install the following dependency:
    ```bash
    npm install socket.io-client
    ```




## Setting up the Backend

### 1. Create and Configure Express App
- **Step**: Import the necessary libraries:
    ```typescript
    import express from 'express';
    import { createServer } from 'http';
    import { Server as SocketIOServer } from 'socket.io';
    import config from 'config';
    ```
  - **Explanation**: 
    - `express`: A minimal web framework for Node.js that helps manage routes, serve static files, and handle HTTP requests. This is a common practice for setting up a web server.
    - `createServer`: This is used to create an HTTP server that can handle both regular HTTP requests and WebSocket connections, which is a best practice for integrating WebSocket functionality into a web application.
    - `Server as SocketIOServer`: This sets up the WebSocket server using the Socket.IO library, which simplifies real-time event handling.
    - `config`: A library used to handle configuration settings, allowing you to manage different environments (development, production, etc.) more easily.

### 2. Set up an Express app and create an HTTP server
- **Step**: Initialize the Express app and create an HTTP server:
    ```typescript
    const app = express();
    const server = createServer(app);
    ```
  - **Explanation**: 
    - Creating an HTTP server that uses the Express app is a common practice because it allows the server to handle both HTTP requests and WebSocket connections seamlessly. Handling both is crucial because it enables the server to serve static files (HTML, CSS, JavaScript) while simultaneously managing real-time WebSocket connections. This unified approach simplifies the architecture, making it easier to manage both HTTP and WebSocket interactions within a single application.

### 3. Use Socket.IO for WebSocket Management
- **Step**: Set up Socket.IO to manage WebSocket connections:
    ```typescript
    const io = new SocketIOServer(server, {
      cors: {
        origin: config.get('corsOrigin'),
        methods: ["GET", "POST"]
      }
    });
    ```
  - **Explanation**: 
    - `corsOrigin`: Refers to the configuration for Cross-Origin Resource Sharing, ensuring that only specified domains can communicate with your server.
    - Socket.IO simplifies the process of setting up WebSocket connections by providing an easy-to-use API for managing real-time events. It also includes built-in fallbacks (like long polling) for environments where WebSocket support may be limited. Setting up CORS is a best practice for security, ensuring that only trusted domains can interact with your server.

### 4. Setup a Basic Route
- **Step**: Add a basic route to check if the API is running:
    ```typescript
    app.get('/', (req, res) => {
      res.send('API is running...');
    });
    ```
  - **Explanation**: A basic route is a simple HTTP endpoint that allows you to verify that your server is up and running. This is a common practice because it provides a quick way to check if your server is working correctly before adding more complex routes and functionality.

### 5. Setup Logging with Pino
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
  - **Explanation**: 
    - Logging is crucial for monitoring your application’s behavior and diagnosing issues. Pino is a fast and low-overhead logging library that’s suitable for both development and production environments. By using `pino-pretty`, you get readable logs during development, and by integrating `dayjs`, you can include timestamps in your logs. This setup is a best practice because it balances performance with usability, making your logs both efficient and easy to read.

### 6. Handling WebSocket Connections
- **Step**: Set up a socket event for user connections in `app.ts`:
    ```typescript
    io.on('connection', (socket) => {
      log.info(`New connection: ${socket.id}`);

      socket.on('disconnect', () => {
        log.info(`Socket disconnected: ${socket.id}`);
      });
    });
    ```
  - **Explanation**: Managing WebSocket connections is crucial for real-time applications. This code sets up listeners for when a client connects or disconnects. By logging these events, you can track user activity and identify potential issues (like unexpected disconnections). This is a best practice for handling user sessions in a chat application, ensuring that your application can manage multiple users in real-time effectively.







## Setting up the Frontend

### 1. Clean up the React Boilerplate
- **Step**: Remove unnecessary files and code generated by the `create-react-app` command. Ensure only essential files (like `App.tsx`, `index.tsx`, etc.) remain.
- **Explanation**: Cleaning up the React boilerplate code is a common practice to keep the project lean and focused. This step eliminates unnecessary clutter, making it easier to navigate the project and reducing the chances of unused code introducing bugs or confusion.

### 2. Install Axios
- **Step**: Install Axios for making HTTP requests:
    ```bash
    npm install axios
    ```
- **Explanation**: 
    - `axios`: A promise-based HTTP client for the browser and Node.js. It's simpler to use than the built-in `fetch` API and provides powerful features like request and response interceptors. This is a best practice for handling HTTP requests in a React application.
