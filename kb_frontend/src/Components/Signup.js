import axios from "axios";
import '../Styles/LoginSignup.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [nameValid,setNamevalid] = useState(true);
    const [emailValid,setEmailvalid] = useState(true);
    const [passwordValid,setPasswordvalid] = useState(true);
    
    const navigate=useNavigate();

    const signupAPI=async (e) => {
        e.preventDefault();

        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;

        let isValid = validityCheck(name,email,password);
        if(!isValid) return ;   // is the isValid is false to stop the execution of the API call

        const formDataToSend = new FormData();
            formDataToSend.append('name', name);
            formDataToSend.append('email', email);
            formDataToSend.append('password', password);

        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/signup`,
                method: "POST",
                data: formDataToSend,
                withCredentials: true,
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
            console.log(error);
            alert("An error occured, please try after some time",error);
        }
    }

    const validityCheck = (name,email,password) => {
        let regexName = /^[A-Za-z]{4,15}$/;
        let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        const isNameValid = regexName.test(name);
        const isEmailValid = regexEmail.test(email);
        const isPasswordValid = regexPassword.test(password);

        setNamevalid(isNameValid);
        setEmailvalid(isEmailValid);
        setPasswordvalid(isPasswordValid);

        return isNameValid && isEmailValid && isPasswordValid;
    }

    return (
        <div id="Signup" className="box">
            <div className="form">
                <h3>SIGNUP</h3>
                <form onSubmit={signupAPI} encType="multipart/form-data">
                    <div className="mb">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        { !nameValid && <div className="alert">Name pattern invalid, must be 4-15 alphabets only, no numbers or symbols</div> }
                    </div>
                    <div className="mb">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        { !emailValid && <div className="alert">Email pattern invalid</div> }
                    </div>
                    <div className="mb">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        { !passwordValid && <div className="alert">Password must contain a number, a symbol, a uppercase letter and a lowercase letter</div> }
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
                <div className='last'>Have an account?<Link to={"/login"}>Login</Link></div>
            </div>
        </div>);
}    


export default Signup;