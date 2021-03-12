const http = require('http')
const express = require("express")

const loadash = require('lodash')
const mongoose = require("mongoose")
const { Server } = require('tls')
const blogesRoute=require('./routes/BlogsRouts')

const app = express();


const dbURL = "mongodb+srv://dushyant:P6QTCC3qOcHhnqNU@cluster0.vlq53.mongodb.net/TestNode?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    app.listen(3000)
        console.log("sucess connected--->")
    })
    .catch((error) => {
        console.log("error--->", error)
    })
app.use(express.urlencoded({ extended: true }))
 app.use(blogesRoute)

// const server = http.createServer((req, res) => {
//     console.log("--server--", req.method, "====", req.url)
//     const num = loadash.random(0, 50)
//     console.log(num)
//     res.setHeader("Content-Type", 'text/html')
//     res.write("<head></head>")
//     res.write("hello test"+num.toString())
//     res.end()
// })
// server.listen(3000, 'localhost', () => {
//     console.log("server Listen----------------------")
// })