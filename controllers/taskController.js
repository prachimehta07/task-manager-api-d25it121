const { tasks, getNextId } = require("../data/tasks");

function getAllTasks(req, res) {
  res.status(200).json(tasks);
}

function createTask(req, res) {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: getNextId(),
    title,
    completed: completed ?? false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const task = tasks.find((t) => t.id === req.taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
}

function deleteTask(req, res) {
  const index = tasks.findIndex((t) => t.id === req.taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted" });
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };