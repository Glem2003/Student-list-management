const express = require("express");
const db = require('./module/db');

const app = express();
app.use(express.json());

app.get('/students', (req, res) => {
    db.select('*').from('students').then(data => {
        res.status(200).json(data)
    })
})

app.get('/students/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
        .from('students')
        .where({ student_id: id })
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({ message: 'success', data: data })
            } else {
                res.status(404).json({ message: 'Student not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error' })
        })
})

app.post('/students', (req, res) => {
    const { student_id, student_name, student_age, student_gender, student_grade, student_class } = req.body;

    db('students').where({ student_id }).first()
        .then(existingStudent => {
            if (existingStudent) {
                res.status(400).json({ message: 'Student already exists' })
            }

            return db('students').insert({
                student_id,
                student_name,
                student_age,
                student_gender,
                student_grade,
                student_class
            })
                .then(() => {
                    return db('students').where({ student_id }).first()
                })
                .then(data => {
                    res.status(201).json({ message: 'success', data: data })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Server error' })
                })
        })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})