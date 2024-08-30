import { EVENTS } from "../config/event";
import { useSocket } from "../context/socket.context"
import { useRef } from "react";
export const Messages = () => {
    const { messages, socket, roomId, userName, setMessages } = useSocket(); //useContext

    // const [message, setMessage] = useState("");

    const newMessageRef = useRef<HTMLTextAreaElement>(null);
    const handleSendMessage = () => {
        const content = newMessageRef.current?.value;

        if (!content) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
            roomId,
            content,
            userName,
        }); //send message to server to spesific room

        const date = new Date();

        if (messages && content) {
            setMessages([...messages, {
                userName: "you",
                content,
                time: `${date.getHours()}:${date.getMinutes()}`
            }
            ])
        }

        if (newMessageRef.current) {
            newMessageRef.current.value = "";
        }
    }
    return <div>
        {messages?.map((message, index) => <p key={index}>
            {message.time} - {message.userName === userName ? 'you' : message.userName} : {message.content}
        </p>)}

        <div>
            <textarea rows={1} placeholder="Message" ref={newMessageRef} />
            {/* to use controlled input instead of ref */}
            {/* <textarea rows={1} placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value) }} /> */}
            <button className="cta" onClick={handleSendMessage}>Send</button>
        </div>
    </div>
}