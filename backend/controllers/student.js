const Student = require("../models/Students");
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone')

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

    const filename = req.file ? req.file.filename : null;

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
        avatar: filename ? `../uploads/${filename}` : null,
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
    const { name, lastname, fathername, selectDirections, passportNumber, limit, page } = req.query;
    console.log(req.query);

    const orConditions = [];

    if (name) {
      orConditions.push({
        name: { $regex: `.*${name}.*`, $options: "i" },
      });
    }

    if (lastname) {
      orConditions.push({
        lastname: { $regex: `.*${lastname}.*`, $options: "i" },
      });
    }

    if (fathername) {
      orConditions.push({
        fathername: { $regex: `.*${fathername}.*`, $options: "i" },
      });
    }

    if (selectDirections) {
      orConditions.push({
        selectDirections: { $regex: `.*${selectDirections}.*`, $options: "i" },
      });
    }

    if (passportNumber) {
      orConditions.push({
        passportNumber: { $regex: `.*${passportNumber}.*`, $options: "i" },
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
      const { limit, page, status } = req.query;
      const offset = (page - 1) * limit;
      let filterParams = {}

      if(status === 'Studies' || status === 'Expelled' || status === 'Graduated'){
        filterParams.status = status
      } else {
        delete filterParams.status
      }

      const totalCount = await Student.countDocuments(filterParams);
      const studiesTotalCount = await Student.countDocuments({status: 'Studies'});
      const expelledTotalCount = await Student.countDocuments({status: 'Expelled'});
      const graduatedTotalCount = await Student.countDocuments({status: 'Graduated'});
      const students = await Student.find(filterParams)
        .sort({ lastname: "asc", test: -1 })
        .skip(offset)
        .limit(limit || 10);
      const result = {
        data: students,
        count: students.length,
        totalCount: totalCount,
        limit: limit,
        page: page,
        studiesTotalCount: studiesTotalCount,
        expelledTotalCount: expelledTotalCount,
        graduatedTotalCount: graduatedTotalCount,
      };
      res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении данных");
      res.status(500).json({ error: error.message, message: "Ошибка сервера" });
    }
  }

  async deleteStudents(req, res) {
    try {
      const students = await Student.findOne({
        _id: ObjectId("678f9eb374d4d9a1bf588c0f"),
      }).deleteOne();
      res.status(200).json(students);
    } catch (error) {
      console.error("Ошибка при получении данных");
      res.status(500).json({ error: error.message, message: "Ошибка сервера" });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Студент не найден" });
      }
  
      res.json({ message: "Статус обновлен", student: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера", error });
    }
  }

  async exportStudents(req, res) {
    const students = await Student.find().sort({ lastname: "asc", test: -1 })
    if(students.length < 1){
      return
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Students')

    worksheet.columns = [
      { header: '№', key: 'index', width: 10 },
      { header: 'Name', key: 'name', width: 15 },
      { header: 'Lastname', key: 'lastname', width: 15},
      { header: 'Fathername', key: 'fathername', width: 15},
      { header: 'Phone Number', key: 'phoneNumber', width: 15},
      { header: 'Gender', key: 'gender', width: 15},
      { header: 'Date of Birth', key: 'dateofBirth', width: 15},
      { header: 'Email', key: 'email', width: 30},
      { header: 'Territory', key: 'territory', width: 45},
      { header: 'Passport Seria', key: 'passportSeria', width: 15},
      { header: 'Passport Number', key: 'passportNumber', width: 15},
      { header: 'Select Directions', key: 'selectDirections', width: 45},
      { header: 'Status', key: 'status', width: 45},
    ];

    students.forEach((student, i) => {
      worksheet.addRow({
        index: i + 1,
        name: student.name, 
        lastname: student.lastname,
        fathername: student.fathername,
        phoneNumber: student.phoneNumber,
        gender: student.gender,
        dateofBirth: student.dateofBirth,
        email: student.email,
        territory: student.territory,
        passportSeria: student.passportSeria,
        passportNumber: student.passportNumber,
        selectDirections: student.selectDirections,
        status: student.status,
      })
    })

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
        'Content-Disposition',
        `attachment; filename="students_${moment().format('DD-MM-YYYY-HH:MM')}.xlsx"`
    );

    res.send(Buffer.from(buffer))
  }
}

module.exports = new StudentsController();
