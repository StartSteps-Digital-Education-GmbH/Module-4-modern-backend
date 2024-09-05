Project: Building a Student Management System with GraphQL
----------------------------------------------------------

In this project, you'll create a GraphQL API for a student management system. You'll define a schema for students, implement queries and mutations, and test them using GraphQL Playground.


### Step 1: Initialize the Project

Create a New Project Folder: Open your terminal and create a new folder for your project:

```bash
mkdir graphql-book-management

cd graphql-book-management
```

Initialize a Node.js Project: Inside your project folder, initialize a new Node.js project by running:

```bash
npm init -y
```
-  This will create a package.json file where your project dependencies will be tracked.


### Step 2: Install Dependencies

You need to install several packages, including TypeScript, Apollo Server, GraphQL, and other necessary packages for your setup.

- **Install Apollo Server and GraphQL**: Apollo Server is used to handle GraphQL, and graphql is required to define the GraphQL schema.\

  `npm install apollo-server-express express graphql`

- **Install TypeScript and Node Types**: Since you're using TypeScript, you need TypeScript itself and some type definitions for Node.js.

  `npm install typescript @types/node ts-node --save-dev`

- **Install Other Type Definitions**: You also need the type definitions for the packages you are using, like express.

  `npm install @types/express --save-dev`

### Step 3: Setup TypeScript Configuration

Now you need to set up your TypeScript config file (tsconfig.json). 

**Create `tsconfig.json`**:
Create a file named tsconfig.json in the root of your project, and add the following configuration:
```bash
{

  "compilerOptions": {

    "target": "es2018",

    "module": "commonjs",

    "strict": true,

    "esModuleInterop": true,

    "outDir": "./dist",

    "rootDir": "./src"

  }

}
```

**Folder Structure:**
Inside your project folder, create a `src` directory.
