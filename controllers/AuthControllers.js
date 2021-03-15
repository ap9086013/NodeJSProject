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
        handlerError(error)
        
        res.status(400).send("error,user not created")
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
    console.log(e.message,e.code)
}