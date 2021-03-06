const FormValidation = () => {
    const htmlNodeList = document.querySelectorAll("input");
    const fields: { [key: string]: boolean | string } = {};

    let password: string = "";
    let count: number = 0;

    htmlNodeList.forEach( el => {
        let dataName = document.querySelector(`[data-name = ${el.name}]`) as HTMLElement;

        if(!el.value){
            dataName.innerHTML = ""
            dataName.innerHTML = `${el.placeholder} is a required field.`
        } else if(el.name !== "password" && el.name !== "verifyPassword"){
            fields[el.name] = el.value;
            ++count;
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
                    ++count;
                    password = el.value;
                    break;
                case "verifyPassword":
                    if(password.trim() !== el.value.trim()){
                        dataName.innerHTML = 'Passwords do not match';
                    } else {
                        dataName.innerHTML = "";
                        fields[el.name] = el.value;
                    }
                    ++count;
                    break;
                default:
                dataName.innerHTML = dataName.innerHTML === `${el.placeholder} is a required field.` ? "" : dataName.innerHTML;
            };
        }
    });

    if(Object.keys(fields).length === count) {
        return fields;
    } else {
        return false;
    }

};

export default FormValidation;