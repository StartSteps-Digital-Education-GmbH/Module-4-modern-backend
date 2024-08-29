import './App.css';
import { useSocket } from './context/socket.context';
import { useState, useEffect } from 'react';
import { Messages, Rooms } from './containers';
import React from 'react';

function App() {
    const { socket, userName, setUserName } = useSocket(); //use useContext to get value of scket from context
    const [socketId, setSocketId] = useState<string | undefined>("");

    const usernameRef = React.useRef<HTMLInputElement>(null);

    const handleSetUserName = () => {
        const userNameValue = usernameRef.current?.value;
        if (!userNameValue) {
            return;
        }
        setUserName(userNameValue);
        localStorage.setItem("userName", userNameValue);
    }
    useEffect(() => {
        socket.on('connect', () => {
            setSocketId(socket.id);
        })
    }, [socket]) //only once when component mounts

    if (!userName)
        return <div>
            <input type="text" placeholder="UserName" ref={usernameRef} />
            <button onClick={handleSetUserName}>Login</button>
        </div>

    return (<>
        <div className="App">
            {socketId}
        </div>
        <Rooms />
        <Messages />
    </>
    );
}

export default App;
