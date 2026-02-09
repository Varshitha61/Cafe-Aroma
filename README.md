# ☕ Cafe Aroma - Premium Coffee Experience

A modern, immersive coffee shop web application built with React, TypeScript, and Vite. Features an AI-powered virtual barista, stunning animations, and a complete e-commerce experience.

![Cafe Aroma](https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=400&fit=crop)

## ✨ Features

### 🤖 AI Virtual Barista
- Powered by Google Gemini AI
- Natural conversation and product recommendations
- Context-aware responses
- Emotional intelligence in customer interactions
- Complete menu knowledge

### 🛍️ E-Commerce
- Full product catalog (45+ items)
- Shopping cart with persistent state
- Secure checkout flow
- Product categories: Beverages, Food, Desserts, Merchandise

### 🎨 Premium Design
- Stunning animations with Framer Motion
- Glassmorphism and modern UI effects
- Responsive design for all devices
- Dark theme with amber accents
- Custom cursor and interactive elements

### 📍 Features
- **Home**: Immersive landing experience
- **Shop**: Browse our complete menu
- **Our Story**: Journey from bean to cup
- **Cafes**: Find our locations
- **Checkout**: Seamless payment flow

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cafe-aroma.git
   cd cafe-aroma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your-actual-api-key-here
   ```
   
   Get your API key from: https://makersuite.google.com/app/apikey

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel**
   - Go to your project settings
   - Add `VITE_GEMINI_API_KEY` with your API key

### Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy!

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI Barista | Yes |

## 📁 Project Structure

```
cafe-aroma/
├── api/                  # API routes
├── components/           # React components
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── VirtualBarista.tsx
├── context/             # React context providers
│   └── CartContext.tsx
├── pages/               # Page components
│   ├── Cafes.tsx
│   ├── Checkout.tsx
│   ├── Home.tsx
│   ├── OurStory.tsx
│   └── Shop.tsx
├── public/              # Static assets
│   ├── brass-gooseneck.jpg
│   ├── coffee-grinder.jpg
│   └── leather-apron.jpg
├── services/            # Service layer
│   └── geminiService.ts
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── index.css            # Global styles
├── types.ts             # TypeScript types
└── vite.config.ts       # Vite configuration
```

## 🎯 Key Features Explained

### AI Barista
The virtual barista uses Google's Gemini AI to provide:
- Natural language understanding
- Product recommendations based on mood and preferences
- Order assistance and upselling
- Dietary requirement handling
- Emotional intelligence in responses

### Shopping Experience
- Real-time cart updates
- Product filtering by category
- Detailed product information
- Smooth animations and transitions
- Mobile-responsive design

### Performance
- Optimized with Vite for fast builds
- Code splitting and lazy loading
- Optimized images
- Minimal bundle size

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Coffee images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- AI powered by [Google Gemini](https://ai.google.dev)

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

## 📈 Latest Activity

- **Feb 9, 2026**: Updated project to version 1.0.0. Enhanced UI components and finalized AI Barista integration.

**Built with ☕ and ❤️ by the Cafe Aroma team**

*Handcrafted Since 1996 | Rooted in Chikmagalur's Heritage*
