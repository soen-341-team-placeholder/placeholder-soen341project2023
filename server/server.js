require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoDB = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DB
  + '?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Routers
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use('/users', userRouter);
app.use('/login', loginRouter);


// Define app port
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
