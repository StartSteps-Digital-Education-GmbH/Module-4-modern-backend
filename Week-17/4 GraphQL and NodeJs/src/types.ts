enum Genre {
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
    SCIENCE_FICTION = "SCIENCE_FICTION",
    MYSTERY = "MYSTERY",
    THRILLER = "THRILLER",
}
export interface Book {
    id: string;
    title: string;
    author: string;
    genre:  Genre;
}

export type BookInput = {
    title: string;
    author: string;
    genre: Genre;
}