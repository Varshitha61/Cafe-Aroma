/// <reference types="vite/client" />
import { ChatMessage } from "../types";

export async function getBaristaResponse(userMessage: string, history: ChatMessage[]): Promise<{ reply: string; redirectTo?: string; productPreview?: ChatMessage['productPreview'] }> {
  const lowerMsg = userMessage.trim().toLowerCase();

  // Navigation mapping (Keep local for instant redirects)
  const menuItems = [
    { name: 'cappuccino', path: '/shop' },
    { name: 'cafe latte', path: '/shop' },
    { name: 'tandoori paneer sandwich', path: '/shop' },
    { name: 'iced americano', path: '/shop' },
    { name: 'chilli cheese', path: '/shop' },
    { name: 'cocoa fantasy cake', path: '/shop' },
    { name: 'espresso', path: '/shop' },
    { name: 'hazelnut frappe', path: '/shop' },
    { name: 'mug', path: '/shop' },
    { name: 'house blend', path: '/shop' },
    { name: 'avocado', path: '/shop' },
    { name: 'pasta', path: '/shop' },
    { name: 'coffee', path: '/shop' },
    { name: 'food', path: '/shop' },
    { name: 'story', path: '/story' },
    { name: 'about', path: '/story' },
    { name: 'cafe', path: '/cafes' },
    { name: 'location', path: '/cafes' },
    { name: 'login', path: '/login' },
    { name: 'checkout', path: '/checkout' },
    { name: 'cart', path: '/checkout' },
    { name: 'pay', path: '/checkout' },
    { name: 'payment', path: '/checkout' },
    { name: 'bill', path: '/checkout' }
  ];

  const matchedItem = menuItems.find(item => lowerMsg.includes(item.name));
  const redirectTo = matchedItem?.path;

  // --- BACKEND API MODE (Secure & Robust) ---
  try {
    const response = await fetch('/api/barista', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        reply: data.reply,
        redirectTo
      };
    } else {
      console.warn("Backend API failed, falling back to mock responses.");
    }
  } catch (error) {
    console.error("Error calling backend Barista:", error);
  }

  // --- FALLBACK / MOCK MODE (Used if Backend is offline) ---
  if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
    const greetings = [
      "Hey there! Welcome to Cafe Aroma. I'm Aroma. How's your day going?",
      "Hello! So good to see you. Ready for your coffee break?",
      "Hi! I'm Aroma. It's a pleasure to have you here. What can I get started for you?"
    ];
    return {
      reply: greetings[Math.floor(Math.random() * greetings.length)],
      redirectTo
    };
  }

  if (lowerMsg.includes("menu") || lowerMsg.includes("choices")) {
    return {
      reply: "Our selection today includes our premium Coffee blends, freshly baked pastries, and toasted items. You can view the full menu in the 'Shop' section.",
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("vegan") || lowerMsg.includes("dietary") || lowerMsg.includes("lactose")) {
    return {
      reply: "Of course! We've got oat and almond milk for all our lattes. Also, our **Avocado Sourdough Toast** is completely vegan.",
      productPreview: {
        name: "Avocado Sourdough Toast",
        price: 350,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
        lore: "Fresh avocado on toasted sourdough with cold-pressed olive oil."
      },
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("best")) {
    return {
      reply: "Personally, I'd suggest our signature **Hazelnut Frappe**. It's been very popular today. Want me to show it to you in the shop?",
      productPreview: {
        name: "Hazelnut Frappe",
        price: 290,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
        lore: "A premium blended frappe with double-roasted hazelnuts."
      },
      redirectTo: '/shop'
    };
  }

  return {
    reply: "I'm all ears! Feel free to ask about the menu, get a recommendation, or just tell me how your day is going.",
    redirectTo
  };
}

