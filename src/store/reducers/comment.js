import  { ADD_COMMENT, REMOVE_COMMENT } from '../actions/comment';
import CommentModel from '../../models/comment';

const initialState = {
    comments: {}
};

export default (state = initialState, action) => {
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

