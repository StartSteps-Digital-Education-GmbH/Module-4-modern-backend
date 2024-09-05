import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
    }
    
    type Query {
        book(id: ID!): Book
        books: [Book!]!
    }
`;

export default typeDefs;