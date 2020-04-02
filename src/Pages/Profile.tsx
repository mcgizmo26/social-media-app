// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import HeaderNavigation from '../Components/HeaderNavigation';


// React Component *****************************************************
const Profile = () => {
    return (
        <div className="app">
            <HeaderNavigation />
            <div className="pageBody">
                <span>This is the Profile Page.</span>
            </div>
        </div>
    )
};

export default Profile;