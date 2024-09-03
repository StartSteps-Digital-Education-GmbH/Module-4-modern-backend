### **Async/Await, Promise, and Try/Catch Exercises**

### **Resources**

I gathered some resources you could go through this afternoon:

-   [Intro into Promise](https://www.geeksforgeeks.org/how-to-use-async-await-with-a-promise-in-typescript/)
-   [Going deeper into Promise and async/await:](https://www.atatus.com/blog/introduction-to-async-await-in-typescript/)
-   [Example](https://medium.com/grid-solutions/asynchronous-programming-in-typescript-has-been-greatly-simplified-with-the-introduction-of-d104775ed3ab)
-   [Another Example](https://www.typescriptlang.org/play/#example/async-await)

* * * * *

### Exercises
If you want to practice asynchronous programming, you can practice with the following exercises.
These are not mandatory, nor do you have to finish them all; They are just here to practice with these topics.

#### **Exercise 1: Basic Promise Creation and Consumption**

**Objective:** Get comfortable with creating and consuming Promises using `then`.

**Task:**

1.  Create a simple Promise that resolves to the string "Hello, World!" after 2 seconds.
2.  Consume the Promise using `then` and log the result to the console.

**Hints:**

-   Use `setTimeout` inside the Promise constructor to simulate the delay.
-   The `.then()` method is used to handle the resolved value of the Promise.


**Code Example:**
<details>
  <summary>
    Click to reveal the solution! Please try for yourself first. 😃
  </summary>

  ```typescript
  const greetingPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, World!");
    }, 2000);
    });
    
    greetingPromise.then((message) => {
        console.log(message); // After 2 seconds, "Hello, World!" should be logged
    });

  ```
</details>

* * * * *

#### **Exercise 2: Convert Promise to Async/Await**

**Objective:** Learn to work with `async/await` syntax by converting a Promise-based function.

**Task:**

1.  Take the code from Exercise 1 and modify it to use `async/await` instead of `.then()`.

**Hints:**

-   Use an `async` function to utilize the `await` keyword.
-   `await` can only be used inside functions marked with the `async` keyword.

**Code Example:**

<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  const greetingPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, World!");
    }, 2000);
    });
    
    async function displayGreeting() {
        const message = await greetingPromise;
        console.log(message); // After 2 seconds, "Hello, World!" should be logged
    }
    
    displayGreeting();

  ```
</details>

* * * * *

### Exercise 3: Handling Errors with Async/Await

**Task:**

1.  Create a Promise that randomly either resolves or rejects after 1 second.
2.  Use `async/await` to handle the result of the Promise.
3.  If the Promise resolves, log the success message.
4.  If the Promise rejects, catch the error and log an error message.

**Hints:**

-   Use `Math.random()` to randomly resolve or reject.
-   Use `try/catch` within the `async` function to handle the Promise result.

**Example Solution**

<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  const randomPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve("Success!");
        } else {
            reject("Something went wrong!");
        }
    }, 1000);
});

async function handleRandomPromise() {
    try {
        const result = await randomPromise;
        console.log(result); // If resolved, "Success!" is logged
    } catch (error) {
        console.log(error); // If rejected, "Something went wrong!" is logged
    }
  }
  
  handleRandomPromise();
  ```
</details>

* * * * *

#### **Exercise 4 (Try/Catch): Basic Try/Catch with Async/Await**

**Objective:** Understand error handling in asynchronous functions using `try/catch`.

**Task:**

1.  Create an async function `fetchData` that returns a Promise.
2.  Inside `fetchData`, simulate an error by rejecting the Promise with an error message.
3.  Use `try/catch` in another async function to handle the rejection and log the error message.

**Hints:**

-   Use `throw` or `reject` to simulate an error inside a Promise.
-   Catch the error using `catch` inside the `try/catch` block.

  
**Code Example:**

