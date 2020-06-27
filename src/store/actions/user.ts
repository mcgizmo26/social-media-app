// Variables Export ****************************************************
export const AUTHENTICATED = 'AUTHENTICATED';


// Actions *************************************************************
export const userAuthenticate = (authenticated: boolean) => {
    return {type: AUTHENTICATED, authenticated: authenticated}
};