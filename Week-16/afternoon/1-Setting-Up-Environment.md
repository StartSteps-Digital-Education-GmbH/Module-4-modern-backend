# Chat Application

This morning you started working on setting up a basic full-stack chat application using React on the frontend and Node.js with WebSocket on the backend. Here is a recap of the steps that were covered this morning.

**Tuesday**:
- Setting up the Environment
- Setting up the Backend

**Wednesday**
- Socket Context
- Frontend

**Thursday**
-

**Friday**
-

# Setting up the Environment

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
    "dev": "nodemon --config nodemon.json src/app.ts"
    },
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

### 6. Running both Client and Server
- **Client**: Navigate to `client` directory and run;
  ```bash
  npm start
  ```
- **Server**:
  - Create a file in `/server/src/` called `app.ts`
  - write: `console.log('hello')
  - Navigate to `server` directory and run:
      ```bash
      npm run dev
      ```
      - The server should now be running and you should see 'hello' logged in the terminal.
