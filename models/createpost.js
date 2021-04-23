const mongoose = require("mongoose")


const schema = mongoose.Schema;
const post = new schema({
    title: {
        type : String,
        unique : true,
        required : true
    },
    explanation : {
        type : String,
        required : true,
    },
    postStatus : {
        type : String,
        required : true
    },
    postCategory : {
        type : String,
        required : true
    },
})


module.exports = mongoose.models.MyPost ||mongoose.model("MyPost", post)
