import '../Styles/Wishlist.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayWishListBookfunction, unLikeBookfunction } from "../Redux/Thunk/wishListThunk";
import { ApiStatus } from "../Utils/apiStatus";
import { addToCartfunction } from '../Redux/Thunk/cartThunk';

function Wishlist() {
    const {apistatus,books} = useSelector(state => state.wishlistBook);
    const dispatch = useDispatch();
    const {items} = useSelector(state => state.cart);


    useEffect(() => {
        dispatch(displayWishListBookfunction());
    },[]);

    const clickBook = (e) => {
        const bookId=e.currentTarget.id;

        if (e.target.className === "material-icons-outlined like" ) {
            dispatch(unLikeBookfunction(bookId));
        } 
        else if (e.target.className === "add_cart" ) {
            dispatch(addToCartfunction(bookId));
        } 
            
        else {
           // navigate(`/book/${bookId}`);
            window.open(`/book/${bookId}`,"_blank");   // open in new tab
        }
    }


    if(apistatus === ApiStatus.init || apistatus === ApiStatus.pending) {

        return <>
                   <div>...Fetching</div>
               </>
    }
    

    return  <>
            <div id="wishlist">
                <h2>My Wishlist</h2>
                <div id='list'>
                    {
                        books.map(book => {
                            const isCart = items.some(it => it._id === book._id);

                            return  <div key={book._id} className="book-card" id={book._id} onClick={clickBook}>
                                        <div className="book_img"><img src={book.Coverimg} alt="image"/></div>
                                        <div className="book_dtl">
                                            <div className="book_name">{book.Title}</div>
                                            <div className="book_author">by {book.Author}</div>
                                            <div className="book_price">₹{book.Price}</div>
                                            {
                                                isCart || <button className='add_cart'><span className="material-icons-outlined">shopping_cart</span>ADD TO CART</button>
                                            }
                                            <span className="material-icons-outlined like">favorite</span>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            </div>
            </>
}

export default Wishlist;