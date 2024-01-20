

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
let app = require('./app');

mongoose.connect(process.env.CON_STR).then((conn) => {
    console.log('db connection successful')
})

app.listen(process.env.PORT || 3355, () => {
    // console.log(process.env);
    console.log("Server has started");
})
