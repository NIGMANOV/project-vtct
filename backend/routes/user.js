const router = require("express").Router();
const controller = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.post("/login", controller.login);
router.post("/", controller.create);
router.get("/me", authMiddleware, controller.getMe);

module.exports = router;
