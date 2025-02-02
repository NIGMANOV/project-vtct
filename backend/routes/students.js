const router = require("express").Router();
const controller = require("../controllers/student");
const authMiddleware = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Путь к папке uploads/ (на уровень выше + 'uploads')
      const destPath = path.join(__dirname, '../uploads');
  
      // Если надо проверить, что папка существует, лучше проверить или создать её
      // fs.mkdirSync(destPath, { recursive: true }); // при необходимости
  
      // Первый аргумент в cb — ошибка (если есть), или null
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      // Генерируем уникальное имя
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // Берём расширение из оригинального имени
      const ext = path.extname(file.originalname);
      // Итоговое имя файла
      const finalName = file.fieldname + '-' + uniqueSuffix + ext;
  
      cb(null, finalName);
    },
  });

// Создаём экземпляр multer
const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("avatar"), controller.create);
router.get("/search", authMiddleware, controller.search);
router.get("/getAll", authMiddleware, controller.getAll);
router.get("/export", controller.exportStudents)
router.delete("/delete", authMiddleware, controller.deleteStudents);

module.exports = router;
