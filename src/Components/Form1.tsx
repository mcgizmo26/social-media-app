// External Libraries **************************************************
import React from 'react';


// Project Imports *****************************************************
import InputComponent from '../Components/InputComponent';
import Button from '../Components/Button';


// Interfaces **********************************************************
interface Form1Interface {
    signInArr: Array<SigninArrObj>,
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
};

interface SigninArrObj {
    name: string,
    placeHolder: string,
    type: string
};


// React Component *****************************************************
const Form1 = ({ signInArr, name, onChange, onClick }: Form1Interface) => {
    return (
        <form className="form1">
            {
                signInArr.map((el, idx: number) => {
                    return <InputComponent
                        key={idx}
                        id={el.name}
                        name={el.name}
                        placeHolder={el.placeHolder}
                        type={el.type}
                        onChange={onChange}
                    />
                })
            }

            <Button
                btnClassName={"primaryBtn lgBtn signUpButton"}
                name={name}
                onClick={onClick}
            />

            <div id="form1-error-container" className="errorText"></div>
        </form>
    )
};

export default Form1;