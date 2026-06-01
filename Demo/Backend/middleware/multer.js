const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.fieldname, "uploaded file");

    if (file.fieldname === "image") {
      cb(null, "uploads/products");
    }

    else if (file.fieldname === "profileImage") {
      cb(null, "uploads/profiles");
    }

    else {
      cb(null, "uploads/others");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

module.exports = upload;