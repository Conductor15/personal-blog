const User = require("../models/user.model");


module.exports.profile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id:id, deleted:false}).select("-password");
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.editProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            blogName,
            about,
            avatar,
            youtubeURL,
            instagramURL,
            facebookURL,
            featurePostSlug,
            workingOn,
            blogTitle,
            blogDescription,
            blogIcon
        } = req.body;


        await User.updateOne({_id: id, deleted: false},{
            blogName:blogName,
            about: about,
            avatar:avatar,
            youtubeURL: youtubeURL,
            instagramURL: instagramURL,
            facebookURL : facebookURL,
            featurePostSlug: featurePostSlug,
            workingOn: workingOn,
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogIcon: blogIcon
        });

        return res.status(200).json({
            message: "Update successfully"
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

