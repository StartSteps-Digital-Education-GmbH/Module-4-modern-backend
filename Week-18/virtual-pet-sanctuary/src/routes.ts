import { Router } from "express";
import { Request, Response } from "express";
import {getPets, getPet, createPet, updatePetHappiness, deletePet} from "./petData.js"


const router = Router()

//RESTful API routes
//json req
router.get("/", (req: Request, res: Response) => {
    res.json(getPets());
});

router.get('/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const pet = getPet(id);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send(`Pet with id ${id} not found`);
    }
});

router.post('/', (req:Request, res:Response) => {
    const { name, species, color, size } = req.body;
    if (!name || !species) {
        res.status(400).send('Name and species are required');
        return;
    }
    const newPet = createPet({name, species, color, size});
    res.json(newPet);
});

router.patch('/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const happiness = parseInt(req.body.happiness);
    const pet = updatePetHappiness(id, happiness);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send(`Pet with id ${id} not found`);
    }
});