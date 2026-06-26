const Post = require("../models/post.model");
const Category = require("../models/category.model");

///api/v1/posts/client/topViewed=3&&search=keyword&&limit=10&&sortKey=createdAt&&sortValue=desc&categoryId=
module.exports.indexClient = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 6,
            topViewed,
            search,
            sortKey,
            sortValue,
            categoryId,
        } = req.query;

        const filter = {
            deleted: false,
            status: "published",
        };

        if (categoryId) {
            filter.categoryId = categoryId;
        }

        if (search && search.trim()) {
            const regex = new RegExp(search, "i");
            filter.$or = [
                { title: regex },
                { description: regex }
            ];
        }

        let sort = {};

        if (topViewed) {
            sort = { views: -1 };
        } else {
            if (sortKey && sortValue) {
                sort = {
                    [sortKey]: sortValue === "asc" ? 1 : -1,
                };
            }
            sort = { createdAt: -1 };
        }

        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            Post.find(filter)
                .populate("categoryId", "name")
                .sort(sort)
                .skip(skip)
                .limit(Number(limit)),
            Post.countDocuments(filter),
        ]);

        res.status(200).json({
            data: posts,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                hasMore: skip + posts.length < total,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.indexAdmin = async (req, res) => {
    try {
        const posts = await Post.find({ deleted: false })
            .populate("categoryId", "name slug")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOne({
            deleted: false,
            slug,
        }).populate("categoryId", "name slug");

        if (post) {
            return res.json(post);
        }

        res.json("Post k ton tai");
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports.detailClient = async (req, res) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOneAndUpdate(
            { deleted: false, slug },
            { $inc: { views: 1 } },
            { new: true }
        ).populate("categoryId", "name slug");

        if (!post) {
            return res.status(404).json({
                message: "Post không tồn tại",
            });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.feature = async (req, res) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOne({
            deleted: false,
            status: "published",
            slug,
        }).populate("categoryId", "name slug");

        if (!post) {
            return res.status(404).json({
                message: "Post không tồn tại",
            });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.create = async (req, res) => {
    try {
        const {
            title,
            excerpt,
            content,
            category,
            status,
            thumbnail,
        } = req.body;

        const post = new Post({
            title,
            description: excerpt,
            content,
            categoryId: category,
            status,
            image: thumbnail,
        });

        await post.save();

        if (status === "published") {
            await Category.updateOne(
                {
                    _id: category,
                    deleted: false,
                },
                {
                    $inc: {
                        postCount: 1,
                    },
                }
            );
        }

        res.status(201).json({
            message: "Tạo bài viết thành công",
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.edit = async (req, res) => {
    try {
        const slug = req.params.slug;

        const {
            title,
            description,
            content,
            category,
            status,
            thumbnail,
        } = req.body;

        const post = await Post.findOne({
            slug,
            deleted: false,
        });

        if (!post) {
            return res.status(404).json({
                message: "Bài viết không tồn tại",
            });
        }

        const oldCategory = post.categoryId.toString();
        const newCategory = category;

        // Published -> Draft
        if (post.status === "published" && status === "draft") {
            await Category.updateOne(
                { _id: oldCategory },
                {
                    $inc: {
                        postCount: -1,
                    },
                }
            );
        }

        // Draft -> Published
        else if (post.status === "draft" && status === "published") {
            await Category.updateOne(
                { _id: newCategory },
                {
                    $inc: {
                        postCount: 1,
                    },
                }
            );
        }

        // Published -> Published + đổi category
        else if (
            post.status === "published" &&
            status === "published" &&
            oldCategory !== newCategory
        ) {
            await Category.updateOne(
                { _id: oldCategory },
                {
                    $inc: {
                        postCount: -1,
                    },
                }
            );

            await Category.updateOne(
                { _id: newCategory },
                {
                    $inc: {
                        postCount: 1,
                    },
                }
            );
        }

        await Post.updateOne(
            {
                slug,
                deleted: false,
            },
            {
                title,
                description,
                content,
                categoryId: category,
                status,
                image: thumbnail,
            }
        );

        return res.status(200).json({
            message: "Update successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOne({
            slug,
            deleted: false,
        });

        if (!post) {
            return res.status(404).json({
                message: "Bài viết không tồn tại",
            });
        }

        await Post.updateOne(
            {
                deleted: false,
                slug,
            },
            {
                deleted: true,
            }
        );

        await Category.updateOne(
            {
                _id: post.categoryId,
                deleted: false,
            },
            {
                $inc: {
                    postCount: -1,
                },
            }
        );

        return res.status(200).json({
            message: "Delete successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};