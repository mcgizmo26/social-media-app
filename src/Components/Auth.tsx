import React from 'react';

const Auth = () => {
    const cookies = document.cookie;
    console.log(process.env.REACT_APP_COOKIE);
    console.log(cookies);
    // const cookie: string = process.env.APP_COOKIE;
    // if(!cookies[cookie])
    return (
        <div></div>
    )
};

export default Auth;