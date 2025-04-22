import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { details } from "../App";
import { useDispatch } from "react-redux";
import { filterPageApiCall } from "../Redux/Thunk/frontPageThunk";
import axios from "axios";

export const home = createContext();

export function Home() {
    const [filterData,setFilterData] = useState({});
    const [filter,setFilter] = useState(false);
    const [minPrice,setMinPrice] = useState(0);
    const [srchBox,setSrchBox] = useState(false);
    const [searchedBook,setSearchedBook] = useState([]);
    const [maxPrice,setMaxPrice] = useState(15000);
    const {isLogin} = useContext(details);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const searchBoxRef = useRef(null);
    const User = JSON.parse(localStorage.getItem("User"));


    const loginApiCall = () => {
        navigate('/login');
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
    const wishlistPage = () => {
        navigate('/wishlist');
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const cartPage = () => {
        navigate('/cart');
    }
    
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
    const profilePage = () => {
        navigate('/profile');
    }

//---------------Search Book-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    const searchBook=async (e) => {
        let search=e.target.value;
        setSrchBox(true);

        if(!search) setSrchBox(false);

        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/books/search-book?search=${search}`,   // process.env.REACT_APP_API_URL ${process.env.REACT_APP_API_URL}/
                method: "GET",
            })

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            setSearchedBook(response.data.data);
            
        } catch (error) {
            alert("search Failed due to some error");
        }
    };


//Debouncing = to minimise the API call 
    const debouncing=(oldFun) => {
        let id;

        return ((...par) => {
            clearTimeout(id);

            id=setTimeout(() => {
                oldFun(...par);
            },300);
        });
    }
    

    useEffect(() => {
        function handleClickOutside(event) {
            if ( searchInputRef.current && !searchInputRef.current.contains(event.target) && searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setSrchBox(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchInputRef, searchBoxRef]);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   
    const clickSearchBook = (e) => {
        const bookId = e.currentTarget.id;
        window.open(`/book/${bookId}`,"_blank");
    };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    const minPriceUpdate = (e) => {
        setMinPrice(e.target.value);
    }
    const maxPriceUpdate = (e) => {
        setMaxPrice(e.target.value);
    }

    const minPricePercent = ( minPrice / 15000 )* 100;
    const maxPricePercent = ( maxPrice / 15000 )* 100;

    const trackStyle = {
        background: `linear-gradient(to right, rgb(250, 172, 172) ${minPricePercent}%, rgb(254, 49, 51) ${minPricePercent}%, rgb(254, 49, 51) ${maxPricePercent}%, rgb(250, 172, 172) ${maxPricePercent}%)`,
        border: "solid 1px rgba(254, 49, 52, 0.296)",
        borderRadius: "8px",
    };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
    
    const filterSumbit = (e) => {
        e.preventDefault();

        // Get Form Data
        const formData = new FormData(e.target);
    
        const selectedLanguages = formData.getAll("language");
        const selectedCategories = formData.getAll("category");
        const selectedRatings = formData.getAll("Rating");
        const minPrice = e.target.minRange.value;
        const maxPrice = e.target.maxRange.value;
    
        // Create an object with the selected data
        let data = {
            languages: selectedLanguages,
            categories: selectedCategories,
            ratings: selectedRatings,
            priceRange: { min: minPrice, max: maxPrice },
        };

        setFilterData(data);
        setFilter(true);
        dispatch(filterPageApiCall(0,filterData));

    }

    let noFilter = location.pathname.startsWith('/book') || location.pathname.startsWith('/wishlist') || location.pathname.startsWith('/cart') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/order_page') || location.pathname.startsWith('/myorder');
   
    return  <home.Provider value={{filterData,filter}}>
            <div id="home">
                <nav>
                    <div id="navbar">
                        <img src="/KitabBazaar.jpg" onClick={() => navigate("/")} alt="logo" />
                        <span>Check logo: <a href="/KitabBazaar.jpg" target="_blank">Click here</a></span>
                        <div id="search-box">
                            <input type="search" onKeyUp={debouncing(searchBook)} autoComplete="off" ref={searchInputRef} />
                            <span className="material-icons-outlined">search</span>
                        </div>
                        { isLogin ? <div className="islog">
                                        <button onClick={wishlistPage} ><span className="material-icons-outlined">favorite</span>WISHLIST</button>
                                        <button onClick={cartPage}><span className="material-icons-outlined">shopping_cart</span>CART</button>
                                        <button onClick={profilePage}>{User.name[0]}</button>
                                    </div>
                                  : <div className="islog">
                                        <button onClick={loginApiCall}><span className="material-icons-outlined">person</span>LOGIN</button>
                                    </div>}
                    </div>
                </nav>

                <div id="content">
                    { !noFilter &&  <div id="filter-box">
                                        <div id="flt">Filter</div>
                                        <div id="filters">
                                            <form onSubmit={filterSumbit}>
                                                <fieldset id="language">
                                                    <legend>Language:</legend>
                                                    <div>
                                                        <input type="checkbox" id="bengali" name="language" value="Bengali" />
                                                        <label htmlFor="bengali">Bengali</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="english" name="language" value="English" />
                                                        <label htmlFor="english">English</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="german" name="language" value="German" />
                                                        <label htmlFor="german">German</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="gujarati" name="language" value="Gujarati" />
                                                        <label htmlFor="gujarati">Gujarati</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="hindi" name="language" value="Hindi" />
                                                        <label htmlFor="hindi">Hindi</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="marathi" name="language" value="Marathi" />
                                                        <label htmlFor="marathi">Marathi</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="punjabi" name="language" value="Punjabi" />
                                                        <label htmlFor="punjabi">Punjabi</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="sanskrit" name="language" value="Sanskrit" />
                                                        <label htmlFor="sanskrit">Sanskrit</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="tamil" name="language" value="Tamil" />
                                                        <label htmlFor="tamil">Tamil</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="urdu" name="language" value="Urdu" />
                                                        <label htmlFor="urdu">Urdu</label>
                                                    </div>
                                                </fieldset>
                
                                                <fieldset id="category">
                                                    <legend>Category:</legend>
                                                    <div>
                                                        <input type="checkbox" id="literature_&_fiction" name="category" value="Literature & Fiction" />
                                                        <label htmlFor="literature_&_fiction">Literature & Fiction</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="literature_&_literary_studies" name="category" value="Literature & Literary Studies" />
                                                        <label htmlFor="literature_&_literary_studies">Literature & Literary Studies</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="medicine" name="category" value="Medicine" />
                                                        <label htmlFor="medicine">Medicine</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="dictionaries_&_language" name="category" value="Dictionaries & Language" />
                                                        <label htmlFor="dictionaries_&_language">Dictionaries & Language</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="science_&_mathematics" name="category" value="Science & Mathematics" />
                                                        <label htmlFor="science_&_mathematics">Science & Mathematics</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="law" name="category" value="Law" />
                                                        <label htmlFor="law">Law</label>
                                                    </div><div>
                                                        <input type="checkbox" id="computer_&_internet" name="category" value="Computer & Internet" />
                                                        <label htmlFor="computer_&_internet">Computer & Internet</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="environment_&_geography" name="category" value="Environment & Geography" />
                                                        <label htmlFor="environment_&_geography">Environment & Geography</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="history &_humanities" name="category" value="History & Humanities" />
                                                        <label htmlFor="history_&_humanities">History & Humanities</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="technology_&_engineering" name="category" value="Technology & Engineering" />
                                                        <label htmlFor="technology_&_engineering">Technology & Engineering</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="parenting_family_&_health" name="category" value="Parenting-Family & Health" />
                                                        <label htmlFor="parenting_family_&_health">Parenting, Family & Health</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="children_&_teens" name="category" value="Children & Teens" />
                                                        <label htmlFor="children_&_teens">Children & Teens</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="art_&_photography" name="category" value="Art & Photography" />
                                                        <label htmlFor="art_&_photography">Art & Photography</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="biographies_&_memories" name="category" value="Biographies & Memories" />
                                                        <label htmlFor="biographies_&_memories">Biographies & Memories</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="lifestyle" name="category" value="Lifestyle" />
                                                        <label htmlFor="lifestyle">Lifestyle</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="philosophy" name="category" value="Philosophy" />
                                                        <label htmlFor="philosophy">Philosophy</label>
                                                    </div>
                                                </fieldset>
                
                                                <fieldset id="price" className="range-slider">
                                                    <legend>Price Range:</legend>
                                                        <input type="range" id="minRange" min="0" max="15000" value={minPrice} step="1" onChange={minPriceUpdate} style={trackStyle } />
                                                        <input type="range" id="maxRange" min="0" max="15000" value={maxPrice} step="1" onChange={maxPriceUpdate} style={trackStyle } />
                                                    <div className="price-display">
                                                            <label htmlFor="minprice">Min: <span>{minPrice}</span></label>
                                                            <label htmlFor="maxprice">Max: <span>{maxPrice}</span></label>
                                                        </div>
                                                </fieldset>
                
                                                <fieldset id="rating">
                                                    <legend>Customer Ratings:</legend>
                                                    <div>
                                                        <input type="checkbox" id="4-above" name="Rating" value="4" />
                                                        <label htmlFor="4-above">4<span className="material-icons-outlined star">star</span> & above</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="3-above" name="Rating" value="3" />
                                                        <label htmlFor="3-above">3<span className="material-icons-outlined star">star</span> & above</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="2-above" name="Rating" value="2" />
                                                        <label htmlFor="2-above">2<span className="material-icons-outlined star">star</span> & above</label>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="1-above" name="Rating" value="1" />
                                                        <label htmlFor="1-above">1<span className="material-icons-outlined star">star</span> & above</label>
                                                    </div>
                                                </fieldset>
                
                                                <button>Apply</button>
                                            </form>
                                        </div>
                                    </div>
                    }

                    { srchBox  &&   <div id="srch-book-box" ref={searchBoxRef}>
                                        {
                                            searchedBook.map(book => {
                                                return (
                                                        <div className="book-dtl" id={book._id} key={book._id} onClick={clickSearchBook}>
                                                            <div className="bk-img">
                                                                <img src={book.Coverimg} alt="cover image" /> 
                                                            </div>                               
                                                            <div className="bk-dtl">
                                                                <div className="ttl">{book.Title}</div>
                                                                <div className="ct">{book.Category}</div>
                                                            </div>
                                                        </div>)
                                            })
                                        }
                                    </div>
                    }

                    <div id="outlet1">
                        <Outlet />
                    </div>
                </div>
            </div>
            </home.Provider>
}
