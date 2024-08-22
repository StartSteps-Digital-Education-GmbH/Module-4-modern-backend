import dotenv from "dotenv";
import express from "express" //@types/express
import router from './routes.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

//middleware to pass data as json
app.use(express.json());

app.use(router);

// create a server, express will create a Node server for us
app.listen(port, () => console.log("server is running at: http://127.0.0.1:5001"))
