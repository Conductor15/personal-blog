const Post = require("../models/post.model")
const Category = require("../models/category.model")

///api/v1/posts/client/top-viewed?limit=3
module.exports.indexClient = async (req, res) => {
    try {
        const topViewed = req.query.topViewed
        if(topViewed){
            const posts = await Post.find({deleted: false, status: 'published'}).sort({ views: -1 });
            res.status(200).json(posts);
            return;
        }

        const posts = await Post.find({deleted: false, status: 'published'}).sort({ createdAt: -1 });
        res.status(200).json(posts);


    //     const limit = Number(req.query.limit) || null;

    // const posts = await Post.find({
    //   deleted: false,
    //   status: "published"
    // })
    //   .sort({ views: -1 })   
    //   .limit(limit)
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports.indexAdmin = async (req, res) => {
    try {
        const posts = await Post.find({deleted: false}).populate("categoryId", "name slug").sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOne({deleted: false, slug: slug }).populate("categoryId", "name slug");
        if(post){
            res.json(post);
            return
        }
        res.json("Post k ton tai");
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports.detailClient = async (req, res) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOneAndUpdate(
            { deleted: false, slug },
            { $inc: { views: 1 } },      // tăng view
            { new: true }               // trả về document đã update
        ).populate("categoryId", "name slug");

        if (!post) {
            return res.status(404).json({ message: "Post không tồn tại" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.create = async (req, res) => {
    try {
        const {title, excerpt, content, category, status, thumbnail} = req.body

        
        const post = new Post({title: title,
                                description: excerpt,
                                content: content,
                                categoryId: category,
                                status: status,
                                image: thumbnail
                            });

        await post.save()

        if(status=="published"){
            await Category.updateOne({_id: category, deleted: false}, {$inc: { postCount: 1 }})
        }
        res.status(201).json({
            message: "Tạo bài viết thành công",
            data: post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports.edit = async (req, res) => {
    try {
        // console.log(req.body)
        const slug = req.params.slug;
        const {title,description,content,category,status,thumbnail} = req.body

        const post = await Post.findOne({slug: slug, deleted: false});

        // console.log(status)
        // console.log(post.status)


        if(post.status == "published" && status == "draft"){
            await Category.updateOne({_id: category, deleted: false}, {$inc: { postCount: -1 }})
        }

        if(post.status == "draft" && status == "published"){
            await Category.updateOne({_id: category, deleted: false}, {$inc: { postCount: 1 }})
        }

        await Post.updateOne({slug: slug, deleted: false},
                                {
                                    title: title,
                                    description: description,
                                    content: content, 
                                    categoryId: category,
                                    status: status,
                                    image: thumbnail
                                })
        if(!post){
            res.status(404).json({
                message: "Bài viết không tồn tại"
            });
            return
        }


        return res.status(200).json({
            message: "Delete successfully"
        });


    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports.delete = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOne({slug: slug, deleted: false})
        if(!post){
            res.status(404).json({
                message: "Bài viết không tồn tại"
            });
            return
        }

        await Post.updateOne({deleted: false, slug: slug},{deleted:true} );
        await Category.updateOne({_id:post.categoryId, deleted: false},{$inc: {postCount: -1}} )

        return res.status(200).json({
            message: "Delete successfully"
        });


    } catch (error) {
        res.json({message: error.message})
    }
}