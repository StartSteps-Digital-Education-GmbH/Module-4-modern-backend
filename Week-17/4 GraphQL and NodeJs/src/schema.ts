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

    type Mutation {
        addBook(title: String!, author: String!): Book!
        deleteBook(id: ID!): Book!
        updateBook(id: ID!, title: String!, author: String!): Book!
    }
`;

export default typeDefs;