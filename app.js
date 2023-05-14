const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const { movieRouter } = require("./src/routes/movies.router");
const { userRouter } = require("./src/routes/users.router");
const globalErrorHandler = require("./src/utils/errorHandler");


// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then(console.log("Database connection is established successfully"))
  .catch((e) => console.log(e.message));

const app = express();
const port = Number(process.env.PORT) || 4000;
app.use(express.json());
app.use(morgan("tiny"));

// ROUTES
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
