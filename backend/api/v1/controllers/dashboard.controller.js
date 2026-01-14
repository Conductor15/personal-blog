const Category = require("../models/category.model");
const Post = require("../models/post.model");


module.exports.index = async (req, res) => {
    try {
        const now = new Date();
        const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const totalPosts = await Post.countDocuments({
        deleted: false,
        status: "published"
        });

        const thisMonthPosts = await Post.countDocuments({
        deleted: false,
        status: "published",
        createdAt: { $gte: startThisMonth }
        });

        const lastMonthPosts = await Post.countDocuments({
        deleted: false,
        status: "published",
        createdAt: {
            $gte: startLastMonth,
            $lt: startThisMonth
        }
        });

        let postPercent = 0;
        if (lastMonthPosts > 0) {
            postPercent = Math.round(
                ((thisMonthPosts - lastMonthPosts) / lastMonthPosts) * 100
            );
        }


        // Views
        const thisMonthViewsAgg = await Post.aggregate([
            {
                $match: {
                deleted: false,
                status: "published",
                createdAt: { $gte: startThisMonth }
                }
            },
            {
                $group: {
                _id: null,
                totalViews: { $sum: "$views" }
                }
            }
        ]);

        const lastMonthViewsAgg = await Post.aggregate([
            {
                $match: {
                deleted: false,
                status: "published",
                createdAt: {
                    $gte: startLastMonth,
                    $lt: startThisMonth
                }
                }
            },
            {
                $group: {
                _id: null,
                totalViews: { $sum: "$views" }
                }
            }
        ]);

        const thisMonthViews = thisMonthViewsAgg[0]?.totalViews || 0;
        const lastMonthViews = lastMonthViewsAgg[0]?.totalViews || 0;

        let viewPercent = 0;
        if (lastMonthViews > 0) {
            viewPercent = Math.round(
                ((thisMonthViews - lastMonthViews) / lastMonthViews) * 100
            );
        }

        res.status(200).json({
            posts: {
                total: totalPosts,
                trend: {
                    value: postPercent,
                    isPositive: postPercent >= 0
                }
            },
            views: {
                total: thisMonthViews,
                trend: {
                value: viewPercent,
                isPositive: viewPercent >= 0
                }
            }

        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
