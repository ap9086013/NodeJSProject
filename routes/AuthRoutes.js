const express = require("express");
const multer = require('multer');
const authController=require("../controllers/AuthControllers")
const routes = express();

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
routes.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files;
    console.log(files);
    if (!files) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send({ sttus: 'ok' });
})

routes.get("/signup",authController.signup_Get)
routes.post("/signup", authController.signup_Post)

routes.get("/login", authController.login_Get)

routes.post("/login", authController.login_Post)
routes.get("/tokenCheck", authController.tokenCheck);
routes.get("/imageUpload",authController.imageUpload)

module.exports = routes;