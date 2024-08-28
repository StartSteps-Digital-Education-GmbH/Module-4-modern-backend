import { createContext, useContext } from "react";
import socketIO from "socket.io-client";
import { SOCKET_URL } from "../config/default";

export const socket = socketIO(SOCKET_URL);
export const SocketContext = createContext({ socket });

const SocketProvider = ({ children }: {
    children: React.ReactNode
}) => {
    return <SocketContext.Provider value={{ socket }}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider;