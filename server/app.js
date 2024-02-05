
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

app.use(cors({origin: 'http://localhost:7777', credentials: true}));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//     next();
// })
// app.use(cors())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace with your client's origin
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Credentials', 'true');
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