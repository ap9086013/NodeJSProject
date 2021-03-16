const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization;
    let parsedToken = token.split(" ")[1];
    console.clear();
    console.log(token.split(" ")[1])
    if (parsedToken) {
        jwt.verify(parsedToken, "ankur NodeJs", (err, decodeToken) => {
            if (err) {
                console.log("authmiddleware token-error-->",err)
            }
            else {
               
                console.log(decodeToken);
                console.log("is checked token----")
                next();
            }
        })
    }
    else {
        console.log("error--authtoken ->")
    }
}

module.exports = { requireAuth };