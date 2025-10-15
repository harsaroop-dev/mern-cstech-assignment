const express = require("express");
const router = express.Router();
const { createAgent, getAllAgents } = require("../controllers/agentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createAgent);

router.get("/", protect, getAllAgents);

module.exports = router;
