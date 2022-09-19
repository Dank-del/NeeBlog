import connectMongo from "../../../database/client";
import { getPosts } from "../../../database/methods";
import { setCors } from "../../../helpers/cors";

export default async function handler(req, res) {
    await setCors(req, res)
    connectMongo();
    const posts = await getPosts();
    res.json(posts);
}
