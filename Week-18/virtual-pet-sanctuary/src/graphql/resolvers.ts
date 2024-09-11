import petModule from "../petData.js";
import { PetInput } from "../types.js";
import {PubSub} from "graphql-subscriptions";

const pubsub = new PubSub();
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
            const updatedPet = petModule.updatePetHappiness(idToNumber, happiness);
            pubsub.publish('PET_HAPPINESS_UPDATED', {petHappinessUpdated: updatedPet}); //the server is sending a message to all users that subscibed to this event
            return petModule.updatePetHappiness(idToNumber, happiness);
        },
        deletePet(_, {id}: {id: string}) {
            const idToNumber = parseInt(id);
            const pet =petModule.deletePet(idToNumber);
            pubsub.publish('PET_DELETED_UPDATES', {petDeletedUpdates: pet}); //the server is sending a message to all users that subscibed to this event
            return pet;
        }
    },
    Subscription: {
        petHappinessUpdated: {
            subscribe: () => pubsub.asyncIterator(['PET_HAPPINESS_UPDATED']) //the client has subscribed to this event
        },
        petDeletedUpdates: {
            subscribe: () => pubsub.asyncIterator(['PET_DELETED_UPDATES']) //the client has subscribed to this event
        }
    }
};

export default resolvers;