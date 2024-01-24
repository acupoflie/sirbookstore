
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const authController = require('../controllers/authController');

router.route('/books')
    .get(authController.protect, booksController.getAllBooks)
    .post(booksController.addBook);

router.route('/book/:id')
    .get(booksController.getBook)
    .delete(booksController.deleteBook)
    .patch(booksController.updateBook);

module.exports=router;