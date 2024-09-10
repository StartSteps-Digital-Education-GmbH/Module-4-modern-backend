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
    type Query {
        pets: [Pet!]!
    }
    `;

export default schema;