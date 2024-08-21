## Exercise 3: Handling Requests – Extracting Parameters and Data

### Objective

Practice extracting and using different types of request data.

### Learning Explanation:

#### Understanding Request Parameters and Query Strings

When building web applications, you often need to extract specific data from requests sent by clients. This data can come in various forms, such as:

- **Route Parameters (`req.params`)**: These are parts of the URL that can be dynamic. For example, in a URL like `/api/students/1`, `1` is a route parameter that might represent a student's ID.
- **Query Parameters (`req.query`)**: These are additional parameters appended to the URL after a `?`. They provide extra information to the server, such as filtering options or settings that modify the response. For example, `/api/students/1?includeGrade=true` includes a query parameter `includeGrade` set to `true`.

In this exercise, you'll practice extracting and using these parameters to modify the behavior of your routes.

### Instructions

1. **Enhance the GET Route for a Student by ID:**

   - **Step 1:** Modify the existing route for fetching a student by ID to include an optional query parameter. The goal here is to allow the client to decide whether or not to include the student's grade in the response.

     - **Explanation:** You'll use `req.query` to access the query parameter. For this exercise, let's use a parameter called `includeGrade`. This parameter will determine if the student's grade should be included in the response.
     - **Why It’s Important:** This makes your API more flexible, allowing clients to retrieve only the data they need.

     **Need help?** Reveal the hint below if you get stuck!

     <details>
       <summary>Click to reveal a hint for Step 1</summary>
       To access query parameters in Express, use `req.query`. For example, `req.query.includeGrade` will give you the value of the `includeGrade` parameter.
     </details>

   - **Step 2:** Check if the query parameter `includeGrade` is present and set to `true`. Based on its value, modify the response to either include or exclude the student's grade.

     - **Explanation:** This step involves using a conditional statement to determine how the response should be structured. If `includeGrade` is `true`, include the grade in the response; otherwise, exclude it.
     - **Why It’s Important:** This step teaches you how to dynamically modify responses based on client input, a common requirement in API development.

     **Need help?** Reveal the hint below if you get stuck!

     <details>
       <summary>Click to reveal a hint for Step 2</summary>
       Use a conditional statement like `if (includeGrade) { ... }` to check if the query parameter is set to `true`.
     </details>

   - **Step 3:** Construct and send the appropriate JSON response based on the query parameter and student ID. Make sure to handle the case where the student is not found by returning a `404 Not Found` response.

     - **Explanation:** This step combines everything you've done so far—extracting parameters and building responses. If the student exists, send back the appropriate data; if not, return a `404` status with a message indicating the student wasn't found.
     - **Why It’s Important:** Building and sending structured responses is a key skill in API development. Handling errors (like a missing student) gracefully is also crucial for a good user experience.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.get('/api/students/:id', (req, res) => {
           const studentId = parseInt(req.params.id);
           const includeGrade = req.query.includeGrade === 'true';
           const student = students.find(s => s.id === studentId);

           if (student) {
               const response = includeGrade ? student : { id: student.id, name: student.name };
               res.json(response);
           } else {
               res.status(404).json({ message: 'Student not found' });
           }
       });
       ```

       **Explanation:**
       - The `req.query.includeGrade` checks if the `includeGrade` query parameter is present and set to `true`.
       - Depending on the value of `includeGrade`, the response either includes the student's grade or excludes it.
       - If the student is found, the appropriate response is sent; otherwise, a `404 Not Found` error is returned.
     </details>

2. **Log Received Data in the POST Route:**

   - **Step 1:** Update the POST route to log the data received in the request before processing it. This involves adding a `console.log` statement to output the contents of `req.body`.

     - **Explanation:** By logging the incoming data, you gain insight into what the server is receiving from the client. This is useful for debugging and ensuring that the data is correctly formatted before further processing.
     - **Why It’s Important:** Logging is a fundamental debugging tool that helps you verify that your application is working as expected.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.post('/api/students', validateStudent, (req, res) => {
           console.log('Received Student Data:', req.body);
           const newStudent: Student = req.body;
           students.push(newStudent);
           res.status(201).json(newStudent);
       });
       ```

       **Explanation:**
       - The `console.log('Received Student Data:', req.body);` statement logs the entire request body to the console.
       - This is useful for debugging and ensuring that the server is receiving the correct data.
     </details>

### Best Practices

- **Use Query Parameters for Optional Data:** Query parameters like `includeGrade` are ideal for optional data that affects the response format. They allow clients to customize the data they receive without requiring additional endpoints.
- **Logging Incoming Data:** Logging the incoming data helps with debugging and ensures that your server receives what you expect. This practice is especially useful during development and when diagnosing issues in production.

### Testing

- **Test the GET Route:**
  - Without the `includeGrade` parameter: `http://localhost:3000/api/students/1`
  - With the `includeGrade` parameter: `http://localhost:3000/api/students/1?includeGrade=true`
  
- **Test the POST Route:**
  - Use Postman or a similar tool to send POST requests with different student data. Check your server console for the logged data to ensure it's being received correctly.

---

## Exercise 4: Advanced Responses – Structuring Responses and Sending Headers

### Objective

Learn to control response status codes, send custom headers, and structure JSON responses.

### Learning Explanation:

#### Understanding Response Status Codes, Headers, and JSON Structure

In web development, the response that your server sends back to the client is just as important as the request the client sends. A well-structured response not only includes the requested data but also provides additional information about the request's success or failure.

- **Status Codes:** HTTP status codes indicate the outcome of the client's request. For example, `200 OK` means the request was successful, `404 Not Found` means the resource could not be found, and `500 Internal Server Error` means there was a problem on the server.
  
