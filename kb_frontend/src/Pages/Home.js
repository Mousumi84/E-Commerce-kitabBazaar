import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { details } from "../App";
import { useDispatch } from "react-redux";
import { filterPageApiCall } from "../Redux/Thunk/frontPageThunk";
import axios from "axios";
import FilterList from "../Utils/filterlist";

export const home = createContext();

export function Home() {
  const [filterData, setFilterData] = useState({});
  const [filter, setFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [srchBox, setSrchBox] = useState(false);
  const [searchedBook, setSearchedBook] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15000);
  const { isLogin } = useContext(details);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchBoxRef = useRef(null);
  const User = JSON.parse(localStorage.getItem("User"));

  const loginApiCall = () => {
    navigate("/login");
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const wishlistPage = () => {
    navigate("/wishlist");
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const cartPage = () => {
    navigate("/cart");
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const profilePage = () => {
    navigate("/profile");
  };

  //---------------Search Book-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  const searchBook = async (e) => {
    let search = e.target.value;
    setSrchBox(true);

    if (!search) setSrchBox(false);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/books/search-book?search=${search}`,
        method: "GET",
      });

      if (response.data.status !== 200) {
        alert(response.data.message);
        return;
      }

      setSearchedBook(response.data.data);
    } catch (error) {
      alert("search Failed due to some error");
    }
  };

  //Debouncing = to minimise the API call
  const debouncing = (oldFun) => {
    let id;

    return (...par) => {
      clearTimeout(id);

      id = setTimeout(() => {
        oldFun(...par);
      }, 300);
    };
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSrchBox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef, searchBoxRef]);

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const clickSearchBook = (e) => {
    const bookId = e.currentTarget.id;
    window.open(`/book/${bookId}`, "_blank");
  };

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const minPriceUpdate = (e) => {
    setMinPrice(e.target.value);
  };
  const maxPriceUpdate = (e) => {
    setMaxPrice(e.target.value);
  };

  const minPricePercent = (minPrice / 15000) * 100;
  const maxPricePercent = (maxPrice / 15000) * 100;

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
    dispatch(filterPageApiCall(0, filterData));
  };

  let noFilter =
    location.pathname.startsWith("/book") ||
    location.pathname.startsWith("/wishlist") ||
    location.pathname.startsWith("/cart") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/order_page") ||
    location.pathname.startsWith("/myorder");

  return (
    <home.Provider value={{ filterData, filter }}>
      <div id="home">
        <nav>
          <div id="navbar">
            <img
              src="/KitabBazaar.jpg"
              onClick={() => navigate("/")}
              alt="logo"
            />
            <div id="search-box">
              <input
                type="search"
                onKeyUp={debouncing(searchBook)}
                autoComplete="off"
                ref={searchInputRef}
              />
              <span className="material-icons-outlined">search</span>
            </div>
            {isLogin ? (
              <div className="islog">
                <button onClick={wishlistPage}>
                  <span className="material-icons-outlined">favorite</span>
                  WISHLIST
                </button>
                <button onClick={cartPage}>
                  <span className="material-icons-outlined">shopping_cart</span>
                  CART
                </button>
                <button onClick={profilePage}>
                  <span className="material-icons-outlined">person</span>
                  {User.name}
                </button>
              </div>
            ) : (
              <div className="islog">
                <button onClick={loginApiCall}>
                  <span className="material-icons-outlined">person</span>LOGIN
                </button>
              </div>
            )}
          </div>
        </nav>

        <div id="content">
          {!noFilter && (
            <div id="filter-box">
              <div id="flt">FILTERS</div>
              <div id="filters">
                <form onSubmit={filterSumbit}>
                  {/* Language Filter */}
                  <fieldset id="language">
                    <legend>Language:</legend>
                    {FilterList.Language.map((lang) => (
                      <div key={lang.id}>
                        <input
                          type="checkbox"
                          id={lang.id}
                          name={lang.name}
                          value={lang.value}
                        />
                        <label htmlFor={lang.id}>{lang.value}</label>
                      </div>
                    ))}
                  </fieldset>

                  {/* Category Filter */}
                  <fieldset id="category">
                    <legend>Category:</legend>
                    {FilterList.Category.map((cat) => (
                      <div key={cat.id}>
                        <input
                          type="checkbox"
                          id={cat.id}
                          name={cat.name}
                          value={cat.value}
                        />
                        <label htmlFor={cat.id}>{cat.value}</label>
                      </div>
                    ))}
                  </fieldset>

                  {/* Price Filter */}
                  <fieldset id="price" className="range-slider">
                    <legend>Price Range:</legend>
                    <input
                      type="range"
                      id="minRange"
                      min="0"
                      max="15000"
                      value={minPrice}
                      step="1"
                      onChange={minPriceUpdate}
                      style={trackStyle}
                    />
                    <input
                      type="range"
                      id="maxRange"
                      min="0"
                      max="15000"
                      value={maxPrice}
                      step="1"
                      onChange={maxPriceUpdate}
                      style={trackStyle}
                    />
                    <div className="price-display">
                      <label htmlFor="minprice">
                        Min: <span>{minPrice}</span>
                      </label>
                      <label htmlFor="maxprice">
                        Max: <span>{maxPrice}</span>
                      </label>
                    </div>
                  </fieldset>

                  {/* rating Filter */}
                  <fieldset id="rating">
                    <legend>Ratings:</legend>
                    {FilterList.Rating.map((rating) => (
                      <div key={rating.id}>
                        <input
                          type="checkbox"
                          id={rating.id}
                          name={rating.name}
                          value={rating.value}
                        />
                        <label htmlFor={rating.id}>{rating.value}</label>
                      </div>
                    ))}
                  </fieldset>

                  <button>Apply</button>
                </form>
              </div>
            </div>
          )}

          {srchBox && (
            <div id="srch-book-box" ref={searchBoxRef}>
              {searchedBook.map((book) => {
                return (
                  <div
                    className="book-dtl"
                    id={book._id}
                    key={book._id}
                    onClick={clickSearchBook}
                  >
                    <div className="bk-img">
                      <img src={book.Coverimg} alt="cover pic" />
                    </div>
                    <div className="bk-dtl">
                      <div className="ttl">{book.Title}</div>
                      <div className="ct">{book.Category}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div id="outlet1">
            <Outlet />
          </div>
        </div>
      </div>
    </home.Provider>
  );
}
