interface Reactions {
    likes: number,
    shares: number
}


class CommentModel {
    userId: number;
    name: string;
    commentId: number;
    comment: string;
    reactions: Reactions
    constructor(userId: number, name: string, commentId: number, comment: string, reactions: Reactions) {
        this.userId = userId;
        this.name = name;
        this.commentId = commentId;
        this.comment = comment;
        this.reactions = reactions;
    }
};

export default CommentModel;