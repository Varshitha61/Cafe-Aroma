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

        // Mock Registration
        // In a real app, you'd save to a DB and hash the password
        res.status(201).json({
            success: true,
            user: {
                email,
                name,
                isAuthenticated: true
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: "The guild registration is currently closed. Try again later." });
    }
}
