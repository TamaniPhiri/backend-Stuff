-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "regNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "studentPassword" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_studentPassword_key" ON "Lecture"("studentPassword");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_password_fkey" FOREIGN KEY ("password") REFERENCES "Lecture"("studentPassword") ON DELETE RESTRICT ON UPDATE CASCADE;
