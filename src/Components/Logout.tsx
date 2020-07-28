import React from 'react';
import { useSelector } from 'react-redux';


import "../Styles/header.css";
import { IUserRootState } from '../interfaces/user';
import axios from 'axios';

const Logout = () => {
    const user = useSelector((state: IUserRootState) => state.user);

    // console.log(user);

    const onClickHandler = () => {
        axios.post('/public/logout', user)
            .then(res => {

            })
    };

    return (
        <div className="linkStyles" onClick={onClickHandler}>Logout</div>
    )
};

export default Logout;