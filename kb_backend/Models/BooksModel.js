const BooksSchema = require("../Schemas/BooksSchema");

const allBooksModel = ({SKIP,LIMIT}) => {
    return new Promise (async (resolve, reject) => {
        
        try {
            const response = await BooksSchema.aggregate([
                {
                    $skip : SKIP
                },
                {
                    $limit : LIMIT
                }
            ]);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



const filterBooksModel = ({SKIP,Language,Category,PriceGT,PriceLT,Rate,LIMIT}) => {
    return new Promise (async (resolve, reject) => {
        
        try {
            const matchCriteria = {};

            if (Array.isArray(Language) && Language.length > 0) {
                matchCriteria.Language = { $in: Language };
            }

            if (Array.isArray(Category) && Category.length > 0) {
                matchCriteria.Category = { $in: Category};
            }

            if (PriceGT !== undefined && PriceLT !== undefined) {
                matchCriteria.Price = { $gte: PriceGT, $lt: PriceLT };
            } else if(PriceGT !== undefined) {
                matchCriteria.Price = {$gte: PriceGT};
            } else if (PriceLT !== undefined){
                matchCriteria.Price = {$lt: PriceLT};
            }

            if (Rate !== undefined && Rate !== null) {
                matchCriteria.Rating = { $gte: Rate };
            }

            const response = await BooksSchema.aggregate([
                {
                    $match : matchCriteria
                },
                {
                    $sort: { Price: 1 }
                },                
                {
                    $skip : SKIP
                },
                {
                    $limit : LIMIT
                }
            ]);
            resolve(response);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}



const bookModel = ({bookId}) => {
    return new Promise (async (resolve, reject) => {
        
        try {
            const response = await BooksSchema.findById({_id : bookId});
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



const searchBookModel = ({search}) => { 
    return new Promise (async (resolve, reject) => {
        
        try {
            const response = await BooksSchema.find({Title : {$regex: search, $options: 'i'}});   //{$regex: search, $options: 'i'}

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {allBooksModel,filterBooksModel,bookModel,searchBookModel};


/*
const rateModel = () => {
    return new Promise (async (resolve, reject) => {
        
        try {
            const response = await BooksSchema.find({ Rating: { $regex: "^[0-9](\\.[0-9])$", $options: "i" } }
            );

            let ar=response.map(res => res.Rating);
            console.log(ar);

            ar.forEach(async (res) => {
                console.log("res =>",res);
                let rate=Number(res);
                console.log(rate);

                const up=await BooksSchema.updateMany(
                    {Rating: res}, 
                    [
                        {
                            $set: {
                                Rating: rate
                            }
                        }
                    ]
                );

                    console.log(up);

                    
            });


            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}
*/