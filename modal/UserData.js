const mongoose = require("mongoose");
const { isEmail } = require("validator")
const bcrypt=require("bcrypt")
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
//login function 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;

        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}

// userSchema.post("save", function (doc,next) {
//     console.log("new user created and saved", doc);
//     next();
// })
//fire a function when user data saved
userSchema.pre("save",async function (next) {
    console.log("new user created and saved", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
const userData = mongoose.model('userData', userSchema);
module.exports = userData;