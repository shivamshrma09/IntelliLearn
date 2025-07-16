const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/student.controllers');
const authMiddleware = require('../middlewares/student.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.RegisterStudent)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginstudent
)



module.exports = router;