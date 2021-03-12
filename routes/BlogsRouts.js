const express = require("express")
const routes = express.Router();
const Blogs = require("../modal/blogs")

routes.get("/addBlog", (req, res) => {
    // res.send("test routesp")
    const blog = new Blogs({
        tittle: "Hello First Blog",
        name: 'Dushyant',
        body: 'Hello how are you const num = loadash.random(0, 50)console.log(num)res.setHeader("Content-Type"'
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log("--routesget error----", error)
        })
})
routes.get("/allBlogesGet", (req, res) => {
    Blogs.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log("allblogesGetError---->", error)
    })
})
routes.get("/blogeByID", (req, res) => {
    Blogs.findById("604895412b0fac08fc17471d")
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log("--blogeById error--->", error)
        })
})
//get data by id
routes.post("/byId", (req, res) => {
    console.log(req.body.id)
    Blogs.findById(req.body.id)
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            res.send(e)
        })
})
// delete datAa 
routes.delete("/deleteByID", (req, res) => {
    Blogs.findByIdAndDelete(req.body.id)
        .then((result) => {
            res.send("Succesfulll deleted")
        })
        .catch((e) => {
            res.send(e)
        })
})

// for post method
routes.post("/saveData", (req, res) => {
    //req.params
    // console.log("---req--",JSON.stringify( req.body))
    const blogs = new Blogs(req.body)
    blogs.save()
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            res.send(e)
        })
    // console.log("---req--", req.body)
    // res.send( req.body)
})


module.exports = routes;