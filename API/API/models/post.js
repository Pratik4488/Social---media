const mongoose= require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    img:{
        type:String,
        default: ""
    },
    desc:{
        type: String,
        max: 500
    },
    likes:{
        type: Array,
        default: []
    }
},
{
    timestamps:true
});



module.exports = mongoose.model("Post", PostSchema);