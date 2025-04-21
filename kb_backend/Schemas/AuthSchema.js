const mongoose=require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    address: [],
    password: {
        type:String,
        required:true,
        select:false,
    }
});

const UserSchema = mongoose.model("user",userSchema);

module.exports =  UserSchema; 