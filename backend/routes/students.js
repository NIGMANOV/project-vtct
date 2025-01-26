const router = require("express").Router();
const controller = require("../controllers/student");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, controller.create);
router.get("/search", controller.search);
router.get("/getAll", controller.getAll);
router.delete("/delete", controller.deleteStudents);

module.exports = router;
