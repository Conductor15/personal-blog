const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    image: String,

    name: String,

    slug: {
        type:String,
        slug:"name",
        unique:true
    },

    postCount:{
        type: Number,
        default: 0
    },

    deleted: {
        type: Boolean,
        default: false
    },

    deletedAt: Date,
}, {
    timestamps: true
});




const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;