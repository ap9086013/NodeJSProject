const UserData = require("../modal/UserData")
var jwt = require('jsonwebtoken');
const userData = require("../modal/UserData");
const { requireAuth } = require("../middleWare/AuthMiddleWare");



module.exports.signup_Get = (req, res) => {
    res.send("Signup get")
}
module.exports.signup_Post = async (req, res) => {
    const { email, password, fullName, mobileNo } = req.body;
    try {
        const user = await UserData.create({ fullName, mobileNo, email, password })
        const token = createToken(user._id);
        console.log("-totken--->", token)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAgeForToken * 1000 })
        res.status(201).json({ user: user._id })

    } catch (error) {
        //console.log(error);
        const newError = handlerError(error)

        res.status(400).json({ newError })
    }
}
module.exports.login_Get = (req, res) => {
    res.send("login get")
}

//login method
module.exports.login_Post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    // userData.login(email,password)
    // res.send("login get")

    try {
        const user = await userData.login(email, password);
        console.log("--login user-->", user);
        const token = createToken(user._id);
        const userDatils = {
            id: user._id,
            userName: user.fullName,
            mobileNo: user.mobileNo,
            email: user.email
        }
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAgeForToken * 1000 })
        res.status(200).json({
            statusCode: 1,
            userData: userDatils,
            token: token
        })
    } catch (error) {
        console.log("--login Error--->", error)
        
      const errorMessage=await  loginHandlerError(error)
        // Object.values(error.errors).forEach(({ properties }) => {
        //    // error[properties.path] = properties.message;
        //     console.log(properties.message);
        //     //errorMessage = properties.message
        // })
        res.status(400).json({
            statusCode: 0,
            errorMessage: errorMessage
        });
    }
}

//login error handling
const loginHandlerError = (e) => {
    console.log("loginerror------>", e.message)
    return e.message;
 }


const handlerError = (e) => {
    let error = { fullName: '', mobileNo: '', email: '', password: '' };
    console.log("error------>", e)
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

const maxAgeForToken = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "ankur NodeJs", {
        expiresIn: maxAgeForToken
    });
}


//forr token check--->
module.exports.tokenCheck = requireAuth, (req, res) => {
    console.log("----------------------------")

    res.send("is checked")
}


//Image upload code 
module.exports.imageUpload = async (req, res) => {
 res.send("Done")   
}