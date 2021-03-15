const mongoose = require("mongoose");
const {isEmail}=require("validator")
const schema = mongoose.Schema;

const userSchema = new schema({
    fullName: {
        type: String,
        require: [true,"Please Enter Your FullName"]
    },
    mobileNo: {
        type: String,
        require: [true, "Please Enter Your Mobile Number"],
        unique:true
    },
    email: {
        type: String,
        require: [true, "Please Enter Your email Id"],
        unique: true,
        lowercase: true,
        validate: [isEmail,"Please Enter valid email "]
    },
    password: {
        type: String,
        require: [true, "Please Enter Your Password"],
        minLength:[6,"Minimum password length is 6"]
    }
}, { timestamps: true }
)

const userData = mongoose.model('userData', userSchema);
module.exports = userData;