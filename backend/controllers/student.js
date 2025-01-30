const Student = require("../models/Students");

class StudentsController {
  async create(req, res) {
    const {
      email,
      gender,
      name,
      lastname,
      fathername,
      passportSeria,
      passportNumber,
      phoneNumber,
      dateofBirth,
      territory,
      selectDirections,
    } = req.body;
    // const { roles } = req.user;
    // if (!roles || roles !== "superadmin") {
    //   return res.status(403).json({ message: "Forbidden resourse" });
    // }
    try {
      const candidate = await Student.findOne({ email: email });
      console.log(candidate);

      if (candidate) {
        return res.status(400).json({ message: "Почту нельзя использовать" });
      }

      const candidatePassport = await Student.findOne({
        passportNumber: passportNumber,
      });

      if (candidatePassport) {
        return res
          .status(400)
          .json({ message: "Этот номер паспорта уже есть в базе данных" });
      }

      const studentData = {
        email: email,
        gender: gender,
        name: name,
        lastname: lastname,
        fathername: fathername,
        passportSeria: passportSeria,
        passportNumber: passportNumber,
        phoneNumber: phoneNumber,
        dateofBirth: dateofBirth,
        territory: territory,
        selectDirections: selectDirections,
      };

      const student = await Student.create(studentData);
      res.status(201).json({ message: "ok", student });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error.message, message: "Ошибка сервера" });
    }
  }

  async search(req, res) {

    

    const { email, name, limit, page } = req.query;
    console.log(req.query);
    

    const orConditions = [];

    if (email) {
      orConditions.push({
        email: { $regex: `.*${email}.*`, $options: "i" },
      });
    }
    if (name) {
      orConditions.push({
        name: { $regex: `.*${name}.*`, $options: "i" },
      });
    }

    const searchOptions = orConditions.length ? { $or: orConditions } : {};

    console.log(JSON.stringify(searchOptions));

    try {
      const totalCount = await Student.countDocuments(searchOptions);
      const offset = (page - 1) * limit;
      const students = await Student.find(searchOptions)
        .skip(offset)
        .limit(limit || 10);

      const result = {
        data: students,
        count: students.length,
        totalCount: totalCount,
        page: page,
      };
      console.log(searchOptions);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const { limit, page } = req.query;
      const offset = (page - 1) * limit;
      const totalCount = await Student.countDocuments()
      const students = await Student.find().sort({lastname: 'asc', test: -1}).skip(offset).limit(limit || 10)
      const result = {
        data: students,
        count: students.length,
        totalCount: totalCount,
        limit: limit,
        page: page,
      }
      res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении данных");
      res.status(500).json({ error: error.message, message: "Ошибка сервера" });
    }
  }

  async deleteStudents(req, res){
    try {
      const students = await Student.findOne({"_id": ObjectId("678f9eb374d4d9a1bf588c0f")}).deleteOne()
      res.status(200).json(students);
    } catch (error) {
      console.error("Ошибка при получении данных");
      res.status(500).json({ error: error.message, message: "Ошибка сервера" });
    }
  }
}

module.exports = new StudentsController();
