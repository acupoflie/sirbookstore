
const express = require('express');
const booksRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const CustomError = require('./utils/CustomError');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({origin: 'http://localhost:3001'}))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); 
//     res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
//     next();
//   });

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', booksRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`);
    next(err);
})

app.use(globalErrorHandler);

module.exports=app;