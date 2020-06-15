export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const addComments = comment => {
    return { type: ADD_COMMENT, comments: comment}
};

export const removeComment = commentId => {
    return { type: REMOVE_COMMENT, cid: commentId }
}