import express from 'express'
import { createPostController, getAllPostsController } from '../controllers/Post.js'

const router = express.Router()

router.get('/allPosts', getAllPostsController)

router.post('/createPost', createPostController)

export default router