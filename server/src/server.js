require('dotenv').config();
const app = require('./app')

// Define app port
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
