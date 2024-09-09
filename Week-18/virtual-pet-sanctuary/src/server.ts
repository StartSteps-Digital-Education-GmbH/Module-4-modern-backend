import { ApolloServer } from "apollo-server-express"
import express from "express"
import {createServer} from "http"


const app = express()
const port: number = 4000

app.use(express.json());


// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// server.applyMiddleware({ app })

const httpServer = createServer(app)

httpServer.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`)
})
