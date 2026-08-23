function validateTask(req, res, next) {
  const { title } = req.body;

  if (req.method === "POST" && (!title || !title.trim())) {
    return res.status(400).json({ error: "Title is required" });
  }

  next();
}

module.exports = validateTask;