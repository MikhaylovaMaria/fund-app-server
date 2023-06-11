const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router({ mergeParams: true });

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images",
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});


router.post("/", upload.single("image"), async (req, res) => {
  const filedata = req.file;
  if (!filedata) res.status(403).json({ message: "Неверный формат файла!" });
  return res.json({ url: req.file.path });
});

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/", upload.single("image"), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname}`,
//   });
// });

module.exports = router;
