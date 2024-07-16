const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/create', async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400);
            throw new Error('Student name is required');
        }

        const student = new Student({ name });
        const createdStudent = await student.save();
        res.status(201).json(createdStudent);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
