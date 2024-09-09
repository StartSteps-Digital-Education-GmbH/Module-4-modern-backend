import { useRef } from "react"
import { useSocket } from "../context/socket.context";
import { EVENTS } from "../config/event";

export const Rooms = () => {
    const { socket, rooms, roomId } = useSocket(); 
    const newRoomRef = useRef<HTMLInputElement>(null);
    const handleCreateRoom = () => {
        const roomName = newRoomRef.current?.value || "";
        if (!roomName) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

        if (newRoomRef.current) {
            newRoomRef.current.value = "";
        }
    }
    const handelJoinRoom = (id: string) => {
        console.log("Joining room", id);
        console.log("Current room", roomId);
        if(roomId === id) return; //the user is already in the room
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, { roomId: id });
    }

    return <div>
        <div>
            <input placeholder="Room Name" ref={newRoomRef} />
            <button onClick={handleCreateRoom} className="cta">Create Room</button>
        </div>

        {rooms.map(({ id, name }) =>
            <div key={id}>
                <button
                disabled={roomId === id}
                onClick={() => handelJoinRoom(id)}
                className="cta"
                >
                    {name}
                </button>
            </div>
        )}
    </div>
}