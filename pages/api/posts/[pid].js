import connectMongo from "../../../database/client";
import { getPost } from "../../../database/methods";
import { setCors } from "../../../helpers/cors";

export default async function handler(req, res) {
    await setCors(req, res);
    connectMongo()
    const { pid } = req.query;
    const post = await getPost(pid);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post.toJSON());
}
