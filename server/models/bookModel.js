

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required field'],
        maxlength: [80, 'Book name cant be over 80 chars'],
        minlength: [2, 'Book name cant be lower than 2 chars'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'The author is required field'],
        trim: true
    },
    image: String,
    description: {
        type: String,
        // required: [true, 'The description is required field'],
        trim: true
    },
    price: String,
    genres: {
        type: [String],
        // required: [true, 'Genres is required field'],
        enum: {
            values: ['Drama', 'Romance', 'Thriller', 'Dedective', 'Fiction'],
            message: 'This genre does not exist'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports=Book;