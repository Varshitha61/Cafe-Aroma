import { connectToDatabase } from "../utils/mongodb";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: "All fields are required to begin the pilgrimage." });
        }

        const { db } = await connectToDatabase();

        // Check if user exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "This email is already part of the guild." });
        }

        const newUser = {
            email,
            name,
            password, // In production, use bcrypt!
            createdAt: new Date(),
            isAuthenticated: true
        };

        await db.collection("users").insertOne(newUser);

        res.status(201).json({
            success: true,
            user: {
                email: newUser.email,
                name: newUser.name,
                isAuthenticated: true
            }
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "The guild registration is currently closed. Try again later." });
    }
}

