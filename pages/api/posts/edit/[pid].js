import connectMongo from "../../../../database/client";
import { updatePost, getPost } from "../../../../database/methods";
import z from "zod";
import { setCors } from "../../../../helpers/cors";
import { verifyJwt } from "../../../../helpers/jwt";
import { Posts } from "../../../../database/models";


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

const updatePostSchema = z.object({
    title: z.string(),
    subheading: z.string(),
    content: z.string(),
    image: z.string(),
    token: z.string()
});

export default async function handler(req, res) {
    await setCors(req, res);
    connectMongo();
    const { pid } = req.query;
    const post = await Posts.findById(pid);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const validatedBody = updatePostSchema.safeParse(req.body);
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { title, subheading, content, image, token } = req.body;
    try {
        const jwtpld = verifyJwt(token);
        post.title = title;
        post.titleSub = subheading;
        post.content = content;
        post.image = image;
        const up = await post.save();
        // const up = await updatePost(pid, title, subheading, content, image);
        console.log('Post updated by ' + jwtpld.username);
        return res.json(up.toJSON());
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Invalid token" });
    }
}