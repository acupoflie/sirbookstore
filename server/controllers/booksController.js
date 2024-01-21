
const Book = require('./../models/bookModel');
const CustomError = require('./../utils/CustomError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const BookApiFeatures = require('../utils/BookApiFeatures');

exports.getAllBooks = asyncErrorHandler(async (req, res, next) => {

    const features = new BookApiFeatures(Book.find(), req.query)
        .filter()
        .sort();

    // console.log(features)

    const books = await features.query;

    res.status(200).json({
        status: "success",
        length: books.length,
        data: {
            books
        }
    })
})

exports.getBook = asyncErrorHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            book
        }
    })
});

exports.addBook = asyncErrorHandler(async (req, res, next) => {
    const book = await Book.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            book
        }
    })
});

exports.deleteBook = asyncErrorHandler(async (req, res, next) => {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        data: null
    })
});

exports.updateBook = asyncErrorHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: "success",
        data: {
            book
        }
    });
});