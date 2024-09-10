import petModule from "../petData.js";
import { PetInput } from "../types.js";
const resolvers = {
    Query: {
        pets: () => petModule.getPets(),
        pet: (_, {id}: {id: string}) => {
            const idToNumber = parseInt(id);
            return petModule.getPet(idToNumber)
        }
    },
    Mutation: {
        createPet: (_, {pet}: {pet: PetInput}) => {
            return petModule.createPet(pet);
        },
        updatePetHappiness(_, {id, happiness}: {id: string, happiness: number}) {
            const idToNumber = parseInt(id); 
            return petModule.updatePetHappiness(idToNumber, happiness);
        },
        deletePet(_, {id}: {id: string}) {
            const idToNumber = parseInt(id);
            return petModule.deletePet(idToNumber);
        }
    }
};

export default resolvers;