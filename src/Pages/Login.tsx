// External Libraries **************************************************
import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';


// Project Imports *****************************************************
import Form1 from '../Components/Form1';


// React Component *****************************************************
const Login = () => {
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

    };

    return (
        <div className="app">
            <div className="form1Container">
                <Form1
                    signInArr={signInArr}
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