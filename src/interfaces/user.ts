export interface IUSER {
    user_id: number | boolean,
    firstname: string,
    lastname: string,
    email: string
};

export interface IUserRootState {
    user: IUSER
};

export interface IuserAction {
    type: string,
    user: IUSER,
};