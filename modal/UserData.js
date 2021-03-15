const mongoose = require("mongoose");
const {isEmail}=require("validator")
const schema = mongoose.Schema;

const userSchema = new schema({
    fullName: {
        type: String,
        required: [true,"Please Enter Your FullName"]
    },
    mobileNo: {
        type: String,
        required:true,
        unique: [true, "already registered mobile number "],

        
    },
    email: {
        type: String,
        required: [true, "Please Enter Your email Id"],
        unique: [true, "already registered email "],
        lowercase: true,
        validate: [isEmail,"Please Enter valid email "]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength:[6,"Minimum password length is 6"]
    }
})

// userSchema.post("save", function (doc,next) {
//     console.log("new user created and saved", doc);
//     next();
// })
//fire a function when user data saved
userSchema.pre("save", function (next) {
    console.log("new user created and saved",this);
    next();
})
const userData = mongoose.model('userData', userSchema);
module.exports = userData;