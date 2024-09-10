import petModule from "../petData.js";
const resolvers = {
    Query: {
        pets: () => petModule.getPets(),
        pet: (_, {id}: {id: string}) => {
            const idToNumber = parseInt(id);
            return petModule.getPet(idToNumber)
        }
    }
};

export default resolvers;