// External Libraries **************************************************
import React, { useState, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';


// Project Imports *****************************************************
import FormValidation from '../Functions/FormValidation';
import Form1 from '../Components/Form1';
import { userInfo } from '../store/actions/user';


// Interfaces **********************************************************
interface RootState {
    authenticated: boolean
};


// React Component *****************************************************
const Login = () => {
    const history = useHistory();
    const [userCreds, setCreds] = useState(
        {
            username: "",
            password: ""
        }
    );
    const dispatch = useDispatch();

    const signInArr = [
        { name: "email", placeHolder: "Email", type: "email" },
        { name: "password", placeHolder: "Password", type: "password" },
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

            try {
                axios.post('/public/login', sndObj)
                    .then(res => {
                        if(res.status === 200){
                            dispatch(userInfo(res.data.user));
                            localStorage.setItem('loggedIn', 'true');

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