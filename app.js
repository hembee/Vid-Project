const {express} = require("express");
require("dotenv").config();
const { movieRouter } = require("./src/routes/movies.router");
const { userRouter } = require("./src/routes/users.router");

// const mongoose = require("mongoose");

// DATABASE CONNECTION
// mongoose
//   .connect(process.env.MONGODB_CONNECTION_URL)
//   .then(console.log("Database connection is established successfully"))
//   .catch((e) => console.log(e.message));

const app = express();
const port = Number(process.env.PORT) || 4000;
app.use(express.json());

// ROUTES
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);

// GLOBAL ERROR HANDLER
app.use((err, res, req, next) => {
  return res.status(err.status || 400).json({
    message: err.message,
    Status: "Failed",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
