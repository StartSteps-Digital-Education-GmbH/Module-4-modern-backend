import './App.css';
import { useSocket } from './context/socket.context';
import { useState, useEffect } from 'react';
import { Messages, Rooms } from './containers';
import React from 'react';
import styles from './styles/App.module.css'

function App() {
    //all state variables here
    //socket.on here as well
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
        return <div className={styles.usernameWrapper}>
            <div className={styles.usernameInner}>
                <input type="text" placeholder="UserName" ref={usernameRef} />
                <button onClick={handleSetUserName} className='cta'>Login</button>
            </div>
        </div>

    return (<>
        <div className={styles.container}>
            <Rooms /> {/* pass the states */}
            {/* <TaskManger/> */}
            <Messages />
        </div>
    </>
    );
}

export default App;
