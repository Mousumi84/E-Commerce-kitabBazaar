const mongoose=require("mongoose");
const { atlasConnection } = require("../db");

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

const UserSchema = atlasConnection.model("user",userSchema);

module.exports =  UserSchema; 