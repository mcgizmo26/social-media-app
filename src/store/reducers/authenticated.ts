import { AUTHENTICATED } from '../actions/authenticated';
import { IAuthenticatedAction }  from '../../interfaces/authenticated';


// Initial State *******************************************************
const initialState = false;


// Reducers ************************************************************
const authenticatedReducer = (state = initialState, action: IAuthenticatedAction) => {
    switch (action.type) {
        case AUTHENTICATED:
                return action.authenticated;
        default:
            return state;
    }
};


export default authenticatedReducer;