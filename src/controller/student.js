const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
  const { regNo, password } = req.body;
  try {
    const student = await prisma.student.create({
      data:{
        regNo,
        password
      },
    });
    res.status(201).json({ message: "student created successfully" });
  } catch (error) {
    console.log(error)
    res.status(400).json({message:error})
  }
};
