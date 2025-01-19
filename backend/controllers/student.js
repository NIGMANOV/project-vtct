const Student = require("../models/Students");

class StudentsController {
  async create(req, res) {
    const { email, gender, name, lastname, fathername } = req.body;
    const { roles } = req.user;
    if (!roles || roles !== "superadmin") {
      return res.status(403).json({ message: "Forbidden resourse" });
    }
    try {
      const candidate = await Student.findOne({ email: email });
      console.log(candidate);

      if (candidate) {
        return res.status(400).json({ message: "Почту нельзя использовать" });
      }

      const studentData = {
        email: email,
        gender: gender,
        name: name,
        lastname: lastname,
        fathername: fathername,
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
      const offset = (page - 1) * limit
      const students = await Student.find(searchOptions).skip(offset).limit(limit || 5);

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
}

module.exports = new StudentsController();
