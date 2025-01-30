const router = require("express").Router();
const controller = require("../controllers/student");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, controller.create);
router.get("/search", authMiddleware, controller.search);
router.get("/getAll", authMiddleware, controller.getAll);
router.delete("/delete", authMiddleware, controller.deleteStudents);

module.exports = router;
