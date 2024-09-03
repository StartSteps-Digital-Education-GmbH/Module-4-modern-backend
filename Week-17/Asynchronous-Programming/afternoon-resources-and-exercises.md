### **Async/Await, Promise, and Try/Catch Exercises**

### **Resources**

If you to dive deeper into the concepts, check out these resources:

-   [Intro into Promise](https://www.geeksforgeeks.org/how-to-use-async-await-with-a-promise-in-typescript/)
-   [Going deeper into Promise and async/await:](https://www.atatus.com/blog/introduction-to-async-await-in-typescript/)
-   [Example](https://medium.com/grid-solutions/asynchronous-programming-in-typescript-has-been-greatly-simplified-with-the-introduction-of-d104775ed3ab)
-   [Another Example](https://www.typescriptlang.org/play/#example/async-await)

* * * * *

#### **Exercise 1: Basic Promise Creation and Consumption (15 minutes)**

**Objective:** Get comfortable with creating and consuming Promises using `then`.

**Task:**

1.  Create a simple Promise that resolves to the string "Hello, World!" after 2 seconds.
2.  Consume the Promise using `then` and log the result to the console.

**Code Example:**

typescript

Copy code

`const greetingPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, World!");
    }, 2000);
});

greetingPromise.then((message) => {
    console.log(message); // After 2 seconds, "Hello, World!" should be logged
});`

* * * * *

#### **Exercise 2: Convert Promise to Async/Await (15 minutes)**

**Objective:** Learn to work with `async/await` syntax by converting a Promise-based function.

**Task:**

1.  Take the code from Exercise 1 and modify it to use `async/await` instead of `.then()`.

**Code Example:**

typescript

Copy code

`const greetingPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, World!");
    }, 2000);
});

async function displayGreeting() {
    const message = await greetingPromise;
    console.log(message); // After 2 seconds, "Hello, World!" should be logged
}

displayGreeting();`

* * * * *

#### **Exercise 1 (Try/Catch): Basic Try/Catch with Async/Await (15 minutes)**

**Objective:** Understand error handling in asynchronous functions using `try/catch`.

**Task:**

1.  Create an async function `fetchData` that returns a Promise.
2.  Inside `fetchData`, simulate an error by rejecting the Promise with an error message.
3.  Use `try/catch` in another async function to handle the rejection and log the error message.

**Code Example:**

typescript

Copy code

`async function fetchData(): Promise<string> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Failed to fetch data"));
        }, 1000);
    });
}

async function handleData() {
    try {
        const data = await fetchData();
        console.log(data); // This will not run because an error is thrown
    } catch (error) {
        console.log(error.message); // "Failed to fetch data" is logged
    }
}

handleData();`

* * * * *

#### **Exercise 4: Finally Block Usage (15 minutes)**

**Objective:** Learn how to use the `finally` block to ensure cleanup actions run regardless of the outcome.

**Task:**

1.  Create an async function `fetchConfig` that returns a Promise and resolves with "Config loaded" after 1 second.
2.  Use a `try/catch/finally` block to handle the Promise:
    -   Log the result of `fetchConfig`.
    -   Log any potential error.
    -   In the `finally` block, log a message like "Cleanup complete".

**Code Example:**

typescript

Copy code

`async function fetchConfig(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Config loaded");
        }, 1000);
    });
}

async function handleConfig() {
    try {
        const config = await fetchConfig();
        console.log(config); // "Config loaded"
    } catch (error) {
        console.log("Error loading config:", error.message);
    } finally {
        console.log("Cleanup complete"); // Always runs
    }
}

handleConfig();`

* * * * *

### **Second Hour: Apply Concepts to More Complex Scenarios**

#### **Exercise 5: Parallel Execution with Async/Await (20 minutes)**

**Objective:** Practice running multiple asynchronous operations in parallel using `Promise.all`.

**Task:**

1.  Create two async functions that return Promises resolving after different intervals:
    -   `taskOne`: Resolves with "Task One Complete" after 3 seconds.
    -   `taskTwo`: Resolves with "Task Two Complete" after 2 seconds.
2.  Execute both functions in parallel using `Promise.all` and log the results once both tasks are complete.

**Code Example:**

typescript

Copy code

`async function taskOne(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task One Complete");
        }, 3000);
    });
}

async function taskTwo(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task Two Complete");
        }, 2000);
    });
}

async function executeTasksInParallel() {
    const results = await Promise.all([taskOne(), taskTwo()]);
    console.log(results); // After 3 seconds, ["Task One Complete", "Task Two Complete"] is logged
}

executeTasksInParallel();`

* * * * *

#### **Exercise 2 (Try/Catch): Nested Try/Catch Blocks (20 minutes)**

**Objective:** Learn how to handle errors from different asynchronous operations separately.

**Task:**

1.  Create two async functions, `fetchUser` and `fetchPosts`, that may randomly fail.
2.  Use nested `try/catch` blocks to handle errors from each function separately, and log which operation failed.

**Code Example:**

typescript

Copy code

`async function fetchUser(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("User data");
            } else {
                reject(new Error("Failed to fetch user"));
            }
        }, 1000);
    });
}

async function fetchPosts(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("User posts");
            } else {
                reject(new Error("Failed to fetch posts"));
            }
        }, 1000);
    });
}

async function handleUserData() {
    try {
        const user = await fetchUser();
        console.log(user); // "User data" is logged if fetchUser is successful

        try {
            const posts = await fetchPosts();
            console.log(posts); // "User posts" is logged if fetchPosts is successful
        } catch (postError) {
            console.log(postError.message); // Logs "Failed to fetch posts"
        }

    } catch (userError) {
        console.log(userError.message); // Logs "Failed to fetch user"
    }
}

handleUserData();`

* * * * *

#### **Exercise 3 (Try/Catch): Propagating Errors (20 minutes)**

**Objective:** Understand how to pass (or "propagate") errors up the call stack to be handled at a higher level.

**Task:**

1.  Create a function `fetchData` that throws an error.
2.  Create another function `processData` that calls `fetchData` and rethrows the error.
3.  Create a third function `handleData` that catches the rethrown error and logs it.

**Code Example:**

typescript

Copy code

`async function fetchData(): Promise<string> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Error in fetchData"));
        }, 1000);
    });
}

async function processData() {
    try {
        const data = await fetchData();
        console.log(data); // This will not run due to the error
    } catch (error) {
        throw error; // Rethrow the error
    }
}

async function handleData() {
    try {
        await processData();
    } catch (error) {
        console.log("Caught in handleData: ", error.message); // Logs "Error in fetchData"
    }
}

handleData();`

* * * * *
