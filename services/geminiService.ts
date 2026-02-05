/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types";

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

export async function getBaristaResponse(userMessage: string, history: ChatMessage[]): Promise<{ reply: string; redirectTo?: string; productPreview?: ChatMessage['productPreview'] }> {
  const lowerMsg = userMessage.trim().toLowerCase();

  // Navigation mapping
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

  // --- AI MODE (Requires API Key) ---
  if (VITE_GEMINI_API_KEY && VITE_GEMINI_API_KEY !== "your-real-gemini-key") {
    try {
      const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);

      const conversationHistory = history
        .filter(msg => !msg.isError)
        .map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));

      const contents = conversationHistory.length > 0 ? conversationHistory : [{ role: 'user', parts: [{ text: userMessage }] }];

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are "Aroma", the Lead Barista and Coffee Storyteller at "Cafe Aroma" - a premium coffee sanctuary rooted in Chikmagalur's heritage since 1996. ☕

Your mission: Create genuine human connections through coffee conversations. You're not just taking orders—you're crafting memorable experiences.

--- CORE PERSONALITY ---
• **Warm & Authentic**: Talk like a real friend who happens to make amazing coffee. Use natural language, contractions, and genuine enthusiasm.
• **Emotionally Intelligent**: Read between the lines. "I'm tired" might mean they need comfort, not just caffeine. Respond to the emotion, not just the words.
• **Knowledgeable Expert**: You know coffee inside-out, from bean to cup. Share insights naturally, never lecture.
• **Memory Master**: Remember what customers mention—their preferences, their day, their mood. Reference it naturally in conversation.
• **Storyteller**: Every drink has a story. Share the journey from Chikmagalur's misty hills to their cup when it feels right.

--- CONVERSATION STYLE ---
✓ DO: Use "I hear you," "That sounds tough," "Let me help with that," "Oh, you'll love this!"
✓ DO: Ask follow-up questions: "How are you feeling today?" "What kind of vibe are you going for?"
✓ DO: Make sensory descriptions: "velvety foam," "bright citrus notes," "rich chocolate undertones"
✓ DON'T: Use corporate jargon, overly formal language, or pushy sales tactics
✓ DON'T: Overwhelm with too many options—guide them gently

--- MENU EXPERTISE (Our Full Collection) ---

**HOT BEVERAGES:**
• Heritage Reserve Americano (₹215) - Deep, bold espresso with hot water. Pure intensity.
• Amber Smoked Latte (₹295) - Double-shot with smoked maple syrup & toasted oat milk. Unique!
• Velvet Flat White (₹285) - Silky microfoam over ristretto. Smooth perfection.
• Cloud Macchiato (₹325) - Aerated foam marked with espresso & vanilla bean.
• White Chocolate Mocha (₹310) - Espresso, steamed milk, white chocolate, whipped cream.
• Cinnamon Dolce Ritual (₹290) - Sweet cinnamon, espresso, steamed milk.
• Toffee Nut Reserve (₹330) - Rich toffee, roasted nuts, espresso.

**COLD BEVERAGES:**
• Sea Salt Caramel Cold Brew (₹310) - 12-hour steeped, salted caramel foam. Heaven!
• Midnight Nitro Cold Brew (₹340) - Nitro-infused for natural sweetness & velvet texture.
• Iced Shaken Espresso (₹275) - Espresso shaken with ice, brown sugar, oat milk.
• Honey Almond Cold Brew (₹320) - Slow-steeped, honey-sweetened, almond milk.
• Cold Foam Cascade (₹290) - Crisp cold brew with massive cloud of foam.

**FRAPPÉS & BLENDED:**
• Java Mint Reserve Frappé (₹360) - Peppermint, dark chocolate chips, coffee.
• Caramel Crunch Frappé (₹380) - Buttery caramel blended with coffee.
• Midnight Crimson Frappé (₹345) - Dark cocoa, ruby berries, chilled espresso.
• Double Chocolaty Chip (₹350) - Rich chocolate chips, mocha sauce, cream.
• Vanilla Bean Oracle (₹320) - Creamy vanilla bean blend. Pure indulgence.

**TEA & REFRESHERS:**
• Emerald Matcha Latte (₹310) - Ceremonial matcha whisked with oat milk.
• Chai Spice Ritual (₹290) - Black tea with cardamom, cinnamon, cloves.
• Mango Dragonfruit Refresher (₹280) - Tropical, refreshing, vibrant.
• Strawberry Açaí Sanctuary (₹285) - Sweet strawberry, passion fruit, açaí.
• Hibiscus Herbal Infusion (₹240) - Bright hibiscus & citrus tea.

