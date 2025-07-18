const studentModel = require("../models/student.models");

module.exports.createStudent = async ({ name, email, password , cource }) => {
  if (!name || !email || !password || !cource) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await studentModel.hashPassword(password);
  const student = await studentModel.create({
    name,
    email,
    password,
    cource, 
  });
  return student;
};
