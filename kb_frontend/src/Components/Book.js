import '../Styles/Book.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons"; 
import { faTicketSimple, faTag } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { frontPageApiCall } from "../Redux/Thunk/frontPageThunk";
import { selectedBookApiCall } from "../Redux/Thunk/selectedBookThunk";
import { displayWishListBookfunction, likeBookfunction } from "../Redux/Thunk/wishListThunk";
import { unLikeBookfunction } from "../Redux/Thunk/wishListThunk";
import { addToCartfunction, displayCartfunction } from '../Redux/Thunk/cartThunk';
import { ApiStatus } from '../Utils/apiStatus';


function Book() { 
    const [skip,setSkip] = useState(0);
    const {bookId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {bookdetails} = useSelector(state => state.selectBook);
    let {apiStatus,data} = useSelector(state => state.frontPage);
    const {books} = useSelector(state => state.wishlistBook);
    const {items} = useSelector(state => state.cart);
    const [like, setLike] = useState(false);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const isLiked = books.some(bk => bk._id === bookId);
        setLike(isLiked);
    }, [books, bookId]); // Re-run whenever books or bookId change
    

    useEffect(() => {
        const cart = items.some(it => it._id === bookId);
        setInCart(cart);
    }, [items, bookId]); // Re-run whenever books or bookId change
    

    useEffect(() => {
            dispatch(displayWishListBookfunction());
    },[]);

    useEffect(() => {
        dispatch(displayCartfunction());
    },[dispatch]);
        
    useEffect(() => {
        dispatch(selectedBookApiCall(bookId));
    },[]);
  
    useEffect(() => {
        dispatch(frontPageApiCall(skip,4));
    },[skip,dispatch]);

    let noloading = (apiStatus === ApiStatus.init)

    const leftClick = () => {
        setSkip((prevskip) => prevskip - 4);
    };

    const rightClick = () => {
        setSkip((prevskip) => prevskip + 4);
    };
  

    const likeBook = (e) => {
        setLike(!like);
        if (!like) {
            dispatch(likeBookfunction(bookId)); 
        } else {
            dispatch(unLikeBookfunction(bookId));
        }
    }

    const addCart = (e) => {
        setInCart(!inCart);
        dispatch(addToCartfunction(bookId));
    }
    

    const clickBook = (e) => {
        const bookId=e.currentTarget.id;
        if ((e.target.className === "material-icons-outlined like" || e.target.className === "material-icons-outlined notlike") && e.target.id === `love-${bookId}`) {
            let fav = document.getElementById(`love-${bookId}`);
            
            if(fav.className === "material-icons-outlined like") {
                fav.className = "material-icons-outlined notlike";
                dispatch(unLikeBookfunction(bookId));
            }
            else if(fav.className === "material-icons-outlined notlike") {
                fav.className = "material-icons-outlined like";
                dispatch(likeBookfunction(bookId)); 
            }
        } 
        else if (e.target.className === "add_cart" && e.target.id === `cart-${bookId}`) {
            console.log(e.target);

            dispatch(addToCartfunction(bookId));

        } 
        else {
           // navigate(`/book/${bookId}`);
            window.open(`/book/${bookId}`,"_blank");   // open in new tab
        }
    }
    
    return  <div id="book">
                <div id="book-card">
                    <div className="image-box"><img src={bookdetails?.Coverimg} /></div>
                    <div className="book-dtl">
                        <div className="ttl"><span>{bookdetails?.Title}</span> || Paperback</div>
                        <div className="athr">By: <span>{bookdetails?.Author}</span> || Publisher: Penguin Publishers India</div>
                        <div className="cat"><span>{bookdetails?.Category}</span> || <span>{bookdetails?.Genre}</span></div>
                        <div className="rtng"><span>{bookdetails?.Rating} <span className="material-icons-outlined star">star</span></span></div>
                        <div className="pr">₹ {bookdetails?.Price}</div>
                        <div className="btn">
                            {
                                inCart ||<button onClick={addCart}><span className="material-icons-outlined">shopping_cart</span> ADD TO CART </button>
                            }
                            {!like ?  <button onClick={likeBook} className="add-wshlt"><FontAwesomeIcon icon={faHeart} size="xl"/>SAVE TO WISHLIST </button> 
                                  :  <button onClick={likeBook} className="rmv-wshlt"><span className="material-icons-outlined like">favorite</span>REMOVE FROM WISHLIST </button> 
                            }
                        </div>
                    </div>
                </div>

                <div id="dsc" className="abt"><h4>About the Book</h4>{bookdetails?.Description}</div>
                
                <div id="prd-dtl" className="abt">
                    <h4>Product Details</h4>
                    <ul>
                        <li>
                            <span className="li-hd">ISBC-10:</span>
                            <span>9393939393993</span>
                        </li>
                        <li>
                            <span className="li-hd">ISBC-13:</span>
                            <span>9696969696996</span>
                        </li>
                        <li>
                            <span className="li-hd">Weight:</span>
                            <span>220 g</span>
                        </li>
                        <li>
                            <span className="li-hd">No of Pages:</span>
                            <span>310</span>
                        </li>
                        <li>
                            <span className="li-hd">Published Date:</span>
                            <span>10 Feb 2025</span>
                        </li>
                        <li>
                            <span className="li-hd">Publisher:</span>
                            <span> Penguin Publishers India</span>
                        </li>
                        <li>
                            <span className="li-hd">Height:</span>
                            <span>200 mm</span>
                        </li>
                        <li>
                            <span className="li-hd">Width:</span>
                            <span>21 mm</span>
                        </li>
                    </ul>
                </div>

                <div id="extr-card">
                        <div className="card">
                            <div className="h1">Coupons for you</div>
                            <div className="b1"><FontAwesomeIcon icon={faTicketSimple} style={{color: "#028500",}} /> <span className="bold">Special Price</span> Get extra ₹20 off on 20 item(s) (price inclusive of cashback/coupon)</div>
                        </div>
                        <div className="card">
                            <div className="h1">Available offers</div>
                            <div className="b1"><FontAwesomeIcon icon={faTag} style={{color: "#028500",}} /> <span className="bold">Bank offer</span> 5% Unlimited Cashback on Axis Bank Credit Card</div>
                        </div>
                    </div>

                <div id="suggestion">
                    <h4>Similar Books</h4>
                    <div id="sgtn">
                        <button className="material-icons-outlined" onClick={leftClick} disabled={skip === 0 || noloading}>arrow_back_ios</button>
                        <div id="similar-book">
                            {
                                data && data.map(book => {
                                    const isLiked = books.some(bk => bk._id === book._id);
                                    const isCart = items.some(it => it._id === book._id);


                                    return  <div key={book._id} className="book-card" id={book._id} onClick={clickBook}>
                                                <div className="book_img"><img src={book.Coverimg} alt="image"/></div>
                                                <div className="book_dtl">
                                                    <div className="book_name">{book.Title}</div>
                                                    <div className="book_author">by {book.Author}</div>
                                                    <div className="book_price">₹{book.Price}</div>
                                                    <div className="book_rate">{book.Rating}<span className="material-icons-outlined">star</span></div>
                                                    {
                                                        isCart ||<button className="add_cart" id={`cart-${book._id}`}><span className="material-icons-outlined">shopping_cart</span>ADD TO CART</button>
                                                    }
                                                    {
                                                        isLiked ? <span className="material-icons-outlined like" id={`love-${book._id}`}>favorite</span>
                                                                : <span className="material-icons-outlined notlike" id={`love-${book._id}`}>favorite</span>
                                                    }
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                        <button className="material-icons-outlined" onClick={rightClick} disabled={noloading}>arrow_forward_ios</button>
                    </div>
                </div>

                <div id="footer">
                    <div id="company">
                        <h3>KitabBazaar</h3>
                        <div>Who We Are</div>
                        <div>Join Our Team</div>
                        <div>Terms & Conditions</div>
                        <div>We Respect Your Privacy</div>
                        <div>Fees & Payments</div>
                        <div>Returns & Refunds Policy</div>
                        <div>Promotions Terms & Conditions</div>
                    </div>
                    <div id="help">
                        <h3>Help</h3>
                        <div>Track Your Order</div>
                        <div>Frequently Asked question</div>
                        <div>Return</div>
                        <div>Cancellations</div>
                        <div>Payments</div>
                        <div>Coustomer Care</div>
                        <div>How To Redeem Coupon</div>
                    </div>
                    <div id="follow">
                        <h3>Follow us</h3>
                        <div>Facebook</div>
                        <div>Instagram</div>
                        <div>Twiter</div>
                        <div>Pinterest</div>
                    </div>
                    <div></div>
                </div>
            </div>
}

export default Book;