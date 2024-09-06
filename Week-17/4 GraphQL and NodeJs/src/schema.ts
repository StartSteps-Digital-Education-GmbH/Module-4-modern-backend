import { gql } from "apollo-server-express";

const typeDefs = gql`
    enum Genre {
        FICTION
        NON_FICTION
        SCIENCE_FICTION
        MYSTERY
        THRILLER
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        genre: Genre
    }

    input BookInput {
        title: String!
        author: String!
        genre: Genre
    }

    type TODOAPIData {
        id: ID!, 
        todo: String,
        completed: Boolean,
        userId: Int,
    }
    
    type Query {
        book(id: ID!): Book
        books: [Book!]!
        getTODOAPIData: [TODOAPIData!]!
    }

    type Mutation {
        addBook(input: BookInput!): Book!
        deleteBook(id: ID!): Book!
        updateBook(id: ID!, title: String!, author: String!): Book!
    }
`;

export default typeDefs;