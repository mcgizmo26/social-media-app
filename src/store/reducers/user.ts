// Project Imports *****************************************************
import { AUTHENTICATED } from '../actions/user';


// Initial State *******************************************************
const initialState = {
    Authenticated: false
};


// Project Imports *****************************************************
interface userAction {
    type: string,
    authenticated: boolean
};


// Reducers ************************************************************
const userReducer = (state = initialState, action: userAction) => {
    switch (action.type) {
        case AUTHENTICATED:
                return { ...state, Authenticated: action.authenticated };

        default:
            return state;
    }
};


export default userReducer;