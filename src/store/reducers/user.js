import { AUTHENTICATED } from '../actions/user';


/* The reducer file needs an initialState object*/
const initialState = {
    Authenticated: false
};


/* Reducers are functions that take a state value and an action */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
                return { ...state, Authenticated: action.authenticated };

        default:
            return state;
    }
};


export default userReducer;