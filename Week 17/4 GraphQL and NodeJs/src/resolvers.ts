interface Book {
    id: string;
    title: string;
    author: string;
}
const books: Book[] = [
    {
        id: "1",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
    },
    {
        id: "2",
        title: "Jurassic Park",
        author: "Michael Crichton",
    },
    {
        id: "3",
        title: "Jurassic Park",
        author: "Michael Crichton",
    }
];

export const resolvers = {
    Query: {
        book: (_, {id}: {id: string}): Book| undefined => (books.find((book) => book.id === id)),
        books: (): Book[] => books,
    }
};