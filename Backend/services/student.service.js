const studentModel = require("../models/student.models");

module.exports.createStudent = async ({ name, email, password, course }) => {
  if (!name || !email || !password || !course) {
    throw new Error("All fields are required");
  }

  const student = await studentModel.create({
    name,
    email,
    password, // Already hashed in controller
    course,
  });
  return student;
};
