// External Libraries **************************************************
import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faShareSquare as farShareSquare } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart, faShareSquare as fasShareSquare } from "@fortawesome/free-solid-svg-icons";



// Interfaces **********************************************************
interface PostPropsInterface {
    name: string,
    comment: string,
    reactions: PostReactionsInterface
};

interface PostReactionsInterface {
    likes: number,
    shares: number
};


// React Component *****************************************************
const PostComponent = ({ name, comment, reactions }: PostPropsInterface) => {

    const [reaction, setReaction] = useState({
        like: false,
        share: false
    });

    const likeClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setReaction({
            ...reaction,
            like: !reaction.like
        });
    };

    const shareClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setReaction({
            ...reaction,
            share: !reaction.share
        });
    }

    return (
        <div className="postContainer">
            <div className="postHeaderName">{name}:</div>
            <br />
            <div className="postComment">"{comment}"</div>
            <br />
            <div className="reactionsContainer">
                <div className="reactionLikeWrapper">
                    <FontAwesomeIcon icon={reaction.like ? fasHeart : farHeart} style={reaction.like ? {color: "red"} : {color: "black"}} onClick={likeClickHandler}/>
                    <span>Likes: {reactions.likes}</span>
                </div>
                <div className="reactionShareWrapper">
                    <FontAwesomeIcon icon={reaction.share ? fasShareSquare : farShareSquare} style={reaction.share ? {color: "red"} : {color: "black"}} onClick={shareClickHandler}/>
                    <span>Shares: {reactions.shares}</span>
                </div>
            </div>
        </div>
    )
};

export default PostComponent;