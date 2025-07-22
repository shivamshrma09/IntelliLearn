const studentModel = require("../models/student.models");

module.exports.createStudent = async ({ name, email, password, course }) => {
  if (!name || !email || !password || !course) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await studentModel.hashPassword(password);
  const student = await studentModel.create({
    name,
    email,
    password,
    course,
  });
  return student;
};
