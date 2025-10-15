const express = require("express");
const router = express.Router();

const {
  uploadAndDistribute,
  getTasks,
} = require("../controllers/listController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/upload", protect, upload.single("file"), uploadAndDistribute);

router.get("/", protect, getTasks);

module.exports = router;
