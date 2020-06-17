const FormValidation = () => {
    const htmlNodeList = document.querySelectorAll("input");
    const fields: { [key: string]: boolean | string } = {
        firstname: false,
        lastname: false,
        email: false,
        phone: false,
        password: false,
        verifyPassword: false
    };

    let password: string = "";
    let count: number = 0;

    htmlNodeList.forEach( el => {
        let dataName = document.querySelector(`[data-name = ${el.name}]`) as HTMLElement;

        if(!el.value){
            dataName.innerHTML = ""
            dataName.innerHTML = `${el.placeholder} is a required field.`
        } else if(el.name !== "password" && el.name !== "verifyPassword"){
            fields[el.name] = el.value;
        } else {
            switch(el.name){
                case "password":
                    const passwordRegEx = RegExp(/^.*(?=.{4,10})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
                    if(!passwordRegEx.test(el.value)){
                        dataName.innerHTML = 'Password must include 1 capital letter, 1 lowercase letter, 1 number and be between 4-10 characters';
                    } else {
                        dataName.innerHTML = "";
                        fields[el.name] = el.value;
                    }
                    password = el.value;
                    break;
                case "verifyPassword":
                    if(password.trim() !== el.value.trim()){
                        dataName.innerHTML = 'Passwords do not match';
                    } else {
                        dataName.innerHTML = "";
                        fields[el.name] = el.value;
                    }
                    break;
                default:
                dataName.innerHTML = dataName.innerHTML === `${el.placeholder} is a required field.` ? "" : dataName.innerHTML;
            };
        }
    });

    for (const key in fields) {
        if(fields[key]) ++count;
    }

    if(Object.keys(fields).length === count) {
        return fields;
    } else {
        return false;
    }

};

export default FormValidation;