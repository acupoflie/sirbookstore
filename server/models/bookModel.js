

const mongoose = require('mongoose');
const fs = require('fs');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required field'],
        maxlength: [80, 'Book name cant be over 80 chars'],
        minlength: [2, 'Book name cant be lower than 2 chars'],
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, 'The author is required field'],
        minlength: [3, 'The author name must be over than 3 characters'],
        maxlength: [30, 'The author name should be lower than 30 characters'],
        trim: true
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required field'],
        minlength: [3, 'The publisher name must be over than 3 characters'],
        maxlength: [30, 'The publisher name should be lower than 30 characters'],
        trim: true
    },
    publishDate: {
        type: Date
    },
    image: String,
    description: {
        type: String,
        required: [true, 'The description is required field'],
        maxlength: [2000, 'Description must be lower than 2000 characters'],
        trim: true
    },
    pageCount: {
        type: Number,
        maxlength: 2000
    },
    price: {
        type: Number,
        min: 1,
        max: 10000
    },
    genres: {
        type: [String],
        // required: [true, 'Genres is required field'],
        enum: {
            values: ['Drama', 'Romance', 'Thriller', 'Dedective', 'Fiction', 'Historical fiction', 'Historical novel', 'Science fiction', 'Novel', 'Mystery', 'History', 'Fantasy', 'Humor', 'Crime', 'Adventure', 'Horror', 'Western fiction', 'Autobiography', 'Philosophy', 'Sosial science', 'Philosophical fiction', 'Psychological thriller', 'Suspense'],
            message: 'This genre does not exist'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    ratings: Number,
    totalRating: Number,
    saleStatus: {
        type: String,
        required: [true, 'You must provide status of sale'],
        enum: {
            values: ['On Sale', 'Sold out']
        }
    },
    quantity: {
        type: Number,
        select: false
    },
    language: {
        type: String,
        required: [true, 'Language is required fields'],
        minlength: [3, 'Language must be over than 3 characters'],
        maxlength: [30, 'Language should be lower than 30 characters']
    }
});

bookSchema.pre(/^find/, function(next) {
    this.startTime = Date.now();
    next();
});

bookSchema.post(/^find/, function(docs, next) {
    this.endTime = Date.now();
    const content = `Query took ${this.endTime - this.startTime} milliseconds to fetch all the documents \n`;
    fs.writeFileSync('./log/log.txt', content, {flag: 'a'}, err => console.log(err));
    next();
})

const Book = mongoose.model('book', bookSchema);

module.exports=Book;