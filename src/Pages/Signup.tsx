// External Libraries **************************************************
import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Project Imports *****************************************************
import '../Styles/app.css';
import Form1 from '../Components/Form1';
import FormValidation from '../Functions/FormValidation';



// React component *****************************************************
const Signup = () => {
    const [userCreds, setUserCreds] = useState(
        {
            firstname: "",
            lastname: "",
            username: "",
            password: ""
        }
    );

    let signInArr = [
        { name: "firstname", placeHolder: "First Name", type: "text" },
        { name: "lastname", placeHolder: "Last Name", type: "text" },
        { name: "email", placeHolder: "Email", type: "email" },
        { name: "phone", placeHolder: "Phone", type: "text" },
        { name: "password", placeHolder: "Password", type: "password" },
        { name: "verifyPassword", placeHolder: "Verify Password", type: "password" }
    ];

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue: string = event.target.value;
        let inputName: string = event.target.name;

        setUserCreds({
            ...userCreds,
            [inputName]: inputValue
        });

    };

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let sndObj = FormValidation();

        if (sndObj) {
            const errorContainer = document.getElementById('form1-error-container');
            if (errorContainer) errorContainer.innerHTML = "";

            try {
                axios.post('/authenticate/signup', sndObj)
                    .then(res => {

                    })
                    .catch(err => {
                        if (err.response.status === 409 && errorContainer) {
                            errorContainer.innerHTML = err.response.data;
                        }
                    })
            } catch (err) {
                if (errorContainer) {
                    errorContainer.innerHTML = "Oops something went wrong. Try again later.";
                }
            }
        };
    };

    return (
        <div className="app">
            <div className="form1Container">
                <h1>Be Social</h1>
                <Form1
                    signInArr={signInArr}
                    name= "Create Account"
                    onChange={onInputChangeHandler}
                    onClick={onClickHandler}
                />
                <div>
                    <Link to="/resetpassword">Reset Password</Link>
                    <span> | </span>
                    <Link to="/login">Sign in to your account</Link>
                </div>
            </div>
        </div>
    )
};

export default Signup;