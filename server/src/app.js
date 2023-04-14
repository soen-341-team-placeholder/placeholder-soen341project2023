require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
app.disable("x-powered-by");

// Routers
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const tokenRouter = require("./routes/token");
const postingsRouter = require("./routes/postings");
const subscribeRouter = require("./routes/subscribe");

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/token", tokenRouter);
app.use("/postings", postingsRouter);
app.use("/subscribe", subscribeRouter);

// return backend url
app.use((req, res, next) => {
  const backendUrl = `${req.protocol}://${req.get("host")}:${process.env.PORT}`;
  app.locals.backendUrl = backendUrl;
  console.log(`Backend URL: ${backendUrl}`); // log the backend URL to the console
  next();
});

// Define endpoint to return backend URL
app.get("/backend-url", (req, res) => {
  res.json({ backendUrl: app.locals.backendUrl });
});

module.exports = app;
