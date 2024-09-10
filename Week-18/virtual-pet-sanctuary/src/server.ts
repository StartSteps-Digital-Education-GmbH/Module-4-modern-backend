import { ApolloServer } from "apollo-server-express"
import express from "express"
import {createServer} from "http"
import router from "./routes.js"
import typeDefs from "./graphql/schema.js"
import resolvers from "./graphql/resolvers.js"


const app = express()
const port: number = 4000

app.use(express.json());
app.use('/api/pets', router);

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start();


server.applyMiddleware({app})

const httpServer = createServer(app)



httpServer.listen({port}, () => {
    console.log(`RESTful API Server ready at http://localhost:${port}/api/pets`)
    console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`)
})
