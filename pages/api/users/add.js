import { z } from "zod";
import { fetchUser, newUser } from "../../../database/methods";

const addUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    key: z.string()
})

export default async function handler(req, res) {
    const validatedBody = addUserSchema.safeParse(req.body);
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { username, password, key } = req.body;
    if (key !== process.env.MASTER_KEY) {
        return res.status(401).json({ message: "Invalid API key" });
    }
    const chkuser = await fetchUser(username);
    if (chkuser != null) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = await newUser(username, password);
    res.status(200).json(user.toJSON());
}
