export interface Book {
    id: string;
    title: string;
    author: string;
}

export type BookInput = {
    title: string;
    author: string;
}