- **Headers:** HTTP headers are used to send additional information with a response or request. They can include metadata like content type, length, server information, or custom data like whether a student was found.

- **JSON Response Structure:** A good practice is to structure your JSON responses with clear and consistent fields such as `success`, `data`, and `message`. This structure makes it easier for clients to parse and understand the response.

In this exercise, you’ll practice controlling these elements to build robust API responses.

### Instructions

1. **Enhance the GET Route for a Student by ID:**

   - **Step 1:** Modify the route for fetching a student by ID to include custom headers.

     - **Explanation:** Headers can be used to send additional information about the response that isn't part of the body. For example, you might include a header like `X-Student-Found` to indicate whether the student was found.
     - **Why It’s Important:** Using custom headers allows you to provide extra context or metadata about the response, which can be useful for the client.

     **Need help?** Reveal the hint below if you get stuck!

     <details>
       <summary>Click to reveal a hint for Step 1</summary>

       To add a custom header, use the `res.set` method. For example:

       ```typescript
       res.set('X-Student-Found', 'true');
       ```

       This header indicates whether the student was found.

     </details>

   - **Step 2:** Structure the JSON response to include a success flag, data, and message.

     - **Explanation:** Structuring your response consistently with fields like `success`, `data`, and `message` makes it easier for API consumers to handle the data and understand the result of their request.
     - **Why It’s Important:** Consistent response structures improve the usability of your API, making it easier for developers to predict and handle responses.

     **Need help?** Reveal the hint below if you get stuck!

     <details>
       <summary>Click to reveal a hint for Step 2</summary>

       You can structure your JSON response like this:

       ```typescript
       res.json({
           success: true,
           data: student,
           message: 'Student retrieved successfully'
       });
       ```

       Make sure to adjust the `success` flag and `message` depending on whether the student was found.

     </details>

   - **Step 3:** Handle the case where the student is not found, sending a `404` status with an appropriate message.

     - **Explanation:** If the student doesn't exist, you should return a `404 Not Found` status along with a structured message indicating the failure. This helps the client understand what went wrong.
     - **Why It’s Important:** Proper error handling is crucial for building robust APIs. It ensures that clients receive clear and actionable information when something goes wrong.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.get('/api/students/:id', (req, res) => {
           const studentId = parseInt(req.params.id);
           const student = students.find(s => s.id === studentId);

           if (student) {
               res.status(200)
                  .set('X-Student-Found', 'true')
                  .json({
                      success: true,
                      data: student,
                      message: 'Student retrieved successfully'
                  });
           } else {
               res.status(404)
                  .set('X-Student-Found', 'false')
                  .json({
                      success: false,
                      message: 'Student not found'
                  });
           }
       });
       ```

       **Explanation:**
       - The `res.set('X-Student-Found', 'true')` method sets a custom HTTP header indicating whether the student was found.
       - The response is structured with a `success` flag, the `data` (student object), and a `message`.
       - If the student is not found, a `404 Not Found` status is returned along with a similar structured response.
     </details>

2. **Handle Different Scenarios in the GET Route for All Students:**

   - **Step 1:** Update the route to check if a `grade` query parameter is present.

     - **Explanation:** The `grade` query parameter allows the client to filter students by their grade. You will need to check if this parameter exists in the request.
     - **Why It’s Important:** Providing filtering options like this makes your API more flexible and useful for clients.

     **Need help?** Reveal the hint below if you get stuck!

     <details>
       <summary>Click to reveal a hint for Step 1</summary>

       You can access the `grade` query parameter using:

       ```typescript
       const grade = req.query.grade as string;
       ```

     </details>

   - **Step 2:**  If the `grade` parameter is present, you’ll need to filter the `students` array to include only those students who match the grade. (you implemented the filtering before)
     
   - **Step 3:** If the `grade` query parameter is not present, return all students. 

     - **Explanation:** When no filter is applied, the client should receive the full list of students.
     - **Why It’s Important:** This ensures that your API has a reasonable default behavior when no specific criteria are provided.

     **Need help?** Reveal the solution below, but please try by yourself first!

     <details>
       <summary>Click to reveal the solution & explanation</summary>

       ```typescript
       app.get('/api/students', (req, res) => {
           const grade = req.query.grade as string;
           if (grade) {
               const filteredStudents = students.filter(s => s.grade === grade);
               if (filteredStudents.length > 0) {
                   res.status(200).json(filteredStudents);
               } else {
                   res.status(404).json({ message: `No students found with grade ${grade}` });
               }
           } else {
               res.status(200).json(students);
           }
       });
       ```

       **Explanation:**
       - The route first checks if a `grade` query parameter exists.
       - If it does, it filters the `students` array to find those with the matching grade.
       - If no students match, it returns a `404 Not Found` status with a message.
       - If students are found, it returns them with a `200 OK` status.
       - If no grade is specified, it returns all students.
     </details>

### Best Practices

- **Use Custom Headers for Additional Information:** Custom headers like `X-Student-Found` can convey additional metadata about the response.
- **Structure JSON Responses Consistently:** Structured JSON responses with success flags and messages make it easier for API consumers to understand the response.

### Testing

- Use Postman or your browser to test the GET routes:
  - Fetch existing and non-existing students by ID.
  - Fetch students with existing and non-existing grades.
- Check the response status codes, headers, and body structure in each case.

---

## Conclusion

These exercises have introduced you to advanced concepts in Express.js, including dynamic routing, custom middleware, and sophisticated request/response handling. Practice these concepts and experiment with different scenarios to deepen your understanding of Express.js.
