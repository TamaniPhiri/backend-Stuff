const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
  const { regNo, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const existingStudent = await prisma.student.findUnique({
      where: { regNo },
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with the same regNo already exists" });
    }
    await prisma.student.create({
      data: {
        regNo,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "Student created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
