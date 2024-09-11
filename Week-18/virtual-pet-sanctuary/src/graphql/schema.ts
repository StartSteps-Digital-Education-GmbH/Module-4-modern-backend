import { gql } from "apollo-server-express";
const schema = gql`
    type Pet {
        id: ID!
        name: String!
        species: String
        happiness: Int
        color: String
        size: String
    }
    input PetInput {
        name: String!
        species: String!
        color: String
        size: String
    }
    type Query {
        pets: [Pet!]!
        pet(id: ID!): Pet
    }
    type Mutation {
        createPet(pet: PetInput): Pet!
        updatePetHappiness(id: ID!, happiness: Int!): Pet
        deletePet(id: ID!): Pet
    }
    type Subscription {
        petHappinessUpdated: Pet
        petDeletedUpdates: Pet
    }
    `;

export default schema;