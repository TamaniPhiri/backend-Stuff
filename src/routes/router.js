const { createStudent } = require("../controllers");

const router=require("express").Router();

router.post('/student',createStudent)

module.exports=router;