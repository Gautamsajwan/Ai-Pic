"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeletePostController = exports.getUserPostController = exports.createPostController = exports.getAllPostsController = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getAllPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find({});
        res.status(200).json({
            success: true,
            data: posts
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts, refresh the page and try again'
        });
    }
});
exports.getAllPostsController = getAllPostsController;
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, prompt, photo } = req.body;
        const options = {
            folder: 'Ai generated images',
            categorization: 'google_tagging',
            auto_tagging: .6,
            max_results: 5
        };
        const result = yield cloudinary_1.default.uploader.upload(photo, options);
        const newPost = yield post_1.default.create({
            userName,
            prompt,
            photoUrl: result.secure_url,
            photoId: result.public_id,
            tags: result.tags
        });
        const updatedUser = yield user_1.default.findOneAndUpdate({ userName }, { $push: { PostArray: newPost._id } }, { new: true }).populate('PostArray');
        res.status(200).json({
            success: true,
            data: newPost,
            updatedPhotos: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.PostArray
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        });
    }
});
exports.createPostController = createPostController;
const getUserPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const user = yield user_1.default.findOne({ userName }).populate('PostArray');
        return res.status(200).json({
            success: true,
            message: 'Posts retreived successfully',
            postArray: user === null || user === void 0 ? void 0 : user.PostArray
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        });
    }
});
exports.getUserPostController = getUserPostController;
const handleDeletePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userName } = req.body;
        const targetPost = yield post_1.default.findById(postId);
        const publicId = targetPost === null || targetPost === void 0 ? void 0 : targetPost.photoId;
        if (publicId)
            yield cloudinary_1.default.uploader.destroy(publicId);
        yield (targetPost === null || targetPost === void 0 ? void 0 : targetPost.deleteOne());
        const updatedUser = yield user_1.default.findOneAndUpdate({ userName }, { $pull: { PostArray: postId } }, { new: true }).populate('PostArray');
        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            updatedPhotos: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.PostArray
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        });
    }
});
exports.handleDeletePostController = handleDeletePostController;
