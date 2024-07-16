const Mentor = require('../models/mentor');
const Student = require('../models/student');

exports.assignStudentToMentor = async (req, res) => {
    const { mentorId, studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    studentIds.forEach(async studentId => {
        const student = await Student.findById(studentId);
        student.mentor = mentor._id;
        await student.save();
        mentor.students.push(student._id);
    });
    await mentor.save();
    res.json(mentor);
};

exports.changeMentor = async (req, res) => {
    const { studentId, mentorId } = req.body;
    const student = await Student.findById(studentId);
    const previousMentor = await Mentor.findById(student.mentor);
    previousMentor.students.pull(student._id);
    await previousMentor.save();
    student.mentor = mentorId;
    await student.save();
    const newMentor = await Mentor.findById(mentorId);
    newMentor.students.push(student._id);
    await newMentor.save();
    res.json(student);
};

exports.getStudentsForMentor = async (req, res) => {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate('students');
    res.json(mentor.students);
};

exports.getPreviousMentor = async (req, res) => {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    res.json(student.mentor);
};