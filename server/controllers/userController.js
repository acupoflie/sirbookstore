
const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
})