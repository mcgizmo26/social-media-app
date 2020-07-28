// Project Imports *****************************************************
import { IUSER } from "../../interfaces/user";

// Variables Export ****************************************************
export const USER = 'user';


// Actions *************************************************************
export const userInfo = (user: IUSER | Promise<IUSER>) => {
    return {type: USER, user}
};