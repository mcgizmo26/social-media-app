// External Libraries **************************************************
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Interfaces **********************************************************
interface RootState {
    user: {
        Authenticated: boolean
    }
};

interface ProtectedRouteProps extends Omit<RouteProps, "component"> {
    component: React.ElementType;
}


// React Component *****************************************************
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const authenticated = useSelector((state: RootState) => state.user.Authenticated);

    if (authenticated) {
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