import axios from "axios";
import { ApiStatus } from "../../Utils/apiStatus";
import { addAddress, displayAddress, removeAddress } from "../Slices/addressSlice";

const token = localStorage.getItem("KitabBaxaarToken");

export function displayAddressFunction() {
    return async (dispatch,getState) => {
        try {
            dispatch(displayAddress({ apiStatus: ApiStatus.pending, address:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/display-address`,
                method: "GET",
                headers: {Authorization: token},
            });

            const address=response.data.data.address;
           // console.log(response.data.data.address);

            dispatch(displayAddress({ 
                apiStatus: ApiStatus.success, 
                address: address
            }));
        } catch (error) {
            dispatch(displayAddress({ 
                apiStatus: ApiStatus.error, 
                address:[]
            }));
        }
    }
}



export function addAddressfunction(name,phone,pincode,locality,area,city,state,addtype) {
    return async (dispatch,getState) => {
        try {
            dispatch(addAddress({ apiStatus: ApiStatus.pending, address:[]}));

            const response = await axios({
                url: "${process.env.REACT_APP_API_URL}/auth/update-address",
                method: "POST",
                data: {
                    name,
                    phone,
                    pincode,
                    locality,
                    area,
                    city,
                    state,
                    addtype
                },
                headers: {Authorization: token}
            });

            const address=response.data.data.address;
           // console.log(response.data.data);

            dispatch(addAddress({ 
                apiStatus: ApiStatus.success, 
                address: address
            }));
        } catch (error) {
            dispatch(addAddress({ 
                apiStatus: ApiStatus.error, 
                address:[]
            }));
        }
    }
}



export function removeAddressfunction(addressId) {
    return async (dispatch,getState) => {
        try {
            dispatch(removeAddress({ apiStatus: ApiStatus.pending, address:[]}));

            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/remove-address?addressid=${addressId}`,
                method: "POST",
                headers: {Authorization: token},
            });

            const address=response.data.data.address;
            console.log(address);

            dispatch(removeAddress({ 
                apiStatus: ApiStatus.success, 
                address: address
            }));
        } catch (error) {
            dispatch(removeAddress({ 
                apiStatus: ApiStatus.error, 
                address:[]
            }));
        }
    }
}
