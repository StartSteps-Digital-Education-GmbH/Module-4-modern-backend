import { useRef } from "react"
import { useSocket } from "../context/socket.context";
import { EVENTS } from "../config/event";

export const Rooms = () => {
    const { socket, rooms } = useSocket();
    const newRoomRef = useRef<HTMLInputElement>(null);
    const handleCreateRoom = () => {
        const roomName = newRoomRef.current?.value || "";
        if (!roomName) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

        if (newRoomRef.current) {
            newRoomRef.current.value = "";
        }

    }
    return <div>
        <div>
            <input placeholder="Room Name" ref={newRoomRef} />
            <button onClick={handleCreateRoom}>Create Eoom</button>
        </div>

        {rooms.map(({ id, name }) =>
            <div key={id}>{name}</div>
        )}
    </div>
}