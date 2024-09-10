import petModule from "../petData.js";
const resolvers = {
    Query: {
        pets: () => petModule.getPets(),
    }
};

export default resolvers;