// External Libraries **************************************************
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Project Imports ***************************************************** 
import Form1 from '../Components/Form1';


// React Component *****************************************************
const ResetPassword = () => {
    const [resetPassword, setResetPassword] = useState(
        {
            email: ""
        }
    );

    let signInArr = [
        { name: "email", placeHolder: "Email", type: "email" }
    ];

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue: string = event.target.value;
        let inputName: string = event.target.name;

        setResetPassword({
            ...resetPassword,
            [inputName]: inputValue
        })
    };

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

    };

    return (
        <div className="app">
            <div className="form1Container">
                <h1>Be Social</h1>
                <Form1
                    signInArr={signInArr}
                    onChange={onInputChangeHandler}
                    onClick={onClickHandler}
                />
                <div>
                    <Link to="/login">Sign in to your account</Link>
                    <span> | </span>
                    <Link to="/signup">Sign up for an account</Link>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;