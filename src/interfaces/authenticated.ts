export interface IAuthenticated {
        authenticated: boolean
};

export interface IAuthenticatedAction {
        type: string,
        authenticated: boolean
};