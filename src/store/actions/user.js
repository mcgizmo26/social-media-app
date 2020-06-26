export const AUTHENTICATED = 'AUTHENTICATED';


/* Action Functions*/
export const userAuthenticate = (authenticated) => {
    return {type: AUTHENTICATED, authenticated: authenticated}
};