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

        // Mock Backend Authentication
        // In a real app, you'd check a database and verify hashed passwords
        if (password === "password" || password.length >= 6) {
            const name = email.split('@')[0];
            res.status(200).json({
                success: true,
                user: {
                    email,
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    isAuthenticated: true
                }
            });
        } else {
            res.status(401).json({ error: "Invalid credentials ritual" });
        }
    } catch (error: any) {
        res.status(500).json({ error: "The auth server is currently cooling down." });
    }
}
