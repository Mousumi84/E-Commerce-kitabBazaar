import '../Styles/Cart.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiStatus } from "../Utils/apiStatus";
import { addToCartfunction, displayCartfunction, removeFromCartfunction } from '../Redux/Thunk/cartThunk';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const {apistatus,items,count} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(displayCartfunction());
    },[]);

    const addToCart = (e) => {
        const bookId = e.currentTarget.parentNode.parentNode.id;
        dispatch(addToCartfunction(bookId));
    }
    
    const removeFromCart = (e) => {
        const bookId = e.currentTarget.parentNode.parentNode.id;
        dispatch(removeFromCartfunction(bookId));
    };
    
    if(apistatus === ApiStatus.init || apistatus === ApiStatus.pending) {

        return <>
                   <div>...Fetching</div>
               </>
    }
     

    const uniqueBooks = items.reduce((acc, book) => {
        if (!acc.find(b => b._id === book._id)) {
            acc.push(book);
        }
        return acc;
    }, []);


    let pr = 0;
    pr = items.reduce((acc,it) => {

        pr = pr + it.Price;
        let sum=pr;
        
        return sum;
    },0);

    const tooltip = (pr >= 500) ? 0 : 99; 

    const platformfee = 10;


    return  <div id="cart">
                <h2>My Cart</h2>
                <div id='list'>
                    {
                        uniqueBooks.map(book => {
                            let bookCount = count.find(id => id.bookId === book._id);

                            return  <div key={book._id} className="book-card" id={book._id}>
                                        <div className="book_img"><img src={book.Coverimg} alt="image"/></div>
                                        <div className="book_dtl">
                                            <div className="book_name">{book.Title}</div>
                                            <div className="book_author">by {book.Author}</div>
                                            <div className="book_price">₹{book.Price}</div>
                                        </div>
                                        <div className='count'>
                                            <button onClick={removeFromCart}>-</button>
                                            <span>{bookCount ? bookCount.count : 0}</span>
                                            <button onClick={addToCart}>+</button>
                                        </div>
                                    </div>
                        })
                    }
                </div>

                {count.length >0 && <div> 
                                        <div id='order-price'>
                                            <h4>Order Details</h4>
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
                

                                        <button id='place-order' onClick={() => navigate('/order_page')}>PLACE ORDER</button>
                                    </div>
                }
            </div>
}

export default Cart;