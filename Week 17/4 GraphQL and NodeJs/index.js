import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
//Schema
const typeDefs = gql `
    type Query {
        hello: String
    }
`;
const resolvers = {
    Query: {
        hello: () => "Hello, world!",
    },
};
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
const app = express();
apolloServer.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});
