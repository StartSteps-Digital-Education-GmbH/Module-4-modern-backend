Project: Building a Student Management System with GraphQL
----------------------------------------------------------

In this project, you'll create a GraphQL API for a student management system. You'll define a schema for students, implement queries and mutations, and test them using GraphQL Playground.

## Initializing the Project

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

## Exercises

### Exercise 1: Create the GraphQL Schema

#### (1.1) typeDefs

-   Create a constant named `typeDefs` and use the `gql` tag from Apollo Server to start defining your schema.
-   This is where you will define all the types, queries, and mutations in the following exercises.

#### (1.2) Student Type
Inside the `gql` template, create a `Student` type with the following fields:
- an id, students' first name, last name, their grade level and courses.
- Make sure that everything is non-nullable (`!`)

Hint: Use an array for the courses field to represent a list.

#### (1.3) Query Type

Inside the `gql` template, create a `type Query`. In here define the 2 queries that can be queried by the client:
1. A query that returns a list of all students
2. A query that fetches a single student by their `id`

Hint: The query for fetching all students starts with `students:`. The query for fetching a single student by `id` starts with `student(id: ID!):`.

#### (1.4) Mutation Type
Inside the `gql` template, create a `type Mutation`. Define the following 4 mutations:
1. Add a new student, and return the created student

### Exercise 2: Implement Resolvers

#### (2.1) Create `resolvers.ts`

-   Create a new file named `resolvers.ts` inside the `src` directory.

#### (2.2) Implement Query Resolvers

-   Define the `Query` resolvers for:
    1.  `students`: Return the list of students.
    2.  `student(id: ID!)`: Find and return a student by their ID.

**Hint**: Use an in-memory array named `students` to hold student data.

#### (2.3) Implement Mutation Resolvers

-   Define the `Mutation` resolvers for:
    1.  `addStudent`: Add a new student to the `students` array.
    2.  `enrollStudentInCourse`: Add a course to a student's `courses` array.
    3.  `updateStudentGrade`: Update a student's grade in the `students` array.
    4.  `removeStudent`: Remove a student from the array by their ID. Return `true` if successful and `false` if not found.

**Hint**: Use `find()` to locate students and `findIndex()` for removing students by ID.

* * * * *

### Exercise 3: Set Up the Server

#### (3.1) Create `server.ts`

-   Create a file named `server.ts` in the `src` directory.

#### (3.2) Set Up Apollo Server

-   Inside `server.ts`, import the required modules: `express`, `ApolloServer`, `typeDefs`, and `resolvers`.
-   Set up an Apollo Server instance with `typeDefs` and `resolvers`, and apply it as middleware to the Express app.
-   Start the server on port 4000, and log the GraphQL endpoint URL to the console.

* * * * *

### Exercise 4: Run the Server

#### (4.1) Add Start Script

-   Open the `package.json` file and add the following script to the `"scripts"` section:

    json

    Copy code

    `"scripts": {
      "start": "ts-node src/server.ts"
    }`

#### (4.2) Run the Server

-   Run the server using the following command:

    bash

    Copy code

    `npm start`

* * * * *

Exercise 5: Tasks for Students
------------------

### (5.1) Add a New Student

-   Use the `addStudent` mutation to add a new student to the system. Provide the `firstName`, `lastName`, and `grade`.
-   Verify that the student is added by querying all students.

### (5.2) Enroll a Student in a Course

-   Use the `enrollStudentInCourse` mutation to add a course to a student's list of courses.
-   You'll need the student's `ID` and the `courseName`.
-   After enrolling, query the student to see their updated course list.

### (5.3) Update a Student's Grade

-   Use the `updateStudentGrade` mutation to change a student's grade.
-   Provide the student's `ID` and the new grade.
-   Then, query the student to confirm the grade change.

### (5.4) Remove a Student

-   Use the `removeStudent` mutation to remove a student from the system by their `ID`.
-   After removal, query all students to verify that the student is no longer in the list.

### (5.5) Query Specific Student

-   Use the `student(id: ID!)` query to fetch details of a specific student by their `ID`.
-   Try this with different student IDs.

* * * * *

### Test Your API

-   Use the GraphQL Playground at `http://localhost:4000/graphql` to execute the queries and mutations.
-   Observe how the data changes with each operation.
2. Enroll an existing student in a course
3. Update the grade of an existing student
4. Remove a student by `id`, return true if succesful and false if unsuccesful


### Exercise 2: Implement Resolvers
---------------------------

