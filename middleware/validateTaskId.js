const mongoose = require("mongoose");

function validateTaskId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid task ID format" });
  }
  next();
}

module.exports = validateTaskId;