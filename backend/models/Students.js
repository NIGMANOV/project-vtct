const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentsSchema = new Schema({
  name: {
    type: String,
    required: [true, "name не должен быть пустым"],
  },
  lastname: {
    type: String,
    required: [true, "lastname не должен быть пустым"],
  },
  fathername: {
    type: String,
    required: [true, "fathername не должен быть пустым"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone Number не должен быть пустым"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dateofBirth: {
    type: String,
    required: [true, "Date of Birth не должен быть пустым"],
  },
  email: {
    type: String,
    unique: true,
  },
  territory: {
    type: String,
    required: [true, "Territory не должен быть пустым"],
  },
  passportSeria: {
    type: String,
    required: [true, "passport Seria не должен быть пустой"],
  },
  passportNumber: {
    type: Number,
    required: [true, "passport Number не должнен быть пустой"],
    unique: true,
  },
  selectDirections: {
    type: String,
    required: [true, "select Directions не должнен быть пустой"],
  },
});

const Student = mongoose.model("students", studentsSchema);

module.exports = Student;
