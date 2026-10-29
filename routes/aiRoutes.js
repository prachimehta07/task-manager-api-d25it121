const express = require("express");
const router = express.Router();
const { generateSubtasks } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/subtasks", authMiddleware, generateSubtasks);

module.exports = router;