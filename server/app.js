
const express = require('express');
const booksRouter = require('./routes/bookRouter');
const globalErrorHandler = require('./controllers/errorController');
const CustomError = require('./utils/CustomError');
const morgan = require('morgan');

let app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', booksRouter);

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`);
    next(err);
})

app.use(globalErrorHandler);

module.exports=app;