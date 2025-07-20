const validateEmail = (email) => {
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email
      );
    return isEmail;
};


const dataValidation=({name,email,password}) => {
    return new Promise((resolve,reject) => {
        
        console.log(name,email,password)
        if(!name || !email || !password) {
            
           
            if(!name)
                reject("Name credentials missing");
            if(!email)
                reject("Email credentials missing");
            if(!password)
                reject("Password credentials missing");

        }

        if(typeof(name) !== "string" )
            reject("Incorrect formate of name");
        if(typeof(email) !== "string" )
            reject("Incorrect formate of email");
        if(typeof(password) !== "string" )
            reject("Incorrect formate of password");


        if(!validateEmail(email))
            reject("Incorrect formate of email");

        resolve();

    });
}


const dataValidationLogin=({email,password}) => {
    return new Promise((resolve,reject) => {
        
        if(!email || !password)
            reject("Important credentials missing");

        if(typeof(email) !== "string" )
            reject("Incorrect formate of email");
        if(typeof(password) !== "string" )
            reject("Incorrect formate of password");


        if(!validateEmail(email))
            reject("Incorrect formate of email");

        resolve();

    });
}


const dataValidationAddressUpdate=({name,phone,pincode,locality,area,city,state,addtype}) => {
    return new Promise((resolve,reject) => {
        
        if(!name || !phone || !pincode || !locality || !area || !city || !state || !addtype)
            reject("Important credentials missing");

        resolve();

    });
}

module.exports = {dataValidation,dataValidationLogin,dataValidationAddressUpdate};