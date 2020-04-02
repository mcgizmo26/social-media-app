// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import '../Styles/app.css';
import HeaderNavigation from '../Components/HeaderNavigation';
import PageHeader from '../Components/PageHeader';
import NewPostComponent from '../Components/NewPostComponent';
import PostComponent from '../Components/PostComponent';
import HomepagePanelPagelet from '../Components/HomepagePanelPaglet';
import DummyDataGetter from '../dummyData/dummyData';


// React Component *****************************************************
const Home = () => {
    let dummyDataArray = DummyDataGetter();
    return (
        <div className="app">
            <HeaderNavigation />
            <PageHeader title={"Home"} />
            <div className="pageBody">
                <div className="homeBodyLeftContainer">
                    <NewPostComponent />
                    {
                        dummyDataArray.map((el, idx) => {
                            return <PostComponent key={el.name + idx} name={el.name} comment={el.comment} reactions={el.reactions} />
                        })
                    }
                </div>
                <div className="homeBodyRightContainer">
                    <HomepagePanelPagelet />
                </div>
            </div>
        </div>
    )
};

export default Home;