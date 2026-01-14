const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
    image: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    title: String,
    description: String,
    content: String,
    status: String,
    slug: {
        type:String,
        slug:"title",
        unique:true
    },
    views: {
        type:Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt:Date,
    },{
        timestamps:true
    }
);



const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;