// Variables Export ****************************************************
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


// Actions *************************************************************
export const addComments = (comment: string) => {
    return { type: ADD_COMMENT, comments: comment}
};

export const removeComment = (commentId: number) => {
    return { type: REMOVE_COMMENT, cid: commentId }
};
