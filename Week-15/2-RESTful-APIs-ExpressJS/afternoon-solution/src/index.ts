import express from 'express';
import { port } from './config';
import { logServerMessage } from './logger';
import { Student, students } from './dummyData';
import { getHelloMessage } from './helpers';


const app = express();
app.use(express.json());

// Root route to display the custom message
app.get('/', (req, res) => {
    res.send(getHelloMessage());
});


// GET endpoint to fetch all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// POST endpoint to add a new student
app.post('/api/students', (req, res) => {
    const newStudent: Student = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT endpoint to update a student’s grade
app.put('/api/students/:id', (req, res) => {
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
app.delete('/api/students/:id', (req, res) => {
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
