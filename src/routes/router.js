const { createStudent, getStudents, createResult } = require("../controllers");

const router = require("express").Router();

router.post("/student", createStudent);
router.get("/student", getStudents);
router.post('/student/result',createResult);

module.exports = router;
