import axios from "axios";
import { ApiStatus } from "../../Utils/apiStatus";
import { selectedBook } from "../Slices/selectedBookSlice";


export function selectedBookApiCall(bookId) {
    return async (dispatch,getState) => {
        try {
            dispatch(selectedBook({apiStatus : ApiStatus.pending}));

            const response = await axios({
                url:`${process.env.REACT_APP_API_URL}/books/book?bookId=${bookId}`,
                method: "GET",
            });
        
            dispatch(selectedBook({
                apiStatus : "success",
                bookdetails : response.data.data
            }));

        } catch (error) {
            dispatch(selectedBook({
                apiStatus : 'error',
                bookdetails : []
            }));
        }
    }
}
