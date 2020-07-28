// External Libraries **************************************************
import React, { useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


// Project Imports *****************************************************
import { IUserRootState } from '../interfaces/user';
import { IAuthenticated } from '../interfaces/authenticated';
import { ProtectedRouteProps } from '../interfaces/protected-routes';
import { userInfo } from '../store/actions/user';


// React Component *****************************************************
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const loggedIn = localStorage.getItem("loggedIn");
    const user = useSelector((state: IUserRootState) => state.user);
    const authenticated = useSelector((state: IAuthenticated) => state.authenticated );
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (!authenticated) {
            axios.post(`public/authenticate/check`)
                    .then(res => {
                        dispatch(userInfo(res.data.user));
                    });
        };
    }, [authenticated, user, dispatch]);

    if (loggedIn) {
        return (
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            } />
        )
    } else {

        return <Redirect to={
            {
                pathname: '/',
            }
        } />
    }
};

export default ProtectedRoute;