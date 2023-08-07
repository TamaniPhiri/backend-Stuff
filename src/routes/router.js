const { createStudent, getStudents } = require("../controllers");

const router = require("express").Router();

router.post("/student", createStudent);
router.get("/student", getStudents);

module.exports = router;
