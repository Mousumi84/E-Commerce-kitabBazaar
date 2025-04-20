const mongoose=require("mongoose");
const { compassConnection } = require("../db");

const schema=mongoose.Schema;

const booksSchema = new schema({},{strict:false});

const BooksSchema = compassConnection.model("books", booksSchema);

module.exports = BooksSchema;