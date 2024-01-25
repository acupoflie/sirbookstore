
const User = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const util = require('util');
const createSendResponse = require('../utils/jwtSignHandler');
const emailjs = require('../utils/email');
const sendMail = require('../utils/email');
const crypto = require('crypto');

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
});

exports.restrict = function(role) {
    return (req, res, next) => {
        if(req.user.role !== role) {
            const error = new CustomError('You dont have permission to perform this action', 400);
            next(error);
        }
        next();
    }
};

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    // FIND USER
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        next(new CustomError('Could find user with given email', 404));
    }

    // GENERATE RESET PASS TOKEN
    const resetToken = user.generateRandomPasswordToken();
    await user.save({validateBeforeSave: false});

    // SEND TOKEN TO THE USER
    const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`;
    const message = `You have received reset password mail. Please the click below to reset your password \n\n${resetUrl}`;

    try {
        await sendMail({
            email: user.email,
            subject: 'Forgot password mail received.',
            message
        });

        res.status(200).json({
            status: "success",
            message: "Forgot password message sent to the user email."
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({validateBeforeSave: false});

        next(error);
    }
});


exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}});

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    createSendResponse(user, 200, res);
});