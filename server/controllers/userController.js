
const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const authController = require('./authController');
const CustomError = require('../utils/CustomError');
const createSendResponse = require('../utils/jwtSignHandler');

const filterFields = (obj, ...allowedFields) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
        if(allowedFields.includes(prop)) newObj[prop] = obj[prop];
    });
    return newObj;
}

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    if(!(await user.comparePasswordInDb(req.body.currentPassword, user.password))) {
        next(new CustomError('Current password is wrong!', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    createSendResponse(user, 201, res);
})

exports.updateMe = asyncErrorHandler(async (req, res, next) => {
    if(req.body.password || req.body.confirmPassword) {
        next(new CustomError('You can change password from here', 400));
    }

    const filteredObj = filterFields(req.body, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user._id, filteredObj, {runValidators: true, new: true})

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })

});

