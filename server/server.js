require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoDB = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DB
  + '?retryWrites=true&w=majority';
const cors = require("cors");

mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Routers
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const tokenRouter = require('./routes/token');
const postingsRouter = require('./routes/postings');

app.options("*", cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/token', tokenRouter);
app.use('/postings', postingsRouter);

// Define app port
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
