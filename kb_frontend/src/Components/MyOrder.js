import { useEffect } from "react";
import '../Styles/MyOrder.css';
import { useDispatch, useSelector } from "react-redux";import { ApiStatus } from "../Utils/apiStatus";
import { cancelOrderfunction, displayOrderfunction } from '../Redux/Thunk/orderThunk';

function MyOrder() {
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

    return  <>
            <div id="MyOrder">
                <h2>My Order</h2> 
                <div id='list'>
                    {Array.isArray(order) &&
                        order.map(odr => {
                            console.log(odr)
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
                                        <button onClick={() => cancelOrder(odr._id)}>Cancel</button>
                                    </div>
                        })
                    }
                </div>
            </div>
            </>
}

export default MyOrder;