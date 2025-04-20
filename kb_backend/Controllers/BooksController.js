const { allBooksModel, filterBooksModel, bookModel, searchBookModel } = require("../Models/BooksModel");

const displayallBooksController = async (req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    const LIMIT = Number(req.query.limit);
    
    try {
        const response = await allBooksModel({SKIP,LIMIT});

         return res.send({
            status:200,
            message:"Fetched all books successfully",
            data:response,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
};



const filterBooksController = async (req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    const Language = req.query.Language ? req.query.Language.split(",") : [];
    const Category = req.query.Category ? req.query.Category.split(",") : [];
    const PriceGT = Number(req.query.PriceGT);
    const PriceLT = Number(req.query.PriceLT);
    const Rate = Number(req.query.Rate);
    const LIMIT = Number(req.query.limit);

 //   const {Language,Category,PriceGT,PriceLT,Rate} = req.body;
    
    try {
    //    console.log(Language,Category,PriceGT,PriceLT,Rate);
        const response = await filterBooksModel({SKIP,Language,Category,PriceGT,PriceLT,Rate,LIMIT});

         return res.send({
            status:200,
            message:"Filter books ",
            data:response,  
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
};



const bookController = async (req,res) => {
    const bookId = req.query.bookId;
    
    try {
        const response = await bookModel({bookId});

         return res.send({
            status:200,
            message:"Selected Book",
            data:response,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
};



const searchBookController = async (req,res) => {
    const search = req.query.search;
    
    try {
        const response = await searchBookModel({search});

         return res.send({
            status:200,
            message:"Search Book",
            data:response,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
};



module.exports = {displayallBooksController,filterBooksController,bookController,searchBookController};


/*

const rateController = async (req,res) => {
    
    
    try {
        console.log("rate");
        const response = await rateModel();

         return res.send({
            status:200,
            message:"Rate Book",
            data:response,
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:"Internalser",
            error:error,
        });
    }
};

*/