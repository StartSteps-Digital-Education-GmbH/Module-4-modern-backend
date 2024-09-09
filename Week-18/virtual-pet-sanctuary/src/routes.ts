import { Router } from "express";
import petController from "./controller.js";

const router = Router()

//RESTful API routes and handelers

router.get("/", petController.getPets);
router.get('/:id',petController.getPet);
router.post('/', petController.createPet); 
router.patch('/:id', petController.updatePetHappiness);
router.delete('/:id', petController.deletePet);

export default router;