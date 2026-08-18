const express = require("express");
require("dotenv").config();

const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const validateContentType = require("./middleware/validateContentType");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(validateContentType);

app.use("/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});