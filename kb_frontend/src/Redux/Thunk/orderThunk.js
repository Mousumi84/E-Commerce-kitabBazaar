import axios from "axios"; 
import { ApiStatus } from "../../Utils/apiStatus";
import { cancelOrder, displayOrder, placeOrder } from "../Slices/oderSlice";

const token = localStorage.getItem("KitabBaxaarToken");

export function displayOrderfunction() {
    return async (dispatch,getState) => {
        try {
            dispatch(displayOrder({ apiStatus: ApiStatus.pending, order:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/order/display-order`,
                method: "GET",
                headers: {Authorization: token},
            });

            const items=response.data.data;
            //console.log(items);

            dispatch(displayOrder({ 
                apiStatus: ApiStatus.success, 
                order: items
            }));
        } catch (error) {
            dispatch(displayOrder({ 
                apiStatus: ApiStatus.error, 
                order: []
            }));
        }
    }
}



export function placeOrderfunction(orderData) {
    return async (dispatch,getState) => {
        try {
            dispatch(placeOrder({ apiStatus: ApiStatus.pending, order:[]}));
            // console.log("Order Submitted: ", orderData);

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/order/placed-order`,
                method: "POST",
                data: orderData,
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json" 
                },
            });

            const items=response.data.data;
            
            dispatch(placeOrder({ 
                apiStatus: ApiStatus.success, 
                order: items,
            }));
        } catch (error) {
            dispatch(placeOrder({ 
                apiStatus: ApiStatus.error, 
                order: []
            }));
        }
    }
}



export function cancelOrderfunction(orderId) {
    return async (dispatch,getState) => {
        
        try {
            dispatch(cancelOrder({ apiStatus: ApiStatus.pending, order:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/order/cancel-order?orderId=${orderId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const items=response.data.data;
           // console.log(items);
    
            dispatch(cancelOrder({ 
                apiStatus: ApiStatus.success, 
                order: items,
            }));
        } catch (error) {
            dispatch(cancelOrder({ 
                apiStatus: ApiStatus.error, 
                order: []
            }));
        }
    }
}
