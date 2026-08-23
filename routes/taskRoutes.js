const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const validateTaskId = require("../middleware/validateTaskId");
const validateTask = require("../middleware/validateTask");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getAllTasks);
router.get("/:id", validateTaskId, getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTaskId, updateTask);
router.delete("/:id", validateTaskId, deleteTask);

module.exports = router;