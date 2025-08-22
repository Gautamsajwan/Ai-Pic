import { Request, Response } from 'express'
import PostModel from '../models/post'
import UserModel from '../models/user'
import cloudinary from '../config/cloudinary'

const getAllPostsController = async(req: Request, res: Response): Promise<void> => {
    try {
        const posts = await PostModel.find({})
        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts, refresh the page and try again'
        })
    }
}

const createPostController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, prompt, photo } = req.body;
        
        const options = {
            folder: 'Ai generated images',
            categorization: 'google_tagging',
            auto_tagging: .6,
            max_results: 5
        }

        const result = await cloudinary.uploader.upload(photo, options)

        const newPost = await PostModel.create({
            userName,
            prompt,
            photoUrl: result.secure_url,
            photoId: result.public_id,
            tags: result.tags
        })
        const updatedUser = await UserModel.findOneAndUpdate(
            { userName },
            {$push: {PostArray: newPost._id}},
            {new: true}
        ).populate('PostArray')

        res.status(200).json({
            success: true,
            data: newPost,
            updatedPhotos: updatedUser?.PostArray
        })
    } catch (error: any) {
        res.status(500).json({ 
            success: false, 
            message: `Internal server error: ${error.message}` 
        })
    }
}

const getUserPostController = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { username } = req.body

        const user = await UserModel.findOne({ username }).populate('PostArray')

        return res.status(200).json({
            success: true,
            message: 'Posts retreived',
            postArray: user?.PostArray
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

const handleDeletePostController = async (req: Request, res:Response): Promise<Response> => {
    try {
        const { postId } = req.params
        const { userName } = req.body
        const targetPost = await PostModel.findById(postId)

        const publicId = targetPost?.photoId

        if(publicId) await cloudinary.uploader.destroy(publicId)
        await targetPost?.deleteOne()

        const updatedUser = await UserModel.findOneAndUpdate(
            {userName},
            {$pull: {PostArray: postId}},
            {new: true}
        ).populate('PostArray')

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            updatedPhotos: updatedUser?.PostArray
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

export { getAllPostsController, createPostController, getUserPostController, handleDeletePostController }