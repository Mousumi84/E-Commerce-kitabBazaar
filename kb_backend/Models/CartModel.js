const BooksSchema = require("../Schemas/BooksSchema");
const CartSchema = require("../Schemas/CartSchema");

const displayCartModel = ({userId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response = await CartSchema.findOne({userId:userId});

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



const addToCartModel = ({userId,userName,userEmail,bookId}) => {
    return new Promise(async (resolve,reject) => {
       
        try {
            const existingEntry  = await CartSchema.findOne({userId:userId});
  
            const response = await BooksSchema.findOne({_id : bookId});
           
            if(!existingEntry) { 
                const cartObj = new CartSchema({
                    userId : userId,
                    userName : userName,
                    userEmail : userEmail,
                    books : [response] 
                });
               
                const result = await cartObj.save();
               
                resolve(result);
            }
            else {
                existingEntry.books.push(response);
                const result = await existingEntry.save();
            
                resolve(result);
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}



const removeFromCartModel = ({userId,bookId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const existingEntry  = await CartSchema.findOne({userId:userId});

            if(existingEntry) {
                const BookIdIndex = existingEntry.books.findIndex(book => book._id.toString() === bookId.toString());
                console.log(BookIdIndex);
                
                if(BookIdIndex !== -1) {
                    existingEntry.books.splice(BookIdIndex,1);
                    const updateLikeBook = await existingEntry.save();
        
                    resolve(updateLikeBook);
                }
                reject("No Book Fond");
            }

            reject("No User entry Fond");
        } catch (error) {
            reject(error);
        }
    });
}



const noCartModel = ({userId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const existingEntry  = await CartSchema.findOneAndDelete({userId:userId});

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {displayCartModel,addToCartModel,removeFromCartModel,noCartModel};