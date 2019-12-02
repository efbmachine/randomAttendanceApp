var express = require('express');
var router = express.Router();

//Require controllers
var course_controller = require('../controllers/courseController');


router.get('/',course_controller.index);
router.post('/',course_controller.addCourse);

router.get('/:id',course_controller.showCourse);
//router.get('/:id/students',course_controller.showCourse);
router.post('/:id/students', course_controller.createStudent);
router.get('/:id/students/delete',course_controller.deleteAllStudents);

module.exports = router;
