// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import '../Styles/components.css';


// Interfaces **********************************************************
interface BttnInterface {
    btnClassName: string,
    name: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}


// React Component *****************************************************
const Button = ({ btnClassName, name, onClick }: BttnInterface) => {
    return (
        <button
            className={`btn ${btnClassName}`}
            value={name}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default Button;