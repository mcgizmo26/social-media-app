// Project Imports *****************************************************
import { USER } from '../actions/user';
import { IuserAction }  from '../../interfaces/user';


// Initial State *******************************************************
const initialState = {
        user_id: false,
        firstname: "",
        lastname: "",
        email: ""
};


// Reducers ************************************************************
const userReducer = (state = initialState, action: IuserAction) => {
    switch (action.type) {
        case USER:
                const user = action.user;
                return { ...state, ...user };
        default:
            return state;
    }
};


export default userReducer;