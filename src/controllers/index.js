const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
    const {regNo,password}= req.body
  try {
    await prisma.student.create({
      data:{
        regNo,
        password
      }
    });
    res.status(200).json({message:"Student created successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
