// backend/routes/listRoutes.js
const express = require("express");
const router = express.Router();
const { uploadAndDistribute } = require("../controllers/listController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/upload", protect, upload.single("file"), uploadAndDistribute);

module.exports = router;
