const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
  const { regNo, password } = req.body;
  try {
    const existingStudent = await prisma.student.findUnique({
      where: {
        regNo: regNo,
      },
    });
    if (existingStudent) {
      return res.status(401).json({ message: "Student already exists" });
    }
    await prisma.student.create({
      data: {
        regNo,
        password,
      },
    });
    res.status(201).json({ message: "student created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.studentLogin = async (req, res) => {
  const { regNo, password } = req.body;
  if (!regNo || !password) {
    return res.status(400).json("Invalid credentials");
  }
  try {
    const student = await prisma.student.findUnique({
      where: {
        regNo: regNo,
        password: password,
      },
    });
    if (!student) {
      return res.status(401).json({ message: "Student doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
