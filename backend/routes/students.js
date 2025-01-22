const router = require("express").Router();
const controller = require("../controllers/student");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, controller.create);
router.get("/search", controller.search);

module.exports = router;
