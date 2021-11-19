import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: String,
    caption: String,
    creator: String,
    selectedFile: {type: String, required: true},
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

 const PostMessage = mongoose.model('PostMessage', postSchema)

 export default PostMessage