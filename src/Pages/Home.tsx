// External Libraries **************************************************
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Project Imports *****************************************************
import '../Styles/app.css';
import HeaderNavigation from '../Components/HeaderNavigation';
import PageHeader from '../Components/PageHeader';
import NewPostComponent from '../Components/NewPostComponent';
import PostComponent from '../Components/PostComponent';
import HomepagePanelPageletMesg from '../Components/HomepagePanelPagletMesg';


// Interfaces **********************************************************
interface post {
    name: string,
    comment: string,
    reactions: {
        likes: number,
        shares: number
    }
}


// React Component *****************************************************
const Home = () => {

    const [dummyData , setDummyData] = useState<string>("");

    useEffect( () => {
        if(window.location.pathname === '/'){
            window.location.pathname = '/app/home';
        }
    });

    useEffect(() => {
        axios.get(`/api/home`)
        .then(function (response) {
            // handle success
            if(response.data){
                setDummyData(response.data.map((el: post, idx: number) => {
                    return <PostComponent key={el.name + idx} name={el.name} comment={el.comment} reactions={el.reactions} />
                }));
            };
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
    }, []);

    return (
        <div className="app">
            <HeaderNavigation />
            <PageHeader title={"Home"} />
            <div className="pageBody">
                <div className="homeBodyLeftContainer">
                    <NewPostComponent />
                    {
                        dummyData
                    }
                </div>
                <div className="homeBodyRightContainer">
                    <HomepagePanelPageletMesg />
                </div>
            </div>
        </div>
    )
};

export default Home;