import { useEffect, useState } from "react";
import '../Styles/Address.css';
import { useDispatch, useSelector } from "react-redux";
import { addAddressfunction, displayAddressFunction, removeAddressfunction } from "../Redux/Thunk/addressThunk";
import { placeOrderfunction } from "../Redux/Thunk/orderThunk";
import { useNavigate } from "react-router-dom";
import { noCartfunction } from "../Redux/Thunk/cartThunk";

function Order() {
    const [addpop,setAddpop] = useState(false);
    const [confirmBox,setConfirmBox] = useState(false);
    const User = JSON.parse(localStorage.getItem("User"));
    const token = localStorage.getItem("KitabBaxaarToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {apistatus,address} = useSelector(state => state.address);
    const {items,count} = useSelector(state => state.cart);
    

    useEffect(() => {
        dispatch(displayAddressFunction());
    },[]);

    const addressSave = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const pincode = e.target.pincode.value;
        const locality = e.target.locality.value;
        const area = e.target.area.value;
        const city = e.target.city.value;
        const state = e.target.state.value;
        const addtype = e.target.addtype.value;
     
        dispatch(addAddressfunction(name,phone,pincode,locality,area,city,state,addtype));
        setAddpop(false); 
    }

    const deleteAdd = (e) => {
        let addressId = e.target.parentNode.id;

        dispatch(removeAddressfunction(addressId));
    };

    const dlvAddSave = (e) => {
        e.preventDefault();
        console.log(e.target.user_add.value)
    }

    const confirmOrder = () => {
        const selectedAddressInput = document.querySelector('input[name="user_add"]:checked');
        const selectedPaymentInput = document.querySelector('#prc input[type="radio"]:checked');
    
        if (!selectedAddressInput || !selectedPaymentInput) {
            alert("Please select both delivery address and payment method before confirming the order.");
            return;
        }
    
        const orderData = {
            login: {
                name: User.name,
                email: User.useremail,
            },
            orderSummary: items.map(item => ({
                id: item._id,
                title: item.Title,
                author: item.Author,
                price: item.Price,
                image: item.Coverimg
            })),
            deliveryAddress: selectedAddressInput.value,
            priceDetails: {
                cartTotal: pr,
                deliveryFee: tooltip,
                platformFee: platformfee,
                totalAmount: pr + tooltip + platformfee
            },
            paymentMethod: selectedPaymentInput.value
        };
    
        dispatch(placeOrderfunction(orderData));
        setConfirmBox(true);
        dispatch(noCartfunction());
    }
    

    let pr = 0;
    pr = items.reduce((acc,it) => {

        pr = pr + it.Price;
        let sum=pr;
        
        return sum;
    },0);

    const tooltip = (pr >= 500) ? 0 : 99; 

    const platformfee = 10;

    let num = 0;

    return  <div id="Order">
                {!confirmBox && <div id="order-page">
                                    <div className="log box">
                                        <h6>LOGIN</h6>
                                        <div>{User.name}</div>
                                        <div>{User.useremail}</div>
                                    </div>
                    
                                    <div className="odr box">
                    <h6>ORDER SUMMARY</h6>
                    <div id='list'>
                    {
                        items.map(book => {
                            
                            return  <div key={`${book._id}-${num++}`} className="book-card" id={book._id}>
                                        <div className="book_img"><img src={book.Coverimg} alt="image"/></div>
                                        <div className="book_dtl">
                                            <div className="book_name">{book.Title}</div>
                                            <div className="book_author">by {book.Author}</div>
                                            <div className="book_price">₹{book.Price}</div>
                                        </div>
                                    </div>
                        })
                    }
                    </div>
                                    </div>
                    
                                    <div className="price box">
                    <h6>PRICE DETAILS</h6>
                        <div id="table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Cart total :</td>
                                        <td className='result'>₹ {pr}.00</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Fee:</td>
                                        <td className='result' id={`${tooltip === 0}`}>₹ {99}.00</td>
                                    </tr>
                                    <tr>
                                        <td>Platform Fee:</td>
                                        <td className='result'>₹ {platformfee}.00</td>
                                    </tr>
                                    <tr className='ttl'>
                                        <td>Order Total:</td>
                                        <td className='result'>₹ {pr+tooltip+platformfee}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                                    </div>
                    
                                    <div className="dlv-address box">
                                        <h6>DELIVERY ADDRESS</h6>
                                        <form id="optn" onSubmit={dlvAddSave}>
                                            {address && address.map(add => {
                                                            return  <div key={add._id} id={add._id} className="add-optn">
                                                                        <input type="radio" id="user_add" name="user_add" value={`${add.name}, ${add.addtype}, ${add.phone}, ${add.locality}, ${add.area}, ${add.city}, ${add.state}, ${add.pincode} `} />
                                                                        <label htmlFor="user_add">
                                                                            <span className="name">{add.name}</span> <span className="addtype">{add.addtype}</span> <span className="no">{add.phone}</span>
                                                                            <div className="adrs">{add.locality}, {add.area}, {add.city}, {add.state} - {add.pincode}</div>
                                                                        </label>
                                                                        <button className="material-icons-outlined dlt" onClick={deleteAdd}>delete</button>
                                                                    </div>
                                            })}
                                        </form>
                                    </div>
                    
                                    <div className="dlv-btn box">
                    <button onClick={() => {setAddpop(true)}}>+ Add a new Address</button>
                                    </div>
                    
                                    { addpop && <div className="dlv-form box">
                                <h6>ADD A NEW ADDRESS</h6>
                                <form onSubmit={addressSave}>
                                    <input type="text" className="inp-spc" id="name" name="name" placeholder="Name" />
                                    <input type="tel" className="inp-spc" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Mobile Number" />
                                    <input type="text" className="inp-spc" id="pincode" name="pincode" placeholder="Pincode" />
                                    <input type="text" className="inp-spc" id="locality" name="locality" placeholder="Locality" />
                                    <input type="text" className="inp-spc" id="area" name="area" placeholder="Area & Street" />
                                    <input type="text" className="inp-spc" id="city" name="city" placeholder="City" />
                                    <input type="text" className="inp-spc" id="state" name="state" placeholder="State" />
                                    <div id="add-typ">
                                        <span>Address :</span>
                                        <div className="inp-lb">
                                            <input type="radio" id="home-all-day" name="addtype" value="Home" />
                                            <label htmlFor="home-all-day">Home (All day delivery)</label>
                                        </div>
                                        <div className="inp-lb">
                                            <input type="radio" id="work" name="addtype" value="Work" />
                                            <label htmlFor="work">Work (Delivery between 10 AM - 5 PM )</label>
                                        </div>
                                    </div>
                                    <div className="btn">
                                        <input type="submit" className="butn" value="SAVE ADDRESS" />
                                        <input type="button" className="butn" onClick={() => {setAddpop(false)}} value="CANCEL" />
                                    </div>
                                </form>
                                                </div>
                                    }
                    
                                    <div className="payment box">
                                        <h6>PAYMENT OPTIONS</h6>
                                        <form id="prc">
                                            <div className="prc-optn">
                                                <input type="radio" id="upi" name="upi" value="UPI" />
                                                <label htmlFor="upi">UPI</label> 
                                            </div>
                                            <div className="prc-optn">
                                                <input type="radio" id="cda" name="cda" value="Credit / Debit / ATM card" />
                                                <label htmlFor="cda">Credit / Debit / ATM card<div className="sgtn">Add and secure cards as per RBI guidelines</div></label> 
                                            </div>
                                            <div className="prc-optn">
                                                <input type="radio" id="nb" name="nb" value="Net Banking" />
                                                <label htmlFor="nb">Net Banking<div className="sgtn">This instrument has low success, use UPI or cards for better experience</div></label> 
                                            </div>
                                            <div className="prc-optn">
                                                <input type="radio" id="cod" name="cod" value="Cash on Delivery" />
                                                <label htmlFor="cod">Cash on Delivery</label> 
                                            </div>
                                        </form>
                                    </div>
                    
                                    <button className="cnfrm-btn" onClick={confirmOrder}>CONFIRM ORDER</button> 
                </div>}

                {confirmBox && <div id="confirm">
                                   <h1>Order Confirmed Successfully</h1>
                                   <div>
                                        <button onClick={() => navigate('/')}>Click for more shopping</button>
                                        <button onClick={() => navigate('/myorder')}>Your order</button>
                                   </div>
                               </div>
                }
            </div>
}

export default Order;