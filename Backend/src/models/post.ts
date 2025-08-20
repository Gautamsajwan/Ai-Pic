import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
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
})

const PostModel = mongoose.model('post', postSchema)
 
export default PostModel