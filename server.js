const express = require("express");
const cors = require("cors");
const db = require('./module/db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/students', (req, res) => {
    db.select('*')
        .from('students')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Server error' })
        })
})

app.get('/students/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
        .from('students')
        .where({ student_id: id })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json({ message: 'success', data: data })
            } else {
                return res.status(404).json({ message: 'Student not found' })
            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'Server error' })
        })
})

app.post('/students', async (req, res) => {
    const { student_id, student_name, student_age, student_gender, student_grade, student_class } = req.body;

    try {
        const existingStudent = (await db('students').where({ student_id })).first()
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' })
        }

        await db('students').insert({
            student_id,
            student_name,
            student_age,
            student_gender,
            student_grade,
            student_class
        });

        const newStudent = await db('students').where({ student_id }).first();
        res.status(201).json({ message: 'success', data: newStudent });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
})

app.put('/students/:id', async (req, res) => {
    const { id } = req.params
    const updatedData = req.body

    try {
        const existingStudent = await db('students').where({ student_id: id }).first();
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' })
        }

        await db('students').where({ student_id: id }).update(updatedData);

        const updatedStudent = await db('students').where({ student_id: id }).first();
        res.status(200).json({ message: 'success', data: updatedStudent });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
})

app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const existingStudent = await db('students').where({ student_id: id }).first();
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' })
        }

        await db('students').where({ student_id: id }).del();
        res.status(200).json({ message: 'success' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})