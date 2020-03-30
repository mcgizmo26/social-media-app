// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import '../Styles/app.css';
import HeaderNavigation from '../Components/HeaderNavigation';
import PostComponent from '../Components/PostComponent';
import DummyDataGetter from '../dummyData/dummyData';


// React Component *****************************************************
const Home = () => {
    let dummyDataArray = DummyDataGetter();
    return (
        <div className="app">
            <HeaderNavigation />
            <div className="pageBody">
                <h3>Home</h3>
            {
                    dummyDataArray.map((el, idx) => {
                        return <PostComponent key={el.name + idx} name={el.name} comment={el.comment} reactions={el.reactions} />
                    })
                }
            </div>
        </div>
    )
};

export default Home;