const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    password: String,
    blogName: String,
    fullName:String,
    about: String,
    avatar: String,

    //Title icon web
    blogTitle: String,
    blogIcon: String,
    blogDescription: String,

    bankName: String,
    bankNumber: String,
    bankQR: String,

    momoNumber: String,
    momoQR: String,

    facebookURL: String,
    instagramURL: String,
    youtubeURL: String,

    featurePostSlug: String,

    deleted: {
        type: Boolean,
        default: false
    },

    deletedAt: Date,
}, {
    timestamps: true
});




const User = mongoose.model("User", userSchema, "users");

module.exports = User;