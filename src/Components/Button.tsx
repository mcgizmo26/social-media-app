import React from 'react';

import '../Styles/components.css';

interface BttnInterface {
    btnClassName: string,
    name: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

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