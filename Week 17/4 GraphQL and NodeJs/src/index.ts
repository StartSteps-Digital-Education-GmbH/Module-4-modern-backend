import { ApolloServer,gql } from "apollo-server-express";
import express from "express";
import { resolvers } from "./resolvers.js";
import typeDefs from "./schema.js";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

const app = express();

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});