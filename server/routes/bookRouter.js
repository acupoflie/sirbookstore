
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.route('/books').get(booksController.getAllBooks);
router.route('/book/:id').get(booksController.getBook);
router.route('/addBook').post(booksController.addBook);
router.route('/deleteBook/:id').delete(booksController.deleteBook);

module.exports=router;