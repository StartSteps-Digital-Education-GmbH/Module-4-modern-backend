import { Request, Response } from "express";
import petModule from "./petData.js"

const getPets = (req: Request, res: Response) => {
    res.json(petModule.getPets());
}

const getPet = (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const pet = petModule.getPet(id);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send(`Pet with id ${id} not found`);
    }
}

const createPet = (req:Request, res:Response) => {
    const { name, species, color, size } = req.body;
    if (!name || !species) { //TODO: validation middleware
        res.status(400).send('Name and species are required');
        return;
    }
    const newPet = petModule.createPet({name, species, color, size});
    res.json(newPet);
};

const updatePetHappiness = (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const happiness = parseInt(req.body.happiness);
    const pet = petModule.updatePetHappiness(id, happiness);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send(`Pet with id ${id} not found`);
    }
};

const deletePet = (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const pet = petModule.deletePet(id);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send(`Pet with id ${id} not found`);
    }
}


export default {
    getPets,
    getPet,
    createPet,
    updatePetHappiness,
    deletePet
}