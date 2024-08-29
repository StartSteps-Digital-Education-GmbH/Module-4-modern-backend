import { createContext, useContext, useState } from "react";
import socketIO, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { EVENTS } from "../config/event";


interface Room {
    id: string;
    name: string;
}
interface Context {
    socket: Socket;
    userName?: string;
    setUserName: (value?: string) => void;
    roomId?: string; //the room that ser joined in
    rooms: Room[];
}



export const socket = socketIO(SOCKET_URL); //a connection to our backend socket server
export const SocketContext = createContext<Context>({
    socket,
    setUserName: () => "",
    rooms: [{ id: "", name: "" }]
}); //default value


const SocketProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [userName, setUserName] = useState<string | undefined>("");
    const [roomId, setRoomId] = useState<string | undefined>("");
    const [rooms, setRoom] = useState<Room[]>([{ id: "", name: "" }]);
    const userNameFromLocalStorage = localStorage.getItem("userName");
    if (userNameFromLocalStorage && !userName) {
        setUserName(userNameFromLocalStorage);
    }
    //the backend will fire an event send us these details
    //frontend need to have an event listener for these events that are fired
    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRoom(value);
    });
    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
    });


    return <SocketContext.Provider value={{ socket, userName, setUserName, roomId, rooms }}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;