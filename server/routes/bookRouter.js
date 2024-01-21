
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.route('/books')
    .get(booksController.getAllBooks)
    .post(booksController.addBook);

router.route('/book/:id')
    .get(booksController.getBook)
    .delete(booksController.deleteBook)
    .patch(booksController.updateBook);

module.exports=router;