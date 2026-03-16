import { useEffect, useState } from "react";
import '../Styles/MyOrder.css';
import { useDispatch, useSelector } from "react-redux";import { ApiStatus } from "../Utils/apiStatus";
import { cancelOrderfunction, displayOrderfunction } from '../Redux/Thunk/orderThunk';

function MyOrder() {
    const [cancelPop,setCancelPop] = useState(false);
    const {apistatus,order} = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displayOrderfunction());
    },[]);

    const cancelOrder = (orderId) => {
        dispatch(cancelOrderfunction(orderId));
    }

    const date = (dt) => {
        const d=new Date(dt);

        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    }

    if(apistatus === ApiStatus.init || apistatus === ApiStatus.pending) {

        return <>
                   <div>...Fetching</div>
               </>
    }

    let count=1;

    const handleConfirmCancel = (orderId)=> {
        cancelOrder(orderId);
        setCancelPop(false);
    }

    const handleClosePopup = ()=> {
        setCancelPop(false);
    }

    return  <>
            <div id="MyOrder">
                <h2>My Order</h2> 
                <div id='list'>
                    {Array.isArray(order) &&
                        order.map(odr => {
                            return  <div key={odr._id} className="odr-card" id={odr._id}>
                                        <div className="date">{date(odr.createdAt)}</div>
                                        <div className="image-box">
                                            {odr.orderSummary.map(it => {
                              
                                                return  <div key={`it.id-${count++}`} className="imgs">
                                                            <img src={it.image} />
                                                        </div>
                                            })}
                                        </div>
                                        <div>{odr?.deliveryAddress.split(",")[0]}</div>
                                        <div>₹ {odr.priceDetails.totalAmount}</div>
                                        <button onClick={() => setCancelPop(true)}>Cancel</button>
                                        { cancelPop &&  <div className="cancelpop">
                                                            <div className="popup-box">
                                                                <p>Are you sure you want to cancel this order?</p>
                                                                <button onClick={() => handleConfirmCancel(odr._id)}>Yes, Cancel</button>
                                                                <button onClick={handleClosePopup}>No, Go Back</button>
                                                            </div>
                                                        </div>
                                        }
                                    </div>
                        })
                    }

                    
                </div>
            </div>
            </>
}

export default MyOrder;