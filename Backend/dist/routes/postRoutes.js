"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = require("../controllers/Post");
const jwt_1 = __importDefault(require("../middlewares/jwt"));
const router = express_1.default.Router();
router.post('/allPosts', jwt_1.default, Post_1.getAllPostsController);
router.post('/createPost', Post_1.createPostController);
router.post('/getUserPosts', Post_1.getUserPostController);
router.delete('/deletePost/:postId', Post_1.handleDeletePostController);
exports.default = router;
