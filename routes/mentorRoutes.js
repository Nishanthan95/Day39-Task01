const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

router.post('/create', async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400);
            throw new Error('Mentor name is required');
        }

        const mentor = new Mentor({ name });
        const createdMentor = await mentor.save();
        res.status(201).json(createdMentor);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
