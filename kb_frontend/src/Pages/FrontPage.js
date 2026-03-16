import { useContext, useEffect, useState } from "react";
import '../Styles/Frontpage.css';
import { useDispatch, useSelector } from "react-redux";
import { ApiStatus } from "../Utils/apiStatus";
// import { SkeletonUI } from "../Utils/fetchingSkeletonUI";
import { filterPageApiCall, frontPageApiCall } from "../Redux/Thunk/frontPageThunk";
import { displayWishListBookfunction, likeBookfunction, unLikeBookfunction } from "../Redux/Thunk/wishListThunk";
import { addToCartfunction, displayCartfunction } from "../Redux/Thunk/cartThunk";
import { home } from "./Home";
import { details } from "../App";

export function FrontPage() {
    const {isLogin,setIsLogin} = useContext(details);
    let [skip,setSkip] = useState(0);
    let [page,setPage] = useState(1);
//    const [cachedData, setCachedData] = useState({}); // Cache for previously loaded pages
    const dispatch = useDispatch();
    const {apiStatus,data} = useSelector(state => state.frontPage);
    const {books} = useSelector(state => state.wishlistBook);
    const {items} = useSelector(state => state.cart);
    let limit=30;
    const {filterData,filter} = useContext(home);
    let [likebooks,setLikeBooks] = useState([]);

    useEffect(() => {
        dispatch(displayWishListBookfunction());
    },[]);
    

    useEffect(() => {
        const syncCart = () => {
            const storedCart = JSON.parse(localStorage.getItem("cartState"));
            if (storedCart) {
                dispatch(displayCartfunction());
            }
        };
    
        window.addEventListener("storage", syncCart);
    
        return () => {
            window.removeEventListener("storage", syncCart);
        };
    }, [dispatch]);     // don't use items in dependecy => it will create infinite loop


    // useEffect for filter application/removal
    useEffect(() => {
    
        if (filter && filterData && Object.keys(filterData).length > 0) {
            setSkip(0);
            setPage(1);
            dispatch(filterPageApiCall(0, filterData, limit));
        } else if (!filter) {
            setSkip(0);
            setPage(1);
            dispatch(frontPageApiCall(0, limit));
        }
    }, [filter, filterData, dispatch]);
    
    // useEffect for pagination clicks
    useEffect(() => {
        if (filter && filterData && Object.keys(filterData).length > 0) {
            dispatch(filterPageApiCall(skip, filterData, limit));
        } else if (!filter) {
            dispatch(frontPageApiCall(skip, limit));
        }
    }, [skip, page, filter, filterData, dispatch]);
    

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
    let noloading = (apiStatus === ApiStatus.init)

    const leftClick = () => {
        setSkip((prevskip) => prevskip - limit);
        setPage((prevpage) => prevpage - 1);
    }

    const rightClick = () => {
        setSkip((prevskip) => prevskip + limit);
        setPage((prevpage) => prevpage + 1);
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
           dispatch(addToCartfunction(bookId));
        } 
        else {
            window.open(`/book/${bookId}`,"_blank");   // open in new tab
        }
    }


    // const isLiked = books.some(item => item._id === book._id);


//     const clickBook = (e) => {
//     const bookId = e.currentTarget.id;

//     if (e.target.classList.contains("like") || e.target.classList.contains("notlike")) {

//         if (books) {
//             dispatch(unLikeBookfunction(bookId));
//         } else {
//             dispatch(likeBookfunction(bookId));
//         }

//     } else if (e.target.classList.contains("add_cart")) {
//         dispatch(addToCartfunction(bookId));

//     } else {
//         window.open(`/book/${bookId}`, "_blank");
//     }
// };
 

    if(apiStatus === ApiStatus.init || apiStatus === ApiStatus.pending) {

       return <>
                   <div style={{ border: "solid blue 1px", display: "flex", flexWrap: "wrap", width: "100%", height: "100%", gap: "20px", justifyContent: "space-evenly", alignItems: "center" }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="skeleton-card" style={{ width: "200px", height: "340px", backgroundColor: "#ffd7d861", display: "flex", flexDirection: "column", gap: "10px", padding: "10px", justifyContent: "center", alignItems: "center" }}>
                          <div className="blank_img" style={{ width: "85%", height: "250px", backgroundColor: "#ffd7d883", }}></div>
                    
                          <div className="blank_dtl" style={{width: "90%", height: "fit-content", display: "flex", flexDirection: "column", gap: "5px", padding: "5px" }}>
                            <div className="blank_name" style={{ width: "90%", height: "20px", backgroundColor: "#ffd7d883" }}></div>
                            <div className="blank_author" style={{ width: "90%", height: "20px", backgroundColor: "#ffd7d883" }}></div>
                            <div className="blank_price" style={{ width: "90%", height: "20px", backgroundColor: "#ffd7d883" }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
               </>
    }



    

    return  <div id="Frontpage">
                <div id="front">
                    {Array.isArray(data) &&                                                                                                                         //(cachedData[page] || [])
                        data.map(book => { 

                            const isLiked = books.some(bk => bk._id === book._id);
                            const isCart = items.some(it => it._id === book._id);

                            return  <div key={book._id} className="book-card" id={book._id} onClick={clickBook}>
                                        <div className="book_img"><img src={book.Coverimg} alt="image"/></div>
                                        <div className="book_dtl">
                                            <div className="book_name">{book.Title}</div>
                                            <div className="book_author">by {book.Author}</div>
                                            <div className="book_price">₹{book.Price}</div>
                                            <div className="book_rate">{book.Rating}<span className="material-icons-outlined">star</span></div>
                                            {isLogin && ( isCart ||<button className="add_cart" id={`cart-${book._id}`}><span className="material-icons-outlined">shopping_cart</span>ADD TO CART</button>)}
                                            {/* {isLogin && (isLiked ? <span className="material-icons-outlined like" id={`love-${book._id}`}>favorite</span>
                                                                : <span className="material-icons-outlined notlike" id={`love-${book._id}`}>favorite</span>
                                                        )
                                            } */}

                                            {isLogin && ( <span className={`material-icons-outlined ${isLiked ? "like" : "notlike"}`} id={`love-${book._id}`}>favorite</span>)}
                                        </div>
                                    </div>
                        })
                    }
                </div>
                
 
                <div id="pagination">
                    <button className="material-icons-outlined" onClick={leftClick} disabled={page === 1 || noloading}>arrow_back_ios</button>
                    <span className="page">{page}</span>
                    <button className="material-icons-outlined" onClick={rightClick} disabled={noloading}>arrow_forward_ios</button>
                </div>
            </div>
}