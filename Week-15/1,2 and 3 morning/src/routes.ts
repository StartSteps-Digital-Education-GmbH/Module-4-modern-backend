import express, { Request, Response, NextFunction } from "express" //@types/express

import userHandelers from "./userHandeler.js";

const router = express.Router();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    if (req.headers.authorization === "Bearer abcdef") {
        next()
    } else {
        res.status(401).send("Unauthorized");
    }
}

const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (!req.body || !req.body.name) {
        res.status(403).json({ message: "Name is required" });
    } else {
        next()
    }
};

//Creating API Endpoints

router.get("/users", userHandelers.getAll)
// => get /resource/:id => return a spesific resourse(ex: users with id)
router.get("/users/:id", userHandelers.get);

//example of using middlewares
// -> post /resource with body => create a new resource
router.post("/users", authMiddleware, validationMiddleware, userHandelers.post);

// => delete /resource/:id => delete a spesific resource
router.delete("/users/:id", authMiddleware, userHandelers.remove)
// => patch, put /users/:id => update a spefific resource
router.put("/users/:id", userHandelers.put)

router.all('/secret', (req: Request, res: Response) => {
    console.log("a request has been made to the secure route");
    res.json({ message: "request send" });
})

export default router;
