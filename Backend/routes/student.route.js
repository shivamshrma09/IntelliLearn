const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const studentcontrollers = require("../controllers/student.controllers");
const authMiddleware = require('../middlewares/student.middleware');
const Student = require('../models/student.models');
const jwt = require('jsonwebtoken');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('course').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

],
    studentcontrollers.RegisterStudent
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    studentcontrollers.loginstudent
)








router.get('/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        console.log('Token received:', token);
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        const student = await Student.findById(decoded.id);
        console.log('Student found:', student);
        
        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const userData = {
            name: student.name,
            email: student.email,
            course: student.course,
            streak: student.streak || 0,
            totalPoints: student.totalPoints || 0,
            numberOfBatchesCompleted: student.numberOfBatchesCompleted || 0,
            libraryItems: student.libraryItems || []

        };
        
        console.log('Sending user data:', userData);
        res.json(userData);
    } catch (error) {
        console.error('Error in /user endpoint:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add-batch', studentcontrollers.addBatchToStudent);   
router.post('/add-library', studentcontrollers.addLibraryToStudent);
router.post('/update-study-session', studentcontrollers.updateStudySession);
router.get('/user-stats', studentcontrollers.getUserWithStats);


module.exports = router;