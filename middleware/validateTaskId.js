function validateTaskId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Task ID must be a positive integer" });
  }

  req.taskId = id;
  next();
}

module.exports = validateTaskId;