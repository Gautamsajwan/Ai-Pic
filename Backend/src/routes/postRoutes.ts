import express from 'express'
import { createPostController, getAllPostsController, getUserPostController, handleDeletePostController } from '../controllers/Post'
import fetchUser from '../middlewares/jwt'

const router = express.Router()

router.post('/allPosts', fetchUser, getAllPostsController)

router.post('/createPost', createPostController)

router.post('/getUserPosts', getUserPostController)

router.delete('/deletePost/:postId', handleDeletePostController)

export default router