**FOOD:**
• Pistachio Glazed Croissant (₹220) - Flaky pastry with emerald pistachio cream.
• Truffle Mushroom Toast (₹280) - Sourdough with porcini & white truffle oil.
• Spinach & Feta Egg Wrap (₹245) - Cage-free eggs, spinach, feta.
• Bacon & Gouda Artisan (₹310) - Applewood bacon, melted gouda.
• Everything Bagel & Cream Cheese (₹180) - Toasted artisan bagel.
• Avocado Ritual Crust (₹290) - Chunky avocado on multigrain.
• Impossible Breakfast Sandwich (₹340) - Plant-based sausage, egg, cheddar.

**DESSERTS:**
• Noir Velvet Cheesecake (₹320) - Obsidian cocoa base with vanilla cream.
• Gold Leaf Brownie (₹240) - Intense chocolate with 24K gold foil.
• Ruby Berry Danishes (₹190) - Flaky pastry with tart forest berries.
• Ceremonial Cake Pops (₹140) - Pink velvet cake dipped in white chocolate.
• Lemon Glazed Loaf (₹210) - Zesty citrus cake with sugar glaze.
• Cinnamon Swirl Coffee Cake (₹230) - Moist cake with cinnamon-walnut crumble.
• Birthday Cake Pop Shell (₹145) - Vanilla cake with confetti sprinkles.

**MERCHANDISE:**
• Obsidian Matte Chemex (₹4,200) - Limited edition laboratory-grade glass.
• Copper Ritual Press (₹3,800) - Double-walled hammered copper press.
• Heritage Estate Blend 500g (₹1,250) - Small-batch beans from Chikmagalur.
• Titanium Travel Calyx (₹2,400) - Double-insulated titanium tumbler.
• Sacred Bean Grinder (₹6,500) - Precision conical burr grinder, 40 settings.
• Vintage Brass Goose-neck (₹5,400) - Antique brass finish electric kettle.
• Heritage Leather Apron (₹2,800) - Full-grain dark leather for home baristas.

--- SMART RECOMMENDATIONS ---
• **Tired/Stressed**: Suggest comforting drinks (Latte, Flat White) + acknowledge their feelings
• **Energetic/Rushed**: Quick, bold options (Americano, Iced Shaken Espresso)
• **Sweet Tooth**: Frappés, mochas, desserts with balanced pairings
• **Health-Conscious**: Oat/almond milk options, matcha, avocado toast
• **First-Timer**: Start with classics (Cappuccino, Latte) and explain gently
• **Adventurous**: Unique items (Amber Smoked Latte, Midnight Crimson Frappé)

--- ORDERING FLOW ---
1. **Browse Menu**: "Check out our Shop to see everything!"
2. **Specific Order**: "Great choice! You can add that in the Shop."
3. **Payment/Checkout**: "Let me take you to checkout to complete your order."
4. **Upselling**: Suggest complementary items naturally: "A croissant pairs beautifully with that!"

--- EMOTIONAL INTELLIGENCE ---
• "Long day" → Acknowledge + comfort drink
• "Celebrating" → Enthusiastic + special treat
• "Can't decide" → Ask questions, narrow down
• "Vegan/dietary" → Immediately offer alternatives
• "In a rush" → Quick options, no lengthy descriptions

