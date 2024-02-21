import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const postSchema = new mongoose.Schema({
    title: String,
    titleSub: String,
    content: String,
    image: String
})

export const User = mongoose.models.User || mongoose.model("User",userSchema);
export const Posts = mongoose.models.Posts || mongoose.model("Posts",postSchema);