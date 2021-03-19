const express = require("express")
const mongoose=require("mongoose")
  
const app = express();
const dbURL ="mongodb+srv://dushyant:dushyant@cluster0.vlq53.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    console.log("sucess connected--->",result)
    })
    .catch((error) => {
    console.log("error--->",error)
})

app.listen(3000)
app.get("/test", (req, res) => {
    res.send("test appp")
})
// iaRjPjM2PBQ6YHpg