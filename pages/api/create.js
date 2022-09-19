import connectMongo from "../../database/client";
import { newPost } from "../../database/methods";
import { z } from "zod";
import { verifyJwt } from "../../helpers/jwt";
import { setCors } from "../../helpers/cors";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}

const createPostSchema = z.object({
    title: z.string(),
    subheading: z.string(),
    content: z.string(),
    image: z.string(),
    token: z.string()
});

export default async function handler(req, res) {
    await setCors(req, res)
    // validate the request body
    const validatedBody = createPostSchema.safeParse(req.body);
    // if the request body is invalid, return an error
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { title, subheading ,content, image, token } = req.body;
    try {
        const jwtpld = verifyJwt(token);
        console.log('New post by ' + jwtpld.username);
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
    // create a new post in the database
    connectMongo();
    const post = await newPost(title, subheading, content, image);
    res.json(post.toJSON());
}