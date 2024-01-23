
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }

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

const User = mongoose.model('user', userSchema);

module.exports=User;