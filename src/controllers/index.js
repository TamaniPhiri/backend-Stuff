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
    const { regNo, name, code, grade, gpa } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { regNo },
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await prisma.results.create({
            data: {
                student: {
                    connect: { regNo },
                },
                name,
                code,
                grade,
                gpa,
            },
            include: {
                student: true,
            },
        });

        res.status(200).json({ message: "Result created successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
};
