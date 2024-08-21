// Define the Student interface
export interface Student {
    id: number;
    name: string;
    grade: string;
}

// Create an array of dummy student data
export const students: Student[] = [
    { id: 1, name: 'Alice', grade: 'A' },
    { id: 2, name: 'Bob', grade: 'B' },
    { id: 3, name: 'Charlie', grade: 'C' },
];
