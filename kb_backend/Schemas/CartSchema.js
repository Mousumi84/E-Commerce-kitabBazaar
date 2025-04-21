const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const Cart = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "UserSchema",
        unique: true
    },
    userName: {
        type:String,
        required:true,
    },
    userEmail: {
        type:String,
        required:true,
    },
    books: []                  
    /*  bookId,
        name,
        author,
        price,
        coverImage,...*/
});

const CartSchema = mongoose.model("Cart",Cart);

module.exports = CartSchema; 