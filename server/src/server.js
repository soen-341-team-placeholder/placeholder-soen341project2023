const app = require('./app')
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' +
    process.env.MONGO_HOST + '/' + process.env.MONGO_DB + '?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

// Define app port
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
