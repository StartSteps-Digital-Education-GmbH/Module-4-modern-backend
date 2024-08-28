import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import socketServerHandeler from './socket'

const port = config.get<number>("port");
const host = config.get<string>("host");

const corsOrigin = config.get<string>("corsOrigin");

const socketServer = new Server({
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
})

const app = express();

const httpServer = createServer(app);

app.get("/", (_, res) => res.send("the server is working")) // testing 

httpServer.listen(port, host, () => {
    logger.info("Server is running");
    socketServerHandeler({ socketServer });
})