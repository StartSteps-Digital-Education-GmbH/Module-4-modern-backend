import { Request, Response } from "express";

const createPet = (req:Request, res:Response, next:Function) => {
    const { name, species } = req.body;
    if (!name || !species) {
        res.status(400).send('Name and species are required');
        return;
    }
    next();
}

const updatePetHappiness = (req:Request, res:Response, next:Function) => {
    if (!req.body.happiness) {
        res.status(400).send('Happiness is required');
        return;
    }
    next();
}

const auth = (req:Request, res:Response, next:Function) => {
    //authintication with bearer token
    if (req.headers.authorization !== 'Bearer testPassword123') {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
}

export default {
    createPet,
    updatePetHappiness,
    auth
}