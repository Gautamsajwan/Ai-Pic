import express from 'express';
import { createPostController, getAllPostsController } from '../controllers/Post.js';
const router = express.Router();
router.post('/allPosts', getAllPostsController);
router.post('/createPost', createPostController);
export default router;
//# sourceMappingURL=postRoutes.js.map