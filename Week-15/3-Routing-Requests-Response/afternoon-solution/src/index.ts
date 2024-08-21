import express, { Request, Response, NextFunction } from 'express';
import { port } from './config';
import { logServerMessage } from './logger';
import { Student, students } from './dummyData';
import { getHelloMessage } from './helpers';

const app = express();
app.use(express.json());

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Validation middleware for POST requests
const validateStudent = (req: Request, res: Response, next: NextFunction) => {
    const { id, name, grade } = req.body;
    if (typeof id !== 'number' || typeof name !== 'string' || typeof grade !== 'string') {
        return res.status(400).json({ message: 'Invalid student data' });
    }
    next();
};

// Root route to display the custom message
app.get('/', (req: Request, res: Response) => {
    res.send(getHelloMessage());
});

// GET endpoint to fetch all students, with optional filtering by grade
app.get('/api/students', (req: Request, res: Response) => {
    const grade = req.query.grade as string;
    if (grade) {
        const filteredStudents = students.filter(s => s.grade === grade);
        if (filteredStudents.length > 0) {
            res.status(200).json(filteredStudents);
        } else {
            res.status(404).json({ message: `No students found with grade ${grade}` });
        }
    } else {
        res.status(200).json(students);
    }
});

// GET endpoint to fetch a specific student by ID with optional grade inclusion
app.get('/api/students/:id', (req: Request, res: Response) => {
    const studentId = parseInt(req.params.id);
    const includeGrade = req.query.includeGrade === 'true';
    const student = students.find(s => s.id === studentId);

    if (student) {
        const response = includeGrade ? student : { id: student.id, name: student.name };
        res.status(200)
            .set('X-Student-Found', 'true')
            .json({
                success: true,
                data: response,
                message: 'Student retrieved successfully',
            });
    } else {
        res.status(404)
            .set('X-Student-Found', 'false')
            .json({
                success: false,
                message: 'Student not found',
            });
    }
});

// POST endpoint to add a new student with validation middleware
app.post('/api/students', validateStudent, (req: Request, res: Response) => {
    console.log('Received Student Data:', req.body);
    const newStudent: Student = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT endpoint to update a student’s grade
app.put('/api/students/:id', (req: Request, res: Response) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        students[studentIndex].grade = req.body.grade;
        res.json(students[studentIndex]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// DELETE endpoint to remove a student
app.delete('/api/students/:id', (req: Request, res: Response) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.status(204).send(); // No content after deletion
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.listen(port, () => logServerMessage(`Server running on port ${port}`));
