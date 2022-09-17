import connectMongo from "../../../database/client";
import { IsValidUser } from "../../../database/methods";
import { z } from "zod";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})


export default async function handler(req, res) {
    const validatedBody = loginSchema.safeParse(req.body);
    if (!validatedBody.success) {
        return res.status(400).json(validatedBody.error);
    }
    const { username, password } = req.body;
    connectMongo();
    const valid = await IsValidUser(username, password)

    if (!valid) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ username }, process.env.MASTER_KEY, {
        expiresIn: "1d",
    });

    res.json({ token });
}
