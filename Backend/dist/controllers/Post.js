import postModel from '../models/post.js';
import cloudinary from '../config/cloudinary.js';
const getAllPostsController = async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.status(200).json({
            success: true,
            data: posts
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Failed to fetch posts, refresh the page and try again'
        });
    }
};
const createPostController = async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const options = {
            folder: 'Ai generated images',
            tags: ['image', 'generated'],
        };
        const result = await cloudinary.uploader.upload(photo, options);
        const newPost = await postModel.create({
            name,
            prompt,
            photo: result.secure_url
        });
        res.status(200).json({
            success: true,
            data: newPost
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to create a post, please try again'
        });
    }
};
export { getAllPostsController, createPostController };
//# sourceMappingURL=Post.js.map