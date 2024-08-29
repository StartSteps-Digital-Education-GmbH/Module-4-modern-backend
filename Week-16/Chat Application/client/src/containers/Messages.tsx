import { EVENTS } from "../config/event";
import { useSocket } from "../context/socket.context"
import { useRef, useState } from "react";
export const Messages = () => {
    const { messages, socket, roomId, userName } = useSocket();

    // const [message, setMessage] = useState("");

    const newMessageRef = useRef<HTMLTextAreaElement>(null);
    const handleSendMessage = () => {
        const content = newMessageRef.current?.value;

        if (!content) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
            roomId,
            content,
            userName,
        });

        if(newMessageRef.current) {
            newMessageRef.current.value ="";
        }
    }
    return <div>
        {messages?.map(({ userName, content, time }, index) => <p key={index}>
            {time} - {userName} : {content}
        </p>)}

        <div>
            <textarea rows={1} placeholder="Message" ref={newMessageRef} />
            {/* to use controlled input instead of ref */}
            {/* <textarea rows={1} placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value) }} /> */}
            <button onClick={handleSendMessage}>Send</button>
        </div>
    </div>
}