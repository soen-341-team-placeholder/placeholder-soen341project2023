require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoDB = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DB
  + '?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true);

// Routers
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const tokenRouter = require('./routes/token');
const subscribeRouter = require('./routes/subscribe');
const postingsRouter = require('./routes/postings');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/token', tokenRouter);
app.use('/subscribe', subscribeRouter);
app.use('/postings', postingsRouter);

// Define app port
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
