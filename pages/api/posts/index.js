import connectMongo from "../../../database/client";
import { getPosts } from "../../../database/methods";

export default async function handler(req, res) {
    connectMongo();
    const posts = await getPosts();
    res.json(posts);
}
