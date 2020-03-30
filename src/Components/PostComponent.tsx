// External Libraries **************************************************
import React from 'react';


interface PostPropsInterface {
    name: string,
    comment: string,
    reactions: PostReactionsInterface
};

interface PostReactionsInterface {
    likes: number,
    dislikes: number
};


// React Component *****************************************************
const PostComponent = ({ name, comment, reactions }: PostPropsInterface) => {
    return (
        <div className="postContainer">
            <div className="postHeaderName">{name}:</div>
            <br />
            <div className="postComment">"{comment}"</div>
            <br />
            <div className="reactionsContainer">
                <span>Likes: {reactions.likes}</span>
                <span>Dislikes: {reactions.dislikes}</span>
            </div>
        </div>
    )
};

export default PostComponent;