# Info Sheet on Pino

## What is Pino?

Pino is a fast and lightweight logging library for Node.js applications. It generates JSON logs by default, making it well-suited for production environments where logs may need to be processed by other systems or stored for later analysis.

## Why Use Pino?

- **Performance**: Pino is designed to be extremely fast, minimizing the performance impact on your application.
- **JSON Logs**: The JSON format is easy to parse and integrate with log management tools.
- **Flexibility**: Pino can be configured for various environments, from development to production.

## Setting Up Pino

### Installation:

```bash
npm install pino
```

## Basic Usage:
```typescript
const pino = require('pino');
const logger = pino();

logger.info('This is an info message');
```

## Understanding Logging Levels
Pino provides various logging levels that allow you to categorize the severity of logs:

- trace: Detailed information, typically of interest only when diagnosing problems.
- debug: Fine-grained information about the application's behavior.
- info: General operational entries about what's happening in the application.
- warn: Potentially harmful situations.
- error: Error events that might still allow the application to continue running.
- fatal: Very severe error events that will presumably lead the application to abort.

**Example**:
```javascript
logger.info('This is an info log');
logger.error('This is an error log');
```

## Pretty Printing

By default, Pino log lines are newline-delimited JSON (NDJSON). This is perfect for production usage and long-term storage. It's not so great for development environments. Thus, Pino logs can be prettified by using a Pino prettifier module like `pino-pretty`.

### How to Use `pino-pretty` in Your Project

1. **Install `pino-pretty`**: First, you need to install `pino-pretty` as a separate dependency in your project:

   ```bash
   npm install pino-pretty
   ```
   
2. **Configure Pino to Use `pino-pretty`**: You need to configure Pino to use `pino-pretty` as a transport option. Here’s the configuration for using pino-pretty in a this morning's project:
    ```typescript
    import logger from "pino";
    import dayjs from "dayjs";
    
    const log = logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      base: {
        pid: false,
      },
      timestamp: () => `,"time":"${dayjs().format()}"`,
    });
    
    export default log;

    ```

    #### Line-by-Line Explanation:
    1. Imports:
       - import logger from "pino";: Imports the Pino logging library.
       - import dayjs from "dayjs";: Imports the Day.js library for handling dates and times.
       - 
    2. Logger Configuration:
       - transport:
           - target: "pino-pretty": This directs the logs through the pino-pretty module, enabling pretty-printing.
           - options:
               - colorize: true: Adds color to the logs, which is particularly useful during development to visually separate different types of log messages (like info, error, etc.).
    
    3. Base Configuration:
       - base: { pid: false }:
             - This setting removes the pid (process ID) from the logs. It’s often unnecessary during development, so removing it can make the logs cleaner.
    
    4. Timestamp Configuration:
         - timestamp: () => ,"time":"${dayjs().format()}"``:
         - This customizes the timestamp format in the logs. Using Day.js, it adds a time field to each log entry with a human-readable date and time.
    
    5. Exporting the Logger:
         - export default log;:
         - This line exports the configured logger so it can be used throughout the application for logging.
    
   
