const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentsSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email не должен быть пустым'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'name не должен быть пустым'],
  },
  lastname: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

const Student = mongoose.model("students", studentsSchema);

module.exports = Student;
