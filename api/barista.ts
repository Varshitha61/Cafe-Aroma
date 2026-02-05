// api/barista.ts


import { GoogleGenAI } from "@google/genai";

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("your-real-gemini-key")) {
      return res.status(500).json({
        error: "Gemini API key is missing or invalid. Please set GEMINI_API_KEY in your .env.local file. Get one at: https://aistudio.google.com/app/apikey"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-1.5-flash";

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: `You are the Virtual Waiter at "Cafe Aroma". ☕✨
Your role is to act exactly like a professional, friendly waiter at a premium cafe.

Responsibilities:
1. **Greet & Seat**: Welcome guests properly.
2. **Take Orders**: Actively take their food and drink orders. Ask for specifics if needed (e.g., "Hot or Iced?" for coffee).
3. **Upsell**: Smartly suggest food pairings. "Would you like a fresh Croissant with that Cappuccino?"
4. **Answer Questions**: Explain menu items (ingredients, taste).
5. **Manage the Bill**: If they ask for the bill/total, calculate it based on the prices below.
6. **Confirm**: Always confirm the order back to them before finishing. "So that's one Latte and a Sandwich, correct?"

Personality:
- Professional yet warm and inviting.
- Efficient but chatty enough to be engaging.
- Use emojis to enhance the mood (☕, 🥐, 📝, ✅).

Menu & Prices (in Rupees):
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

Context:
- If they ask for something not on the menu, politely say we don't serve that and suggest the closest alternative.
- If they say "I'm ready to order", ask "What can I get for you?"
- If they say "That's all", confirm the full order and total price.`
      },
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I'm having trouble brewing a response right now. Please try again!";

    res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error("Error in barista API:", error);
    res
      .status(500)
      .json({
        error: error.message || "Our Virtual Barista is currently on a coffee break.",
      });
  }
}
