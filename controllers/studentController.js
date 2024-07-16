const Student = require('../models/student');
exports.createStudent = async (req, res) => {
    const { name } = req.body;
    const newStudent = new Student({ name });
    await newStudent.save();
    res.json(newStudent);
};