import { connectToDatabase } from "../utils/mongodb";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { items, total, customer, paymentMethod } = req.body;

        if (!items || !total) {
            return res.status(400).json({ error: "Order details are missing." });
        }

        const { db } = await connectToDatabase();

        const orderDoc = {
            orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            items,
            total,
            customer,
            paymentMethod,
            status: 'pending',
            createdAt: new Date()
        };

        const result = await db.collection("orders").insertOne(orderDoc);

        res.status(200).json({
            success: true,
            message: "Order manifest secured in the registry.",
            orderId: orderDoc.orderId,
            _id: result.insertedId
        });
    } catch (error: any) {
        console.error("Order process error:", error);
        res.status(500).json({ error: "Failed to process order ritual in the database." });
    }
}
