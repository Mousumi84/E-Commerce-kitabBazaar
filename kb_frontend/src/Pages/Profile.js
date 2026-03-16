import { useNavigate } from "react-router-dom";
import '../Styles/Profile.css';
import axios from "axios";
import { useContext } from "react";
import { details } from "../App";


function Profile() {
    const {setIsLogin} = useContext(details);
    const navigate = useNavigate();
    const User = JSON.parse(localStorage.getItem("User")) || {};
    const token = localStorage.getItem("KitabBaxaarToken") || "";


    const logoutAPICall = async (e) => {
        e.preventDefault();

        try {
            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/logout`,
                method: "POST",
                withCredentials: true,
                headers: {Authorization: token}
            });

            if(response.data.status !==  200) {
                alert(response.data.message);
                return;
            }

            localStorage.removeItem("KitabBaxaarToken");
            localStorage.removeItem("User");
            localStorage.removeItem("cartState");
            setIsLogin(false);

            navigate("/");
            
        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }

    return  <div id="Profile">
                <div id="left">
                    <dl>
                        <dt>MY ORDERS</dt>
                        <dt>ACCOUNT SETTINGS</dt>
                            <dd><a href="#profile-info">Profile Information</a></dd>
                            <dd>Manage Addresses</dd>
                            <dd>PAN Card Information</dd>
                        <dt>PAYMENTS</dt>
                            <dd>Gift Cards</dd>
                            <dd>Saved UPI</dd>
                            <dd>Saved Cards</dd>
                        <dt>MY STUFF</dt>    
                            <dd>My Coupons</dd>
                            <dd>My Reviews & Ratings</dd>
                            <dd onClick={() => navigate('/myorder')}>My Orders</dd>
                            <dd onClick={() => navigate('/wishlist')}>My Wishlist</dd>
                            <dd onClick={() => navigate('/cart')}>My Cart</dd>
                        <dt><button onClick={logoutAPICall}>LOGOUT</button></dt>    
                    </dl>
                </div>
                <div id="right">
                    <div id="profile-info">
                        <h3>Profile Information</h3>
                        <table id="info">
                            <tbody>
                                <tr>
                                    <td>Name: </td>
                                    <td className="ans">{User.name}</td>
                                </tr>
                                <tr>
                                    <td>Email Address: </td>
                                    <td className="ans">{User.useremail}</td>
                                </tr>
                                <tr>
                                    <td>Mobile Number: </td>
                                    <td className="ans">9898998801</td>
                                </tr>   
                            </tbody>
                        </table>
                        <div id="faq">
                            <h5>FAQs</h5>
                            <div>
                                <span>What happens when I update my email address (or mobile number)?</span>
                                <p>Your login email id (or mobile number) changes, likewise. 
                                    You'll receive all your account related communication on your updated email address (or mobile number).</p>
                            </div>
                            <div>
                                <span>When will my Flipkart account be updated with the new email address (or mobile number)?</span>
                                <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                            </div>
                            <div>
                                <span>What happens to my existing Flipkart account when I update my email address (or mobile number)?</span>
                                <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                            </div>
                            <div>
                                <span>Does my Seller account get affected when I update my email address?</span>
                                <p>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
}

export default Profile;