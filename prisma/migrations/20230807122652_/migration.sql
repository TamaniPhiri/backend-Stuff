-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "regNo" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "gpa" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_regNo_key" ON "Student"("regNo");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("regNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_id_fkey" FOREIGN KEY ("id") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
