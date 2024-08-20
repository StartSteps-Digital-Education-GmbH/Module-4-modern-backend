import http from "http"
// let http = require("http"); //import
import dotenv from "dotenv";
import express, { Request, Response } from "express" //@types/express

dotenv.config();

const port = process.env.PORT;
const app = express();

//sample data
const users = [{
    id: 1, name: "somthing"
},
{
    id: 2, name: "another thing"
}
];

//middleware to pass data as json
app.use(express.json());

//Creating API Endpoints


app.get("/users", (req: Request, res: Response) => {
    res.json(users); // send users in a json response
})

// => get /resource/:id => return a spesific resourse(ex: users with id)
app.get("/users/:id", (req: Request, res: Response) => { // /users/3
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ message: "User not Found;" })
    }
    res.status(200).json(user);
});
// -> post /resource with body => create a new resource
app.post("/users", (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});
// => delete /users/:id => delete a spesific resource
// => patch, put /users/:id => update a spefific resource

// create a server, express will create a Node server for us
app.listen(port, () => console.log("server is running at: http://127.0.0.1:5001"))
