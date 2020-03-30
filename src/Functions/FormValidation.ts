const FormValidation = () => {
    const htmlNodeList = document.querySelectorAll("input");
    let password: string = "";

    htmlNodeList.forEach( el => {
        let dataName = document.querySelector(`[data-name = ${el.name}]`) as HTMLElement;

        if(!el.value){
            dataName.innerHTML = ""
            dataName.innerHTML = `${el.placeholder} is a required field.`
        } else {
            switch(el.name){
                case "password": 
                    const passwordRegEx = RegExp(/^.*(?=.{4,10})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
                    if(!passwordRegEx.test(el.value)){
                        dataName.innerHTML = 'Password must include 1 capital letter, 1 lowercase letter, 1 number and be between 4-10 characters';
                    } else {
                        dataName.innerHTML = "";
                    }
                    password = el.value;
                    break;
                case "verifyPassword":
                    if(password.trim() !== el.value.trim()){
                        dataName.innerHTML = 'Passwords do not match';
                    } else {
                        dataName.innerHTML = "";
                    }
                    break;
                default: 
                dataName.innerHTML = dataName.innerHTML === `${el.placeholder} is a required field.` ? "" : dataName.innerHTML;
            };
        }
    }); 
    
};

export default FormValidation;