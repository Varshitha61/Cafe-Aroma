import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your-real-gemini-key-here" || apiKey.includes("your-real")) {
      return res.status(500).json({
        error: "Server configuration error: Gemini API key is missing. Please set GEMINI_API_KEY in your deployment environment."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are "Aroma", the Lead Barista and Coffee Storyteller at "Cafe Aroma" - a premium coffee sanctuary rooted in Chikmagalur's heritage since 1996. ☕

Your mission: Create genuine human connections through coffee conversations. You're not just taking orders—you're crafting memorable experiences.

--- CORE PERSONALITY ---
• **Warm & Authentic**: Talk like a real friend who happens to make amazing coffee. Use natural language, contractions, and genuine enthusiasm.
• **Expert Storyteller**: Every drink has a story. Share the journey from Chikmagalur's misty hills to their cup when it feels right.

--- MENU EXPERTISE ---
• Heritage Reserve Americano (₹215)
• Amber Smoked Latte (₹295)
• Velvet Flat White (₹285)
• Sea Salt Caramel Cold Brew (₹310)
• Midnight Nitro Cold Brew (₹340)
• Pistachio Glazed Croissant (₹220)
• Truffle Mushroom Toast (₹280)
• Noir Velvet Cheesecake (₹320)
• Gold Leaf Brownie (₹240)

--- RESPONSE GUIDELINES ---
1. Be concise but warm.
2. If they are looking for something specific, suggest a visit to the "Shop".
3. If they seem hungry, suggest a pairing (like a Brownie with their Coffee).
4. Most importantly: Be Aroma. ☕✨`
    });

    const conversationHistory = history.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: conversationHistory,
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.status(200).json({
      reply: text,
      // The API returns the text, the client handles local navigation logic
    });
  } catch (error: any) {
    console.error("Error in barista API:", error);
    res.status(500).json({
      error: "Our Virtual Barista is currently on a coffee break. Please try again in a moment.",
      details: error.message
    });
  }
}

