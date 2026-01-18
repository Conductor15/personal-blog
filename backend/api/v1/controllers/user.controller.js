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

