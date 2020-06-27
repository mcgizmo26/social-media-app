// Project Imports *****************************************************
import  { ADD_COMMENT, REMOVE_COMMENT } from '../actions/comment';
import CommentModel from '../../models/comment';


// Initial State *******************************************************
const initialState = {
    comments: {}
};


// Project Imports *****************************************************
interface commentAction {
    type: string,
    comment: CommentModel
};


// Reducers ************************************************************
export default (state = initialState, action: commentAction) => {
    switch (action.type){
        case ADD_COMMENT:
            const addedComment = action.comment;

            let updatedComments = new CommentModel(
                addedComment.userId,
                addedComment.name,
                addedComment.commentId,
                addedComment.comment,
                addedComment.reactions
            );
            return {
                ...state,
                comments: {...state.comments, updatedComments}
            };
        case REMOVE_COMMENT:

            break;
        default:
            break;
    }
}

