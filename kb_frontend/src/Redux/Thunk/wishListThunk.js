import axios from "axios";
import { displayWislistBook, likeBook, unLikeBook } from "../Slices/wishListSlice";
import { ApiStatus } from "../../Utils/apiStatus";

const token = localStorage.getItem("KitabBaxaarToken");

export function displayWishListBookfunction() {
    return async (dispatch,getState) => {
        try {
            dispatch(displayWislistBook({ apiStatus: ApiStatus.pending, books:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/likebook/display-liked-book`,
                method: "GET",
                headers: {Authorization: token},
            });

            const booksId=response.data.data.books;
            //console.log(booksId);

            const books = await Promise.all(
                booksId.map(async (bookId) => {

                const response2 = await axios({
                    url:`${process.env.REACT_APP_API_URL}/books/book?bookId=${bookId}`,
                    method: "GET",
                });

                return response2.data.data;

            }));
    
            //console.log(books);

            dispatch(displayWislistBook({ 
                apiStatus: ApiStatus.success, 
                books: books
            }));
        } catch (error) {
            dispatch(displayWislistBook({ 
                apiStatus: ApiStatus.error, 
                books:[]
            }));
        }
    }
}



export function likeBookfunction(bookId) {
    return async (dispatch,getState) => {
        try {
            dispatch(likeBook({ apiStatus: ApiStatus.pending, books:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/likebook/like?bookid=${bookId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const booksId=response.data.data.books;
            //console.log(booksId);

            const books = await Promise.all(
                booksId.map(async (bookId) => {

                const response2 = await axios({
                    url:`${process.env.REACT_APP_API_URL}/books/book?bookId=${bookId}`,
                    method: "GET",
                });

                return response2.data.data;

            }));
    
           // console.log(books);
    
            dispatch(likeBook({ 
                apiStatus: ApiStatus.success, 
                books: books
            }));
        } catch (error) {
            dispatch(likeBook({ 
                apiStatus: ApiStatus.error, 
                books:[]
            }));
        }
    }
}



export function unLikeBookfunction(bookId) {
    return async (dispatch,getState) => {
        try {
            dispatch(unLikeBook({ apiStatus: ApiStatus.pending, books:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/likebook/unlike?bookid=${bookId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const booksId=response.data.data.books;
            //console.log(booksId);

            const books = await Promise.all(
                booksId.map(async (bookId) => {

                const response2 = await axios({
                    url:`${process.env.REACT_APP_API_URL}/books/book?bookId=${bookId}`,
                    method: "GET",
                });

                return response2.data.data;

            }));
    
           // console.log(books);
    
            dispatch(unLikeBook({ 
                apiStatus: ApiStatus.success, 
                books: books
            }));
        } catch (error) {
            dispatch(unLikeBook({ 
                apiStatus: ApiStatus.error, 
                books:[]
            }));
        }
    }
}
