// External Libraries **************************************************
import React, { useState, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


// Project Imports *****************************************************
import FormValidation from '../Functions/FormValidation';
import Form1 from '../Components/Form1';


// React Component *****************************************************
const Login = () => {
    const history = useHistory();
    const [userCreds, setCreds] = useState(
        {
            username: "",
            password: ""
        }
    );

    const signInArr = [
        { name: "email", placeHolder: "Email", type: "email" },
        { name: "password", placeHolder: "Password", type: "text" },
    ];

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue: string = event.target.value;
        let inputName: string = event.target.name;

        setCreds({
            ...userCreds,
            [inputName]: inputValue
        })
    };

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let sndObj = FormValidation();

        if (sndObj) {
            const errorContainer = document.getElementById('form1-error-container');
            if (errorContainer) errorContainer.innerHTML = "";

            console.log(sndObj);

            try {
                axios.post('/authenticate/login', sndObj)
                    .then(res => {
                        if(res.status === 200){
                            history.push(res.data.url);
                        }
                    })
                    .catch(err => {
                        if (err.response.status === 401 && errorContainer) {
                            errorContainer.innerHTML = err.response.data.message;
                        }
                    })
            } catch (err) {
                if (errorContainer) {
                    errorContainer.innerHTML = "Oops something went wrong. Try again later.";
                }
            }
        }
    };

    return (
        <div className="app">
            <div className="form1Container">
                <h1>Be Social</h1>
                <Form1
                    signInArr={signInArr}
                    name = "Log In"
                    onChange={onInputChangeHandler}
                    onClick={onClickHandler}
                />
                <div>
                    <Link to="/resetpassword">Reset Password</Link>
                    <span> | </span>
                    <Link to="/signup">Sign up for an account</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;