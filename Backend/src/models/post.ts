import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    prompt: {
        type: String,
        required: [true, "please enter a prompt"]
    },
    photo: {
        type: String,
        required: [true, "please generate a photo before posting"]
    }
})

const postModel = mongoose.model('post', postSchema)
 
export default postModel