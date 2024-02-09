
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

const createSendResponse = (user, statusCode, res) => {
    const token = signToken(user._id);
    console.log(token)

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

module.exports = createSendResponse;