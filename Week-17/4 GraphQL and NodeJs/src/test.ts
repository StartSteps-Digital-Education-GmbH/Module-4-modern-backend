import fetch from "node-fetch";

fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          query ExampleQuery {
            allBooks: books {
                id
                title
                author
            }
        }
        `,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
        console.log(result)
        console.log(JSON.stringify(result));
    });