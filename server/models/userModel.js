
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required fields'],
        minlength: [3, 'Name must be over than 3 char'],
        maxlength: [20, 'Name should be lower than 20 char'],
        unique: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please enter a valid email'],
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        min: 8,
        max: 100,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === this.password
            },
            message: 'Password with confirm password does not match'
        } 
    },
    photo: String,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    role: {
        type: String,
        required: [true, 'Role is required field'],
        enum: ['user', 'admin'],
        default: 'user'
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    
    next()
});

userSchema.methods.comparePasswordInDb = async function(pswd, pswdDb) {
    return await bcrypt.compare(pswd, pswdDb);
}

userSchema.methods.generateRandomPasswordToken = function(pass) {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000;

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
}

const User = mongoose.model('user', userSchema);

module.exports=User;