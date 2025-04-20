const LikedBookSchema = require("../Schemas/LikeBookSchema");
const {ObjectId}=require("mongodb");


const displayLikedBooksModel = ({useremail}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const existingEntry  = await LikedBookSchema.findOne({email:useremail});

            if(!existingEntry ) {      
                // if no liked book entry for user
                reject({ message: "No liked books"});
            }             
            
            resolve(existingEntry);
        } catch (error) {
            reject(error);
        }
    });
} 



const likeBooksModel = ({bookId,useremail}) => {
    return new Promise(async (resolve,reject) => {
        const bookid = new ObjectId(bookId);

        try {
            const existingEntry  = await LikedBookSchema.findOne({email:useremail});

            if(!existingEntry ) {      // if no liked book entry for user
                const likeBook = new LikedBookSchema({
                    email : useremail,
                    books : [bookid],
                });

                const likeBookDB = await likeBook.save();
                resolve(likeBookDB);
            }
            else {
                if (!existingEntry.books.some(book => book === bookid)) {
                    // if the book is not present in the liked book list of the user 
                    
                   // console.log(existingEntry);

                    existingEntry.books.push(bookid); // Convert before pushing
                    const updateLikeBook = await existingEntry.save();
                  //  console.log("updateLikeBook =>",updateLikeBook);

                    resolve(updateLikeBook);
                }
                else {
                    // If book is already liked, return a message
                    reject({ message: "Book already liked"});
                }
            }                
        } catch (error) {
            reject(error);
        }
    });
} 



const unlikeBooksModel = ({bookId,useremail}) => {
    return new Promise(async (resolve,reject) => {
        const bookid = new ObjectId(bookId);

        try {
            const existingEntry  = await LikedBookSchema.findOne({email:useremail});
            existingEntry.books=existingEntry.books.filter(book => book.toString() !== bookid.toString());
            const updateLikeBook = await existingEntry.save();
            //  console.log("updateLikeBook =>",updateLikeBook);

            resolve(updateLikeBook);
        } catch (error) {
            reject(error);
        }
    });
} 



module.exports = {displayLikedBooksModel, likeBooksModel, unlikeBooksModel};