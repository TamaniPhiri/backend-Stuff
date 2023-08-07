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

exports.getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        regNo: "asc",
      },
    });

    // Convert BigInt values to strings
    const studentsWithConvertedBigInt = students.map((student) => ({
      ...student,
      regNo: student.regNo.toString(),
    }));
    res.status(200).json(studentsWithConvertedBigInt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.createResult = async (req, res) => {
  const { studentId, moduleCodes, gpa } = req.body;

  try {
    // Find the student
    const student = await prisma.student.findUnique({
      where: { regNo: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the modules based on the provided codes
    const modules = await prisma.module.findMany({
      where: { code: { in: moduleCodes } },
    });

    if (modules.length !== moduleCodes.length) {
      return res.status(404).json({ message: "Some modules not found" });
    }

    // Create a new result
    const result = await prisma.results.create({
      data: {
        student: {
          connect: { regNo: studentId }, // Connect to the existing student
        },
        module: {
          connect: modules.map((module) => ({ id: module.id })), // Connect to existing modules
        },
        gpa,
      },
      include: {
        student: true,
        module: true,
      },
    });

    res.status(200).json({ message: "Result created successfully", result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
