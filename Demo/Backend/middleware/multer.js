const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log(file.fieldname,"fee")

    if (file.fieldname === "image") {

      cb(null, "uploads/products");

    }
    

    else if (
      file.fieldname === "profileImage"
    ) {

      cb(null, "uploads/profiles");

    }

  },



  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  },

});

const upload = multer({

  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

});

module.exports = upload;