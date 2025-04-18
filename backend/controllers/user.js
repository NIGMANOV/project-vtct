const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  async create(req, res) {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const { email, fullname, password } = req.body;
    
    try {
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "Почту нельзя использовать" });
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const userData = {
        email: email,
        fullname: fullname,
        password: hashPassword,
        roles: "admin",
      };

      const user = await User.create(userData);
      const token = await jwt.sign(
        { id: user._id, roles: user.roles },
        process.env.JWT_SECRET
      );
      res.status(201).json({ message: "ok", jwt: token });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Ошибка сервера" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const candidate = await User.findOne({ email: email });
      if (!candidate) {
        return res.status(400).json({ message: "Почта или пароль не верны" });
      }
      const checkPass = bcrypt.compare(password, candidate.password);

      if (!checkPass) {
        return res.status(400).json({ message: "Почта или пароль не верны" });
      }
      const token = await jwt.sign(
        { id: candidate._id, roles: candidate.roles },
        process.env.JWT_SECRET
      );
      res.status(200).json({ message: "ok", jwt: token });
    } catch (error) {}
  }

  async getMe(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Такого пользователя не существует" });
      }

      return res.status(200).json({ message: "ok", user });
    } catch (error) {}
  }
}

module.exports = new UserController();
