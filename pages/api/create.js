import connectMongo from "../../database/client";
import { newPost } from "../../database/methods";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string(),
    subheading: z.string(),
    content: z.string(),
    image: z.string(),
});

export default async function handler(req, res) {
    // validate the request body
    const validatedBody = createPostSchema.safeParse(req.body);
    // if the request body is invalid, return an error
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { title, subheading ,content, image } = req.body;
    // create a new post in the database
    connectMongo();
    const post = await newPost(title, subheading, content, image);
    res.json(post.toJSON());
}