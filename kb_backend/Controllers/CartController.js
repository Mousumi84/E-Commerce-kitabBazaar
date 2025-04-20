const { displayCartModel, addToCartModel, removeFromCartModel, noCartModel } = require("../Models/CartModel");

const displayCartController = async (req,res) => {
    const userId = req.user.data._id;

    try {
        const response = await displayCartModel({userId});

        return res.send({
            status:200,
            message:"Display Cart",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const addToCartController = async (req,res) => {
    const userId = req.user.data._id;
    const userName = req.user.data.name;
    const userEmail = req.user.data.email;
    const bookId = req.query.bookid;
    
    try {
        const response = await addToCartModel({userId,userName,userEmail,bookId});

        return res.send({
            status:200,
            message:"Add To Cart",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const removeFromCartController = async (req,res) => {
    const userId = req.user.data._id;
    const bookId = req.query.bookid;

    try {
        const response = await removeFromCartModel({userId,bookId});

        return res.send({
            status:200,
            message:"Remove From Cart",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const noCartController = async (req,res) => {
    const userId = req.user.data._id;

    try {
        const response = await noCartModel({userId});

        return res.send({
            status:200,
            message:"No Cart",
           // data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



module.exports = {displayCartController,addToCartController,removeFromCartController,noCartController};