// External Libraries **************************************************
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';

// Project Imports *****************************************************
import '../Styles/app.css';
import HeaderNavigation from '../Components/HeaderNavigation';
import PageHeader from '../Components/PageHeader';
import NewPostComponent from '../Components/NewPostComponent';
import PostComponent from '../Components/PostComponent';
import HomepagePanelPageletMesg from '../Components/HomepagePanelPagletMesg';
import { IPost as post } from '../interfaces/posts';


// React Component *****************************************************
const Home = () => {
    const [dummyData , setDummyData] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/app/posts/getComments`)
        .then(function (response) {
            // handle success
            if(response.data){
                setDummyData(response.data.map((el: post, idx: number) => {
                    return <PostComponent key={el.name + idx} name={el.name} comment={el.comment} reactions={el.reactions} />
                }));
            };
          })
          .catch(function (error) {
            if(error.response.status === 401 || error.response.status === 403){
                // Must wrap useDispatch in an IIFE to prevent useDispatch in useEffect error.
                (async () => {
                    window.location.pathname = '/';
                    if(localStorage.getItem("loggedIn")){
                        localStorage.removeItem("loggedIn");
                    }
                })();
            }
          });
    }, [dispatch]);

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