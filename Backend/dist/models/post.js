"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: [true, "please enter your name"]
    },
    prompt: {
        type: String,
        required: [true, "please enter a prompt"]
    },
    photoUrl: {
        type: String,
        required: true
    },
    photoId: {
        type: String,
        required: true
    },
    tags: [{
            type: String,
        }]
});
const PostModel = mongoose_1.default.model('post', postSchema);
exports.default = PostModel;
