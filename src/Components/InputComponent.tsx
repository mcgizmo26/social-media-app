// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import '../Styles/components.css';


// Interfaces **********************************************************
interface propInterface {
    id: string,
    name: string,
    placeHolder: string,
    type: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void

}


// React Component *****************************************************
const InputComponent = ({ id, name, placeHolder, type, onChange }: propInterface) => {
    return (
        <div className="inputContainer">
            <input
                className="inputCustom"
                id={id}
                name={name}
                placeholder={placeHolder}
                type={type}
                onChange={onChange}
            />
            <div className="errorText" data-name={name}></div>
        </div>
    )
};

export default InputComponent;