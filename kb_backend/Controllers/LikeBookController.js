const { likeBooksModel, unlikeBooksModel, displayLikedBooksModel } = require("../Models/LikeBookModel");

const displayLikedBookController = async (req,res) => {
    const useremail = req.user.data.email;

    try {
        const response = await displayLikedBooksModel({useremail});

        return res.send({
           status:200,
           message:"Display liked Book",
           data:response,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
    }
}



const likeBookController = async (req,res) => {
    const useremail = req.user.data.email;
    const bookId = req.query.bookid;
    try {
        const response = await likeBooksModel({bookId,useremail});

        return res.send({
           status:200,
           message:"like Book",
           data:response,
       });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
    }
}



const unlikeBookController = async (req,res) => {
    const useremail = req.user.data.email;
    const bookId = req.query.bookid;
    try {
        const response = await unlikeBooksModel({bookId,useremail});

        return res.send({
           status:200,
           message:"Unlike Book",
           data:response,
       });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
    }
}



module.exports = { displayLikedBookController,likeBookController,unlikeBookController};