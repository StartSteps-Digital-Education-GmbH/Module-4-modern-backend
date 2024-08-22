import * as https from "https";
import * as fs from "fs";
import express from 'express';
import router from "./route.js";

const app = express()

app.use(router);

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
}

const expressServer = https.createServer(options, app);

expressServer.listen(443, () => { console.log("the https Server is running") });

// Creating a Node http Server

// function handeler(req, res) {
//     res.writeHead(200);
//     res.end("Hello from https")
// }
// const simpleServer = https.createServer(options, handeler);