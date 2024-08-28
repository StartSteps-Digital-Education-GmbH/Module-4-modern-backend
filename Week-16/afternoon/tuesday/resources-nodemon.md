### Info Sheet on Nodemon

#### What is Nodemon?

Nodemon is a tool that helps automatically restart a Node.js application when file changes in the directory are detected. It's widely used during development to improve the workflow by eliminating the need to manually stop and restart the server after every code change.

#### Why Use Nodemon?

- **Efficiency**: Nodemon speeds up the development process by automatically restarting your application when it detects changes in the files. This allows you to focus on writing code rather than managing server restarts.
- **Convenience**: It reduces the repetitive task of stopping and starting the Node.js server, which can be especially tedious when making frequent changes during development.
- **Improved Workflow**: By automatically restarting the server, Nodemon helps you see the effects of your code changes in real-time, improving your development workflow.

#### Basic Usage

1. **Installation**:
   - Nodemon can be installed globally on your machine, which allows it to be used across all Node.js projects. 
   ```bash
   npm install --save-dev nodemon
   ```
2. **Configuring Nodemon**:
     - Add a script in the server/package.json to run the server using Nodemon.
     - This is typically done by adding a dev script under the "scripts" section:
       ```typescript
       "scripts": {
          "dev": "nodemon src/index.ts"
        }
       ```
     - Explanation:
       - `"dev"`: This is the name of the script. It can be run using npm run dev.
       - `"nodemon src/index.ts"`: This command tells Nodemon to start the server using the index.ts file located in the src directory. Nodemon will watch for any changes in this file or other files in the directory and automatically restart the server.
3. **Running the Development Server**: To start the server with Nodemon, use the following command in your terminal:
   ```bash
   npm run dev
   ```
   - Nodemon will start your application and watch for changes. Whenever you make a change to your TypeScript files, Nodemon will automatically restart the server, ensuring that your application is always running the latest version of your code.

   
