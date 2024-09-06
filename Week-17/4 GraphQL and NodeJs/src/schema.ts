import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
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
        addBook(title: String!, author: String!): Book!
        deleteBook(id: ID!): Book!
        updateBook(id: ID!, title: String!, author: String!): Book!
    }
`;

export default typeDefs;