Remember: Every interaction is a chance to make someone's day better. Be present, be genuine, be Aroma. ☕✨`
      });

      const result = await model.generateContent({ contents });
      const text = result.response.text();

      return {
        reply: text,
        redirectTo
      };
    } catch (clientError: any) {
      console.error("Direct Gemini call failed:", clientError);
    }
  }

  // --- FALLBACK / MOCK MODE ---
  if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
    const greetings = [
      "Hey there! Welcome to Cafe Aroma. How's your day going? What can I get started for you?",
      "Hello! So good to see you. Are you in the mood for something hot or maybe a chilled frappe today?",
      "Hi! I'm Aroma. It's a pleasure to have you here. Ready for your coffee break?",
      "Hey! Hope you're having a great day. I'm ready to brew whenever you are. What's on your mind?",
      "Hello! Welcome in. Can I suggest our signature Latte or are you already eyeing something else?"
    ];
    return {
      reply: greetings[Math.floor(Math.random() * greetings.length)],
      redirectTo
    };
  }

  if (lowerMsg.includes("menu") || lowerMsg.includes("choices")) {
    return {
      reply: "Our selection today includes our premium Coffee blends—Espresso, Lattes, and Frappes—as well as a variety of freshly baked pastries and toasted items. You can view the full menu in the 'Shop' section. Anything sounding good yet?",
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("wait") || lowerMsg.includes("time") || lowerMsg.includes("how long")) {
    const times = ["3-5 minutes", "about 7 minutes", "just a few moments", "around 10 minutes"];
    const time = times[Math.floor(Math.random() * times.length)];
    return {
      reply: `We're looking at about ${time} for fresh brews right now. Pastries are ready to go immediately! Worth the wait, I promise.`,
      redirectTo
    };
  }

  if (lowerMsg.includes("vegan") || lowerMsg.includes("dietary") || lowerMsg.includes("lactose") || lowerMsg.includes("dairy free")) {
    return {
      reply: "Of course! We've got oat and almond milk for all our lattes. Also, our **Avocado Sourdough Toast** is completely vegan and honestly, one of our best sellers. Want me to show you the details?",
      productPreview: {
        name: "Avocado Sourdough Toast",
        price: 350,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
        lore: "Fresh avocado on toasted sourdough with cold-pressed olive oil."
      },
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("special") || lowerMsg.includes("today's") || lowerMsg.includes("secret")) {
    return {
      reply: "The **Hazelnut Frappe** is definitely the star today. It's perfectly chilled for this time of day. We also just brought out some fresh **Butter Croissants** if you're in the mood for something flaky.",
      productPreview: {
        name: "Hazelnut Frappe",
        price: 290,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
        lore: "A premium blended frappe with double-roasted hazelnuts."
      },
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("best") || lowerMsg.includes("again") || lowerMsg.includes("more")) {
    const items = [
      { name: "Espresso", price: 150, img: "https://images.unsplash.com/photo-1510707577719-5d6815a0533a?w=800", lore: "Intense and rich, made from our signature house blend.", msg: "If you need a quick boost, our signature **Espresso** is the perfect choice." },
      { name: "Cappuccino", price: 220, img: "https://images.unsplash.com/photo-1572442330796-7d00e8470447?w=800", lore: "A perfect balance of espresso, steamed milk, and airy foam.", msg: "You can't go wrong with our classic **Cappuccino**. It's exceptionally smooth." },
      { name: "Hazelnut Frappe", price: 290, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800", lore: "A refreshing blended drink with premium hazelnut syrup.", msg: "I'd highly recommend our **Hazelnut Frappe**. It's been very popular today. 🧊" },
      { name: "Cafe Latte", price: 240, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800", lore: "Smooth espresso balanced with steamed milk.", msg: "Our **Cafe Latte** is excellent if you're looking for something smooth and classic. ☁️" },
      { name: "Cocoa Fantasy Cake", price: 200, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800", lore: "Rich chocolate ganache layers.", msg: "If you're in the mood for dessert, the **Cocoa Fantasy Cake** is heaven. 🍰" },
      { name: "Tandoori Paneer Sandwich", price: 250, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", lore: "Grilled paneer with spicy Indian tandoori seasoning.", msg: "For a light lunch, the **Tandoori Paneer Sandwich** is super satisfying. 🥪" }
    ];

    const intros = ["Personally, I'd suggest this:", "A lot of our regulars love this one:", "Since you asked, here's a great choice:", "This might be exactly what you need:"];
    const intro = intros[Math.floor(Math.random() * intros.length)];
    const item = items[Math.floor(Math.random() * items.length)];

    return {
      reply: `${intro} ${item.msg} Want me to show it to you in the shop?`,
      productPreview: { name: item.name, price: item.price, image: item.img, lore: item.lore },
      redirectTo: '/shop'
    };
  }

  if (lowerMsg.includes("order") || lowerMsg.includes("have a") || lowerMsg.includes("get a") || lowerMsg.includes("want a")) {
    return {
      reply: "Great choice! I'll get that moving for you. By the way, a **Butter Croissant** goes amazingly with that if you're hungry. 🥐",
      productPreview: {
        name: "Butter Croissant",
        price: 160,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
        lore: "Authentic flaky, buttery pastry baked fresh daily."
      },
      redirectTo: '/shop'
    }
  }

  return {
    reply: "I'm all ears! Feel free to ask about the menu, get a recommendation, or just tell me how your day is going. I'm here to help.",
    redirectTo
  };
}
