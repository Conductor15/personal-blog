const Category = require("../models/category.model")
const Post = require("../models/post.model")


module.exports.index = async (req, res) => {
    try {
        const categories = await Category.find({deleted: false})
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug
        const category = await Category.findOne({deleted: false,slug: slug})
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports.create = async (req, res) => {
    try {
        const {name, image} = req.body
        const category = new Category({name: name, image: image});
        await category.save()
        res.status(201).json({
            message: "Tạo category thành công",
            category: category
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports.delete = async (req, res) => {
    try {
        const slug = req.params.slug;
        // console.log(slug)
        const category = await Category.findOne({
            slug: slug,
            deleted: false
        });

        if (!category) {
        return res.status(404).json({
            message: "Category not found"
        });
        }



        const postCount = await Post.countDocuments({
            categoryId: category._id,
            deleted: false
        });

        // console.log(postCount)
        if (postCount > 0) {
            return res.status(409).json({
                message: "Cannot delete category with existing posts"
            });
        }

        await Category.updateOne(
        { _id: category._id },
        { deleted: true }
        );

        return res.status(200).json({
        message: "Delete successfully"
        });

    } catch (error) {
        return res.status(500).json({
        message: error.message
        });
    }
};

