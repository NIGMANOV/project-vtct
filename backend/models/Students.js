const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentsSchema = new Schema({
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
  phoneNumber: {
    type: Number,
    required: [true, 'phoneNumber не должен быть пустым'],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dateofBirth: {
    type: String,
    required: [true, 'dateofBirth не должен быть пустым'],
  },
  email: {
    type: String,
    unique: true,
  },
  territory: {
    type: String,
    required: [true, 'territory не должен быть пустым'],
  },  
  lesson: {
    type: String,
    required: [true, 'lesson не должен быть пустым'],
  },
  passportSeria: {
    type: String,
    required: [true, 'passportSeria не должен быть пустой'],
    unique: true,
  },
  passportNumber: {
    type: Number,
    required: [true, 'passportNumber не должнен быть пустой'],
    unique: true,
  },
  
});

const Student = mongoose.model("students", studentsSchema);

module.exports = Student;
