
# Week 15: Creating a Simple Web Server

These exercises will guide you through creating a simple web server using Node.js and TypeScript. The exercises are interconnected, allowing you to incrementally build a project while learning key concepts such as Node.js setup, TypeScript initialization, environment variable management, and HTTP server creation.

The exercises for the rest of the week, will build on top of today's exercises! :)


## Best Practices - Explanation

In traditional Node.js development, modules are loaded using the `require` function, and the server is created using the `http.createServer()` method. However, when working with TypeScript, the `import` syntax is used instead of `require`. This is part of modern JavaScript (ES6+) and provides better module management and type safety.

Here's how the concepts from the slides map to TypeScript - **This is not an exercise yet, just an explanation**:

1. **Import Required Modules:**
   - Instead of using `require`, you use `import`:
     ```typescript
     import http from 'http';
     ```

2. **Create Server:**
   - The process of creating a server and binding it to a port remains the same, but in TypeScript, it looks like this:
     ```typescript
     http.createServer((req, res) => {
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end('Server is running!');
     }).listen(port, () => console.log(`Server is running on port ${port}`));
     ```

3. **Read Request and Return Response:**
   - The concept of reading a request and returning a response is handled in a callback function passed to `createServer`.

Understanding these differences will help you adapt the lessons from traditional Node.js to TypeScript, which is a more modern and type-safe approach.

---

## Exercise 1: Basic Project Setup with TypeScript and Environment Variables

### Objective:
Set up a simple Node.js project with TypeScript and environment variables.

### Instructions:
1. Create a project folder and navigate to it:
   ```bash
   mkdir simple-node-ts
   cd simple-node-ts
   ```

2. Initialize the project:
   ```bash
   npm init -y
   ```
   The -y flag tells the command to automatically say “yes” to the defaults.

3. Install TypeScript and necessary types:
   ```bash
   npm install --save-dev typescript @types/node dotenv
   ```

4. Initialize TypeScript configuration:
   ```bash
   npx tsc --init
   ```

5. In the `tsconfig.json` file, adjust the following:
   - Set `"outDir"` to `./dist`.
   - Set `"rootDir"` to `./src`.
   - Enable `"strict": true` for better type safety.

6. Create the necessary directories and files:
   ```plaintext
   src/
   ├── index.ts
   └── config.ts
   ```

7. Set up environment variables in a `.env` file:
   ```plaintext
   PORT=3000
   ```

8. In `config.ts`, load the environment variables:
    ```typescript
    import dotenv from 'dotenv';

    dotenv.config();

    export const port = process.env.PORT || 4000;
    ```

    **Explanation:**  
    - `import dotenv from 'dotenv';`: This line imports the `dotenv` module, which allows your application to read variables from a `.env` file and load them into `process.env`.
    - `dotenv.config();`: This line configures `dotenv` to start loading the environment variables.
    - `export const port = process.env.PORT || 4000;`: This line exports a constant named `port` that will be used by your server to determine on which port it should listen. The value is taken from the environment variable `PORT` (as set in your `.env` file). If `PORT` is not defined, it defaults to `4000`.

9. In `index.ts`, start a simple server:
    ```typescript
    import http from 'http';
    import { port } from './config';

    http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running!');
    }).listen(port, () => console.log(`Server is running on port ${port}`));
    ```

10. **Now, it's time to run your server and see it in action!**

   **Explanation:**
   - **What Happens When You Run the Server:** Running the server means that Node.js will start executing your `index.ts` file. The `http.createServer()` function will create an HTTP server that listens for incoming requests on the specified port. Once the server is running, it will keep running until you stop it manually. You can test the server by opening a web browser and navigating to `http://localhost:<PORT>`, where `<PORT>` is the port number defined in your `.env` file.

   - **Compiling TypeScript to JavaScript:** TypeScript is a superset of JavaScript that includes type annotations and other features that help developers write safer and more maintainable code. However, browsers and Node.js can't execute TypeScript directly; they only understand JavaScript. This is why we need to compile TypeScript into JavaScript. When you run the TypeScript compiler (`npx tsc`), it converts your `.ts` files into `.js` files that can be executed by Node.js.

   - **How to Compile and Run the Server:**
     1. First, make sure you've compiled your TypeScript code to JavaScript by running:
        ```bash
        npx tsc
        ```
        This will generate a `dist/` folder containing the compiled `.js` files.
     
     2. To start the server, run the following command:
        ```bash
        node dist/index.js
        ```
        This command tells Node.js to execute the compiled `index.js` file.

        You should see a log message in your terminal that says something like:
       ```
       Server is running on port 3000
       ```
       This message confirms that your server has started successfully.

     3. **Optional:** If you want to simplify running your server in the future, you can add a `start` script to your `package.json` file:
        - Open your `package.json` file and add the following under `"scripts"`:
          ```json
          "scripts": {
            "start": "node dist/index.js"
          }
          ```
        - Now, you can start your server with the command:
          ```bash
          npm run start
          ```

        This step is optional, but it can make running your server easier in future projects.

   - **Test the Server:**  
       Open your web browser and navigate to `http://localhost:3000` (or the port number you set). You should see the message "Server is running!" displayed in your browser.


Done? Perfect! You should now have a basic TypeScript project set up with a simple server running on the specified port. :sparkles:

---

