const mongoose=require("mongoose");

const schema=mongoose.Schema;

const booksSchema = new schema({},{strict:false});

const BooksSchema = mongoose.model("books", booksSchema);

module.exports = BooksSchema;