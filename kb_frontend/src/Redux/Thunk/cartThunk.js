import axios from "axios";
import { addToCart, displayCart, noCart, removeFromCart } from "../Slices/cartSlice";
import { ApiStatus } from "../../Utils/apiStatus";

const token = localStorage.getItem("KitabBaxaarToken");

export function displayCartfunction() {
    return async (dispatch,getState) => {
        try {
            dispatch(displayCart({ apiStatus: ApiStatus.pending, items:[]}));

            const response = await axios({
                url: `http://localhost:8000/cart/display-cart`,
                method: "GET",
                headers: {Authorization: token},
            });

            const items=response.data.data.books;
            //console.log(items);

            dispatch(displayCart({ 
                apiStatus: ApiStatus.success, 
                items: items
            }));
        } catch (error) {
            dispatch(displayCart({ 
                apiStatus: ApiStatus.error, 
                items:[]
            }));
        }
    }
}



export function addToCartfunction(bookId) {
    return async (dispatch,getState) => {

        try {
            dispatch(addToCart({ apiStatus: ApiStatus.pending, items:[]}));

            const response = await axios({
                url: `http://localhost:8000/cart/add-to-cart?bookid=${bookId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const items=response.data.data.books;
           // console.log(items);
    
            dispatch(addToCart({ 
                apiStatus: ApiStatus.success, 
                items: items,
                bookId: bookId
            }));
        } catch (error) {
            dispatch(addToCart({ 
                apiStatus: ApiStatus.error, 
                items:[]
            }));
        }
    }
}



export function removeFromCartfunction(bookId) {
    return async (dispatch,getState) => {
        try {
            dispatch(removeFromCart({ apiStatus: ApiStatus.pending, items:[]}));

            const response = await axios({
                url: `http://localhost:8000/cart/remove-from-cart?bookid=${bookId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const items=response.data.data.books;
            //console.log(items);
    
            dispatch(removeFromCart({ 
                apiStatus: ApiStatus.success, 
                items: items,
                bookId: bookId
            }));
        } catch (error) {
            dispatch(removeFromCart({ 
                apiStatus: ApiStatus.error, 
                items:[]
            }));
        }
    }
}



export function noCartfunction() {
    return async (dispatch,getState) => {
        try {
            dispatch(noCart({ apiStatus: ApiStatus.pending, items:[]}));

            const response = await axios({
                url: `http://localhost:8000/cart/nocart`,
                method: "POST",
                headers: {Authorization: token},
            });

            const items=response.data.data;
           // console.log(items);
    
            dispatch(noCart({ 
                apiStatus: ApiStatus.success, 
                items: []
            }));
        } catch (error) {
            dispatch(noCart({ 
                apiStatus: ApiStatus.error, 
                items:[]
            }));
        }
    }
}