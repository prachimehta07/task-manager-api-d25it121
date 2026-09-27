const Task = require("../models/Task");
const cache = require("../config/cache");

let hits = 0;
let misses = 0;

function allTasksKey(userId) {
  return `tasks_all_${userId}`;
}

function singleTaskKey(userId, taskId) {
  return `task_${userId}_${taskId}`;
}

async function getAllTasks(req, res, next) {
  try {
    const key = allTasksKey(req.user.id);
    const cached = cache.get(key);

    if (cached) {
      hits++;
      return res.status(200).json(cached);
    }

    misses++;
    const tasks = await Task.find({ user: req.user.id });
    cache.set(key, tasks);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const key = singleTaskKey(req.user.id, req.params.id);
    const cached = cache.get(key);

    if (cached) {
      hits++;
      return res.status(200).json(cached);
    }

    misses++;
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    cache.set(key, task);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    cache.del(allTasksKey(req.user.id));
    res.status(201).json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    cache.del(allTasksKey(req.user.id));
    cache.del(singleTaskKey(req.user.id, req.params.id));

    res.status(200).json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    cache.del(allTasksKey(req.user.id));
    cache.del(singleTaskKey(req.user.id, req.params.id));

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
}

function getCacheStats(req, res) {
  res.status(200).json({ hits, misses });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getCacheStats,
};