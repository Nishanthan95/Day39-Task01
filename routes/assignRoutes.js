const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

router.post('/assign', async (req, res, next) => {
    try {
        const { mentorId, studentIds } = req.body;
        if (!mentorId || !studentIds || studentIds.length === 0) {
            res.status(400);
            throw new Error('Mentor ID and student IDs are required');
        }

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            res.status(404);
            throw new Error('Mentor not found');
        }

        const students = await Student.find({ _id: { $in: studentIds } });
        if (students.length !== studentIds.length) {
            res.status(404);
            throw new Error('One or more students not found');
        }

        students.forEach(async (student) => {
            student.mentor = mentorId;
            await student.save();
        });

        res.status(200).json({ message: 'Students assigned to mentor successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/change', async (req, res, next) => {
    try {
        const { studentId, mentorId } = req.body;
        if (!studentId || !mentorId) {
            res.status(400);
            throw new Error('Student ID and mentor ID are required');
        }

        const student = await Student.findById(studentId);
        if (!student) {
            res.status(404);
            throw new Error('Student not found');
        }

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            res.status(404);
            throw new Error('Mentor not found');
        }

        student.mentor = mentorId;
        await student.save();

        res.status(200).json({ message: 'Mentor changed successfully' });
    } catch (error) {
        next(error);
    }
});

router.get('/students/:mentorId', async (req, res, next) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            res.status(404);
            throw new Error('Mentor not found');
        }

        const students = await Student.find({ mentor: mentorId });
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

router.get('/previous-mentor/:studentId', async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) {
            res.status(404);
            throw new Error('Student not found');
        }

        const previousMentor = await Mentor.findById(student.mentor);
        if (!previousMentor) {
            res.status(404);
            throw new Error('Previous mentor not found');
        }

        res.status(200).json(previousMentor);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
