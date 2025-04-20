import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Home';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { FrontPage } from './Components/FrontPage';
import { createContext, lazy, Suspense, useState } from 'react';
import BookWrap from './Utils/BookWrap';

const Book = lazy(() => import('./Components/Book'));
const Wishlist = lazy(() => import('./Components/Wishlist'));
const Cart = lazy(() => import('./Components/Cart'));
const Login = lazy(() => import('./Components/Login'));
const Signup = lazy(() => import('./Components/Signup'));
const Profile = lazy(() => import('./Components/Profile'));
const Order = lazy(() => import('./Components/Order'));
const MyOrder = lazy(() => import('./Components/MyOrder'));

export const details = createContext();

function App() {
  const [isLogin,setIsLogin] = useState(() => Boolean(localStorage.getItem("KitabBaxaarToken")));
  
  return (
    <Provider store={store} >
    <details.Provider value={{isLogin,setIsLogin}}>
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Home />} >
                    <Route path='/' element={<Suspense fallback={<div>...loading</div>}>
                                                <FrontPage />
                                            </Suspense> }/>
                    <Route path='/profile' element={<Suspense fallback={<BookWrap />}>
                                                            <Profile />
                                                        </Suspense> }/>
                    <Route path='/book/:bookId' element={<Suspense fallback={<BookWrap />}>
                                                            <Book />
                                                        </Suspense> }/>
                    <Route path='/myorder' element={<Suspense fallback={<BookWrap />}>
                                                    <MyOrder />
                                                </Suspense> }/>
                    <Route path='/wishlist' element={<Suspense fallback={<BookWrap />}>
                                                        <Wishlist />
                                                    </Suspense> }/>
                    <Route path='/cart' element={<Suspense fallback={<BookWrap />}>
                                                    <Cart />
                                                </Suspense> }/>
                    <Route path='/order_page' element={<Suspense fallback={<BookWrap />}>
                                                    <Order />
                                                </Suspense> }/>
                </Route>
                <Route path='/login' Component={Login} />
                <Route path='/signup' Component={Signup} />
            </Routes>
        </BrowserRouter>
    </div>
    </details.Provider>
    </Provider>
  );
}

export default App;
