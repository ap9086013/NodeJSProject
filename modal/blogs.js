const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
    tittle: {
        type: String,
        require:true
    },
    name: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
}, { timestamps: true })

const blog = mongoose.model('blogs', blogSchema);
module.exports = blog;
