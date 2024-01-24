
const User = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

const createSendResponse = (user, statusCode, res) => {
    const token = signToken(user._id);

    let options = {
        expiresIn: process.env.LOGIN_EXPIRES,
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    user.password = undefined;

    res.cookie('jwt', token, options);

    res.status(statusCode).json({
        status: 'successful',
        token,
        data: {
            user
        }
    })
}

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    createSendResponse(newUser, 201, res);
});

exports.login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        const error = new CustomError('Please provide email and password', 400);
        next(error);
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(user.comparePasswordInDb(password, user.password))) {
        const error = new CustomError('Email or password incorrect', 401);
        next(error);
    };

    createSendResponse(user, 200, res);
});

exports.protect = asyncErrorHandler(async (req, res, next) => {

    // 1. Reading token

    const token = req.cookies.jwt;

    // if(testToken && testToken.startsWith('Bearer')) {
    //     token = testToken.split(' ')[1];
    // };

    if(!token) {
        const error = new CustomError('You are not logged in!', 401);
        next(error);
    }

    // 2. validate token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log(decodedToken);

    // 3. if user exists
    const user = await User.findById(decodedToken.id)

    // 4. if user changed pass after token was made

    // 5. allow the route
    req.user = user;
    next();
})