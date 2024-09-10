import { Router } from "express";
import petController from "./controller.js";
import petMiddleware from "./middleware.js";

const router = Router()

//RESTful API routes and handelers

router.get("/", petController.getPets);
router.get('/:id',petController.getPet);
router.post('/', petMiddleware.createPet,petController.createPet); 
router.patch('/:id', petMiddleware.updatePetHappiness, petController.updatePetHappiness);
router.delete('/:id', petController.deletePet);

export default router;