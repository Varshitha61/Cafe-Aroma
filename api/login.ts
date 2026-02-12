import { connectToDatabase } from "../utils/mongodb";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const { db } = await connectToDatabase();

        const user = await db.collection("users").findOne({ email, password });

        if (user) {
            res.status(200).json({
                success: true,
                user: {
                    email: user.email,
                    name: user.name,
                    isAuthenticated: true
                }
            });
        } else {
            res.status(401).json({ error: "Invalid credentials ritual" });
        }
    } catch (error: any) {
        console.error("Login error:", error);
        res.status(500).json({ error: "The auth server is currently cooling down." });
    }
}

