const { createStudent } = require('../controller/student');

const router=require('express').Router();

router.post('/student/create',createStudent);

module.exports=router;