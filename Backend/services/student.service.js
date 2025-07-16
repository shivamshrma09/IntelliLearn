const studentModel = require("../models/student.models");

module.exports.createStudent = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await studentModel.hashPassword(password);
  const student = await studentModel.create({
    name,
    email,
    password,
  });
  return student;
};
