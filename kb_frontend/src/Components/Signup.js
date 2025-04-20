import axios from "axios";
import '../Styles/LoginSignup.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
                                                name: '',
                                                email: '',
                                                password: '',
                                            });
    const navigate=useNavigate();

    const signupAPI=async (e) => {
        e.preventDefault();

        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;

        setFormData({
            name: name,
            email: email,
            password: password,
        });

        const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);


        try {
            const response=await axios({
                url: "${process.env.REACT_APP_API_URL}/auth/signup",
                method: "POST",
                data: formDataToSend,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            navigate("/login");

        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return (
        <div id="Signup" className="box">
            <div className="form">
                <h3>SIGNUP</h3>
                <form onSubmit={signupAPI} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
                <div className='last'>Have an account?<Link to={"/login"}>Login</Link></div>
            </div>
        </div>);
}    


export default Signup;