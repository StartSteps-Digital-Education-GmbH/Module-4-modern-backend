import { ApolloServer } from "apollo-server-express"
import express from "express"
import {createServer} from "http"
import router from "./routes.js"
import typeDefs from "./graphql/schema.js"
import resolvers from "./graphql/resolvers.js"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"


const app = express()
const port: number = 4000

app.use(express.json());
app.use('/api/pets', router); //RESTful API routes

const schema = makeExecutableSchema({typeDefs, resolvers})
const server = new ApolloServer({
  schema
})

await server.start();
server.applyMiddleware({app}) //adding the graphql route to the express app

const httpServer = createServer(app)

const webServer = new WebSocketServer({
  server: httpServer,
  path: server.graphqlPath
})

useServer({schema}, webServer)

httpServer.listen({port}, () => {
    console.log(`RESTful API Server ready at http://localhost:${port}/api/pets`)
    console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`)
})
