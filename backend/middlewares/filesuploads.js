const multer = require("multer");
const upload = multer({ desc: "/uploads" });

function filesUploads(req, res, next) {
  upload.single('avatar');
  console.log(req);
}

module.exports = filesUploads;
