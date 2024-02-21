import express from 'express'
import { createPostController, getAllPostsController } from '../controllers/Post.js'
import fetchUser from '../middlewares/jwt.js'

const router = express.Router()

router.post('/allPosts', getAllPostsController)

router.post('/createPost', createPostController)

export default router