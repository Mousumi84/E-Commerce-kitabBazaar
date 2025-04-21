import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginSignup.css';
import { useContext } from 'react';
import axios from 'axios';
import { details } from "../App";

function Login() {
    const {setIsLogin} = useContext(details);
    const navigate = useNavigate();

    const loginAPI = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios({
                url: "${process.env.REACT_APP_API_URL}/auth/login",
                method: "POST",
                data: {
                    email:email,
                    password:password,
                },
                withCredentials: true,
            });

            if(response.data.status !==  200) {
                alert(response.data.message);
                return;
            }

            let token = response.data.token;
            localStorage.setItem("KitabBaxaarToken",token);
            localStorage.setItem("User",JSON.stringify(response.data.session.user));
            setIsLogin(true);
           // window.location.reload(); 

           window.location.href = "/";
            
        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return  <>
                <div id="login" className="box">
                    <div className="form">
                        <h3>LOGIN</h3>
                        <form onSubmit={loginAPI}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    
                        <div className='last'>Don't have an account?<Link to={"/signup"}>Signup</Link></div>
                    </div>
                </div>
            </>
}

export default Login;