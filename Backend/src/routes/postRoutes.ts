import express from 'express'
import { createPostController, getAllPostsController } from '../controllers/Post.js'
import fetchUser from '../middlewares/jwt.js'

const router = express.Router()

router.post('/allPosts', fetchUser, getAllPostsController)

router.post('/createPost', fetchUser, createPostController)

export default router