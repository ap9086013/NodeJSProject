const express = require("express");

const authController=require("../controllers/AuthControllers")
const routes = express();


routes.get("/signup",authController.signup_Get)
routes.post("/signup", authController.signup_Post)

routes.get("/login", authController.login_Get)

routes.post("/login", authController.login_Post)
routes.get("/tokenCheck", authController.tokenCheck);

module.exports = routes;