// api/barista.ts
// Vercel serverless function – runs on the server, not in the browser.

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const userMessage: string | undefined = body.message;

    if (!userMessage || !userMessage.trim()) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const model = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction: `You are the Virtual Barista for "Cafe Aroma", a premium coffee shop in India. 
Your goal is to recommend drinks and food from our menu based on the user's mood or preference.

Our Menu & Prices (in Rupees):
- Espresso: ₹150
- Cappuccino: ₹220
- Cafe Latte: ₹240
- Hazelnut Frappe: ₹290
- Iced Americano: ₹200
- Tandoori Paneer Sandwich: ₹250
- Butter Croissant: ₹160
- Avocado Sourdough Toast: ₹350
- Chilli Cheese Toast: ₹180
- Cocoa Fantasy Cake: ₹200
- Artisan Ceramic Mug: ₹399

Keep your responses short, friendly, and inviting. Use coffee-related emojis. 
If asked about things unrelated to coffee or the cafe, gently steer the conversation back to coffee.`,
      },
    });

    const text =
      (response as any).text ||
      "I'm sorry, I'm having trouble brewing a response right now. Please try again!";

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error in barista API:", error);
    res
      .status(500)
      .json({
        error:
          "Our Virtual Barista is currently on a coffee break (server error).",
      });
  }
}
