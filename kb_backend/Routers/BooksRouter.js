const express = require('express');
const { displayallBooksController, filterBooksController, bookController, searchBookController } = require('../Controllers/BooksController');
const BooksRouter = express.Router();

BooksRouter.get('/displayallBooks',displayallBooksController);
BooksRouter.get('/filterBooks',filterBooksController);
BooksRouter.get('/book',bookController);
BooksRouter.get('/search-book',searchBookController);


//BooksRouter.post('/rate',rateController);

module.exports = BooksRouter;