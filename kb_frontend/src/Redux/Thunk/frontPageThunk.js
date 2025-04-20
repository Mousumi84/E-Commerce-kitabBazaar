import axios from "axios";
import { ApiStatus } from "../../Utils/apiStatus";
import { firstScreen } from "../Slices/frontPageSlice";

export function frontPageApiCall(skip,limit) {
    return async (dispatch,getState) => {
        try {
            dispatch(firstScreen({apiStatus : ApiStatus.pending}));

            const response = await axios({
                url:`https://e-commerce-kitabbazaar.onrender.com/books/displayallBooks?skip=${skip}&limit=${limit}`,
                method: "GET",
            });
        
            dispatch(firstScreen({
                apiStatus : "success",
                data : response.data.data
            }));

        } catch (error) {
            dispatch(firstScreen({
                apiStatus : 'error',
                data : []
            }));
        }
    }
}



export function filterPageApiCall(skip,filterData,limit) {
    return async (dispatch,getState) => {
        try {
            dispatch(firstScreen({apiStatus : ApiStatus.pending}));
            let queryParams = new URLSearchParams({
                skip : skip,
                Language : filterData.languages.join(","),
                Category : filterData.categories.join(","),
                PriceGT : filterData.priceRange.min,
                PriceLT : filterData.priceRange.max,
                Rate : filterData.ratings,
                limit : limit
            });

            const response = await axios({
                url:`${process.env.REACT_APP_API_URL}/books/filterBooks?${queryParams}`,
                method: "GET",
            });
        
            dispatch(firstScreen({
                apiStatus : "success",
                data : response.data.data
            }));

        } catch (error) {
            dispatch(firstScreen({
                apiStatus : 'error',
                data : []
            }));
        }
    }
}