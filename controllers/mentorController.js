const Mentor = require('../models/mentor');
exports.createMentor = async (req, res) => {
    const { name } = req.body;
    const newMentor = new Mentor({ name });
    await newMentor.save();
    res.json(newMentor);
};