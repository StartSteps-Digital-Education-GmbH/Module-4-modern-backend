import fetch from "node-fetch";
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
        getTODOAPIData: async () => {
            try {
                const response = await fetch("https://dummyjson.com/todos");
                const data = await response.json();
                return data.todos;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    },
    Mutation: {
        addBook:(_, {title, author}: {title: string, author: string}): Book => {
            const newBook = {
                id: String(books.length + 1),
                title, //title: title
                author,
            }
            books.push(newBook);
            return newBook;
        },
        deleteBook: (_, {id}: {id: string}): Book => {
            const index = books.findIndex((book) => book.id === id);
            if (index !== -1) {
                const [deletedBook] = books.splice(index, 1);
                return deletedBook;
            } else {
                throw new Error("Book not found");
            }
        },
        updateBook: (_, {id, title, author}: {id: string, title: string, author: string}): Book => {
            const index = books.findIndex((book) => book.id === id);
            if (index === -1) {
                throw new Error("Book not found");
            }
            books[index].title = title;
            books[index].author = author;
            return books[index];
        },
    }
};