import connectMongo from "../../../database/client";
import { getPost } from "../../../database/methods";

export default async function handler(req, res) {
    connectMongo()
    const { pid } = req.query;
    const post = await getPost(pid);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post.toJSON());
}
