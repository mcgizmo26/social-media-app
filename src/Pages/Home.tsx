import React from 'react';

import HeaderNavigation from '../Components/HeaderNavigation';

import '../Styles/app.css';

const Home = () => {
    return (
        <div className="app">
            <HeaderNavigation />
            <span>This is the Home Page.</span>
        </div>
    )
};

export default Home;