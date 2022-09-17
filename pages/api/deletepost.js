import connectMongo from "../../database/client"
import { deletePost, getPost } from "../../database/methods"
import {z} from "zod";

const deletePostSchema = z.object({
    _id: z.string(),
    token: z.string()
})

export default async function handler(req, res) {
    const validatedBody = deletePostSchema.safeParse(req.body);
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { _id, token } = req.body;
    try {
        const jwtpld = verifyJwt(token);
        console.log('New post by ' + jwtpld.username);
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
    connectMongo();
    const post = await getPost(_id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    await deletePost(_id);
    res.json({ message: "Post deleted" });
}