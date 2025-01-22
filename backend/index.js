require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const studentsRouter = require("./routes/students");
const usersRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5501'], // Укажи адрес фронтенда
  methods: ['GET', 'POST'],         // Разрешённые методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
}))

app.use("/api/students", studentsRouter);
app.use("/api/users", usersRouter);

mongoose.connect(process.env.MONGO_URL);
app.listen(process.env.PORT || 5500, () => {
  console.log(`Server started on ${process.env.PORT || 5500}`);
});
