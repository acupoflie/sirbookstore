

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3001, () => {
    console.log("front end server has started")
})