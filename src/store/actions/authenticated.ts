// Project Imports *****************************************************
// import { IAuthenticated } from "../../interfaces/authenticated";

// Variables Export ****************************************************
export const AUTHENTICATED = 'AUTHENTICATED';


// Actions *************************************************************
export const authenticateUser = (authenticated: boolean ) => {
    return {type: AUTHENTICATED, authenticated}
};