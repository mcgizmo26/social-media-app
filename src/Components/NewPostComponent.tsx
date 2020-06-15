// External Libraries **************************************************
import React, { useState, useEffect, useRef } from 'react';


import Button from './Button';
import axios from 'axios';

// React Component *****************************************************
const NewPostComponent = () => {
    const characterLength: number = 100;
    const [count, setCount] = useState(characterLength);
    const [comment, setComment] = useState("");
    const textArea = useRef<HTMLTextAreaElement>(null);

    function autosize(this: HTMLTextAreaElement) {
        var el = this;
        setTimeout(function () {
            el.style.cssText = 'height:auto;';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    };

    useEffect(() => {
        const ta = textArea.current as HTMLTextAreaElement;
        ta.addEventListener('keydown', autosize)
    });

    const changeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setComment(event.currentTarget.value);
        setCount( characterLength - event.currentTarget.value.length );
    };

    const postNewComponent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("button hit");
        axios.post('/api/createPost', {
            name: "User User",
            comment: comment,
            reactions:{
                likes: 0,
                shares: 0
            }
        });
    }

    return (
        <div className="newPostContainer">
            <form>
                <textarea
                    ref={textArea}
                    className="newPostTextArea"
                    placeholder="Let everyone know what your thinking"
                    maxLength={characterLength}
                    onChange={changeHandler}
                />
            </form>
            <div className="newPostTextFooter">
            {
                count >= 1 ? <div><span style={{fontWeight: "bold"}}>{count}</span> <span style={{fontSize: "12px"}}>characters left</span></div> : <span style={{fontSize: "12px", color: "red"}}>You have reached your character limit.</span>
            }
            <Button
                btnClassName={"primaryBtn smBtn signUpButton"}
                name={"Comment"}
                onClick={postNewComponent}
            />
            </div>
        </div>
    );
};

export default NewPostComponent;