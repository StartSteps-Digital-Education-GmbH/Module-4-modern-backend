import { WebSocketServer } from "ws";
//Web Socket server code
const wss = new WebSocketServer({ port: 8080 }); // creating an instance of webserver

wss.on("connection", (ws) => { // handshake 
    // ws is the newlu oppned websocket connection to client
    console.log("Connected to a new client");
    ws.on("message", (message: string) => {
        console.log(`message recived from client: ${message}`); //from client
        ws.send(`I recived your message that was saying:${message}`); //to client
    });

    ws.on("close", () => {
        console.log("Server is closed by client");
    })
})