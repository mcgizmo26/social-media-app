// External Libraries **************************************************
import React from 'react';
import { RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends Omit<RouteProps, "component"> {
    component: React.ElementType;
};