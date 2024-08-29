import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { v4 } from "uuid";

interface Room {
    id: string;
    name: string;
}

const EVENTS = {
    connection: "connection",
    CLIENT:{
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    },
    SERVER:{
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    }
}

const rooms: Room[] = [{id: "", name: ""}];

function socket({ socketServer }: {
    socketServer: Server,
}) {
    logger.info("Socket is enabled");
    socketServer.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`new client connected with an id of: ${socket.id}`)

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) =>{
            logger.info(`Connection ${socket.id} Created Room: ${roomName}`);

            const roomId = v4();
            rooms.push({id: roomId, name: roomName});

            socket.join(roomId); //TODO:we are not saving user/socket details so we will loose it in client side refresh

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms); //to other client

            socket.emit(EVENTS.SERVER.ROOMS, rooms)

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

        })

        const date = new Date();

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({
            roomId,
            content,
            userName,
        }) => {
            logger.info(`new message by ${userName} in room ${roomId}: ${content}`);
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                content,
                userName,
                time: `${date.getHours}:${date.getMinutes}`
            })
        })
    });
}

export default socket;