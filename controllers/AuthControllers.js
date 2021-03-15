const UserData = require("../modal/UserData")



module.exports.signup_Get = (req, res) => {
    res.send("Signup get")
}
module.exports.signup_Post =async (req, res) => {
    const { email, password, fullName, mobileNo } = req.body;
    try {
        const user = await UserData.create({ fullName, mobileNo, email, password })
        res.status(201).json(user)

    } catch (error) {
        //console.log(error);
      const newError=  handlerError(error)
        
        res.status(400).json({newError})
    }
}
module.exports.login_Get = (req, res) => {
    res.send("login get")
}
module.exports.login_Post = (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    res.send("login get")
}


const handlerError = (e) => {
    let error = { fullName: '', mobileNo: '', email: '', password: '' };
    console.log("error------>",e)
    //duplicate error handleing 
    if (e.code === 11000) {
        let keyName = Object.keys(e.keyPattern)[0];
        console.log("keyName---->", keyName)

        error[keyName] = "already registered " + keyName;
        return error[keyName];
    }



  //  let errorMessage;

    //validation error handleing
    if (e.message.includes("userData validation failed")) {
       
        // console.log("------------",Object.values(e.errors))
        Object.values(e.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
            //errorMessage = properties.message
        })
    }
    return error;
   // console.log(e.message,e.code)
}