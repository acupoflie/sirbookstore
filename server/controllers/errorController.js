const CustomError = require("../utils/CustomError")

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}

const prodErrors = (res, error) => {
    if(error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later.'
        })
    }
}

const ValidationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errMessages = errors.join('. ');
    const msg = `Invalid input data: ${errMessages}`;

    return new CustomError(msg, 400);
}

const handleJWTError = (err) => {
    return new CustomError('Invalid JSON token. Please log in again.', 401);
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'errorr';

    if(process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === 'production') {
        if(error.name === 'ValidatorError') error = ValidationErrorHandler(error);
        if(error.name === 'JsonWebTokenError') error = handleJWTError(error);

        prodErrors(res, error);
    }

}