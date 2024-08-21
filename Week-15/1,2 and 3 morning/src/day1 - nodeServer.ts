import http from "http"
// let http = require("http");
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

// Creating a node Server:
function handeler(req, res) {
    console.log("request Recived");

    res.writeHead(200, {
        "content-type": "text/plain"
    })

    res.end("Hello from backend server")
}

http.createServer(handeler).listen(port, () => console.log("serveris running at: http://127.0.0.1:5001"));