<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  async function fetchData(): Promise<string> {
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
  
  handleData();
  ```
</details>

* * * * *

#### **Exercise 5: Finally Block Usage**

**Objective:** Learn how to use the `finally` block to ensure cleanup actions run regardless of the outcome.

**Task:**

1.  Create an async function `fetchConfig` that returns a Promise and resolves with "Config loaded" after 1 second.
2.  Use a `try/catch/finally` block to handle the Promise:
    -   Log the result of `fetchConfig`.
    -   Log any potential error.
    -   In the `finally` block, log a message like "Cleanup complete".

**Hints:**

-   The `finally` block is used to execute code after `try` and `catch` blocks, regardless of the result.
-   
**Code Example:**

<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  async function fetchConfig(): Promise<string> {
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
  
  handleConfig();
  ```
</details>

* * * * *

### Apply Concepts to More Complex Scenarios**

#### **Exercise 6: Parallel Execution with Async/Await**

**Objective:** Practice running multiple asynchronous operations in parallel using `Promise.all`.

**Task:**

1.  Create two async functions that return Promises resolving after different intervals:
    -   `taskOne`: Resolves with "Task One Complete" after 3 seconds.
    -   `taskTwo`: Resolves with "Task Two Complete" after 2 seconds.
2.  Execute both functions in parallel using `Promise.all` and log the results once both tasks are complete.

**Hints:**

-   `Promise.all` takes an array of Promises and returns a single Promise that resolves when all Promises in the array have resolved.

  
**Code Example:**

<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  async function taskOne(): Promise<string> {
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
  
  executeTasksInParallel();

  ```
</details>
* * * * *

### Exercise 7: Nested Try/Catch Blocks

**Task:**

1.  Create two async functions:
    -   `fetchUser`: Simulate fetching user data and randomly resolve or reject with an error.
    -   `fetchPosts`: Simulate fetching posts for a user and randomly resolve or reject with an error.
2.  In a third function, use nested `try/catch` blocks to handle errors from both functions separately.
3.  Log appropriate error messages depending on which function failed.

**Hints:**

-   Use `Math.random()` to randomly reject the Promises.
-   Use nested `try/catch` blocks to catch errors separately for each operation.

**More Elaborate Task Instructions**
<details>
  <summary>
    **Click to reveal task instructions with more steps, if needed.** 😃
  </summary>

  **Task Overview:**

  -   You have two asynchronous functions: `fetchUser` and `fetchPosts`.
  -   Both functions may randomly fail (i.e., they may reject the Promise).
  -   Your goal is to handle the errors from these two functions separately, so that you know exactly which operation failed.
  
  **Detailed Steps:**
  
  1.  **Create the `fetchUser` function:**
  
      -   This function simulates fetching user data. It will either resolve with "User data" or reject with an error.
      -   To simulate randomness, use `Math.random()`. If the result is greater than 0.5, resolve the Promise; otherwise, reject it with an error message.
  2.  **Create the `fetchPosts` function:**
  
      -   This function simulates fetching posts for a user. It works similarly to `fetchUser`, but with a different error message if it fails.
  3.  **Handle errors in `handleUserData`:**
  
      -   Use a `try/catch` block around the call to `fetchUser`. If `fetchUser` fails, the `catch` block will run, and you can log the error.
      -   Inside the `try` block (after successfully fetching the user data), use another `try/catch` block to handle errors from `fetchPosts`.
  </details>

**Code Example:**
<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  async function fetchUser(): Promise<string> {
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
  
  handleUserData();
  ```
</details>


* * * * *

### Exercise 8: Propagating Errors

**Task:**
-   You'll create a function that intentionally throws an error.
-   Another function will catch this error but instead of handling it, will rethrow it.
-   A third function will catch the rethrown error and handle it.

**Detailed Steps:**

1.  **Create the `fetchData` function:**

    -   This function simply rejects with an error after a delay. The error simulates a failure in data fetching.
2.  **Create the `processData` function:**

    -   This function calls `fetchData` and wraps it in a `try/catch` block.
    -   Instead of handling the error, `processData` will rethrow the error using `throw`.
3.  **Handle the rethrown error in `handleData`:**

    -   In this function, you call `processData`. Since `processData` might rethrow an error, you need to catch it here and handle it (e.g., by logging an error message).

  
**Code Example:**
<details>
  <summary>
    **Click to reveal the solution! Please try for yourself first.** 😃
  </summary>

  ```typescript
  async function fetchData(): Promise<string> {
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
  
  handleData();
  ```
</details>


* * * * *
