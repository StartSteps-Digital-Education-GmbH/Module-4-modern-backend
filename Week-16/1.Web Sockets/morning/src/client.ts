import path from "path";
import { fileURLToPath } from "url";
import express from "express";
//Serving client on localhost:3000
//find relative path for index.html file
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename); // absoulote url for dist folder
const app = express();
app.get("/", (req, res) => {
    res.sendFile(_dirname + "/client.html");
})

app.listen(3000, ()=>{
    console.log("client is running on port 3000");
})