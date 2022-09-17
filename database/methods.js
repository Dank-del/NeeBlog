import { User, Posts } from './models.js';
import { genSalt, hash, compare } from 'bcrypt';

export async function hashIt(password) {
    const salt = await genSalt(6);
    const hashed = await hash(password, salt);
    return hashed;
}

export async function IsValidUser(username, password) {
    const user = await fetchUser(username);
    if (user == null) {
        return false;
    }
    return await compare(password, user.password);
}

export async function newPost(title, titleSub, content, image) {
    const post = new Posts({
        title: title,
        titleSub: titleSub,
        content: content,
        image: image
    });
    await post.save();
    return post;
}

export async function getPosts() {
    return await Posts.find({});
}

export async function getPost(id) {
    return await Posts.findById(id)
}

export async function deletePost(id) {
    return await Posts.findByIdAndDelete(id)
}

export async function updatePost(id, title, titleSub, content, image) {
    return await Posts.updateOne({
        id: id
    }, {
        title: title,
        titleSub: titleSub,
        content: content,
        image: image
    });
}

export async function newUser(username, password) {
    const hashedPasswd = await hashIt(password);
    const user = new User({
        username: username,
        password: hashedPasswd
    });
    await user.save();
    return user;
}

export async function fetchUser(username) {
    return await User.findOne({
        username: username
    });
}