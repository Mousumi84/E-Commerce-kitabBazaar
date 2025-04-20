const mongoose=require("mongoose");
const { atlasConnection } = require("../db");

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

const LikedBookSchema = atlasConnection.model("LikedBook",userLikedBook);

module.exports = LikedBookSchema; 