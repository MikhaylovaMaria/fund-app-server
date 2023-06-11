const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const routes = require("./routes");

const initDatabase = require("./startUp/initDatabase");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/upload", express.static("uploads"));

// app.use("/api", routes);

// const PORT = process.env.PORT || 8080;
const PORT = 4000;

// async function start() {
//   try {
//     mongoose.connection.once("open", () => {
//       initDatabase();
//     });
//     await mongoose.connect(config.get("mongoUri"));
//     app.listen(PORT, () => {
//       console.log(chalk.green(`Server started on port:${PORT}`));
//     });
//   } catch (error) {
//     console.log(chalk.red(e.message));
//     process.exit(1);
//   }
// }
// start();
app.listen(PORT, () => {
  console.log(chalk.green(`Server started on port:${PORT}`));
});

app.get("/", (req, res) => {
  res.send("HEELOW");
});

module.exports = app;

// "scripts": {
//   "start": "cross-env NODE_ENV=production node app.js",
//   "serve": "cross-env NODE_ENV=development nodemon app.js"
// },
