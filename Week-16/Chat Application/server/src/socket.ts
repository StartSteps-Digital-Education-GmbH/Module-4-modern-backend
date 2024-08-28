import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
    connection: "connection", // when a new client is connected to the socket
}

function socket({ socketServer }: {
    socketServer: Server,
}) {
    logger.info("Socket is enabled");
    socketServer.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`new client connected with an id of: ${socket.id}`)
    });
}

export default socket;