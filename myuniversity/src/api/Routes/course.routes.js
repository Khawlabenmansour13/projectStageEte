const express = require('express');
const router = express.Router();

const course_controller = require ('../Controller/course.controller')
const section_controller = require('../Controller/section.controller');
const user_controller = require('../Controller/user.controller');

router.post('/addCourse',course_controller.addCourse);
router.get('/getAllCourse',course_controller.getAllCourses);

module.exports = router;