const express = require("express");
const logger = require("./middleware/logger");
const validateContentType = require("./middleware/validateContentType");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(logger);
app.use(validateContentType);

app.use("/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});