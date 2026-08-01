function validateContentType(req, res, next) {
  const needsBody = req.method === "POST" || req.method === "PUT";

  if (needsBody && req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ error: "Content-Type must be application/json" });
  }

  next();
}

module.exports = validateContentType;