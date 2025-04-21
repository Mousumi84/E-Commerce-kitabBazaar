const mongoose=require("mongoose");
const { mongoose } = require("../db");

const Schema = mongoose.Schema;

const userLikedBook = new Schema({
    email: {
        type:String,
        required:true,
        unique:true,
    },
    books: [
        {
            type: Schema.Types.ObjectId,
        }
    ]
});

const LikedBookSchema = mongoose.model("LikedBook",userLikedBook);

module.exports = LikedBookSchema; 