## Exercise 2: Modularizing the Code with a Helper Module

### Objective:
Create a separate helper module to manage reusable functions.

### Instructions:
1. In the `src/` folder, create a new file named `helpers.ts`:
    ```plaintext
    src/
    ├── index.ts
    ├── config.ts
    └── helpers.ts
    ```

2. In `helpers.ts`, define a function that returns a greeting message. This function should be exported and should return a string, like "hello from the helper module!". 

   **Can't figure it out?** Reveal the solution below, but please try by yourself first!

   <details>
     <summary>Click to reveal the solution</summary>

     ```typescript
    export const getHelloMessage = (): string => {
      return 'Hello from the helper module!';
    };
     ```

   </details>


3. In `index.ts`, import and use the function you created in `helpers.ts`. For this, you should use `res.writeHead()` and `res.end()`, see slide 27 for an example.


**Outcome**: The project is now modularized with a separate helper module, making the code cleaner and more maintainable.

---

## Exercise 3: Adding Environment-Dependent Messages

### Objective:
Extend the project to load different messages based on the environment variables.

### Instructions:
1. Update the `.env` file to include a custom message:
   ```plaintext
   PORT=3000
   CUSTOM_MESSAGE="Welcome to my Node.js app!"
   ```

2. In `config.ts`, load the custom message by adding an extra line at the end of the file. This is usually done by accessing the `process.env` object, which contains all environment variables.

   **Can't figure it out?** Reveal the solution below, but please try by yourself first!

   <details>
     <summary>Click to reveal the solution</summary>

     ```typescript
    export const customMessage = process.env.CUSTOM_MESSAGE || 'Default message';
     ```

     **Explanation:**  
     - This line exports a constant named `customMessage` which gets its value from the environment variable `CUSTOM_MESSAGE`. If `CUSTOM_MESSAGE` is not defined, it defaults to 'Default message'. This allows you to customize the message shown by your server based on the environment it's running in.

   </details>

3. Update `helpers.ts` to use the environment variable.

   **Tips:** 
    - You will need to import the `customMessage` variable from `config.ts` into `helpers.ts`.
    - Use the `customMessage` to return a customized greeting in the `getHelloMessage` function.
    - Think about how to use this variable to make your server's response dynamic based on the environment.

    **Can't figure it out?** Reveal the solution below, but please try by yourself first!

   <details>
     <summary>Click to reveal the solution</summary>

     ```typescript
     import { customMessage } from './config';

     export const getHelloMessage = (): string => {
      return customMessage;
     };

     ```
     
   </details>


4. Run the server again and check the output in your terminal.

   **Explanation:**  
  - Since the server loads environment variables when it starts, you need to restart the server to see the updated customMessage in action. After updating helpers.ts, recompile your TypeScript files and restart the server:
      ```bash
      npx tsc
      node dist/index.js
         ```
   - Open your browser and navigate to http://localhost:3000 to see the custom message defined in your .env file displayed by the server.
   - 

**Outcome:** This exercise shows how you can use environment variables to control application behavior dynamically, a common practice in real-world development. :computer:


---

## Exercise 4: Clean Console Logging with a Custom Logger


### Objective:
Add a custom logger function to log server messages neatly.

### Instructions:
1. Create a new file `logger.ts` in the `src/` folder.

2. In `logger.ts`, define a simple logging function `logServerMessage`. This function should take a message as an argument, add a timestamp to it, and print it to the console.

   **Can't figure it out?** Reveal the solution below, but please try by yourself first!

   <details>
     <summary>Click to reveal the solution</summary>

     ```typescript
     export const logServerMessage = (message: string): void => {
       const timestamp = new Date().toISOString();
       console.log(`[${timestamp}] ${message}`);
     };
     ```

     **Explanation:**  
     - The function `logServerMessage` takes a message string as an argument, prepends a timestamp (in ISO format) to the message, and logs it to the console. This helps in keeping the server logs organized and easier to read.

   </details>

3. Update `index.ts` to use the logger.

   **Tips:**
   - Import the `logServerMessage` function from `logger.ts` into `index.ts`.
   - Replace the `console.log` statement in the `listen` callback with the `logServerMessage` function to log when the server starts.

   **Can't figure it out?** Reveal the solution below, but please try by yourself first!

   <details>
     <summary>Click to reveal the solution</summary>

     ```typescript
     import { logServerMessage } from './logger';

     http.createServer((req, res) => {
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end('Server is running!');
     }).listen(port, () => logServerMessage(`Server is running on port ${port}`));
     ```

     **Explanation:**  
     - This updates the server's logging mechanism to use the custom logger function, which will output a timestamped message whenever the server starts. This makes the logs more informative and consistent.
   </details>

4. **Run the server again to see the improved logging in your terminal.**

   ### Explanation:
   - Since you've modified the code to include a custom logger, you'll need to recompile the TypeScript files to JavaScript by running:
     ```bash
     npx tsc
     ```
   - After compiling, start the server again with:
     ```bash
     node dist/index.js
     ```
   - In your terminal, you should now see the log message with a timestamp indicating that the server is running, meaning you implemented the custom logger correctly

   **Note:**  
   - Running the server after making changes allows you to see the effects of your updates in real-time. In this case, you should see the new timestamped log messages in your terminal, confirming that the custom logger is working correctly.

