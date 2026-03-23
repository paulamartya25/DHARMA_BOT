🕉️ Dharma — Hindu Mythology AI Chatbot

"योगः कर्मसु कौशलम्" — Excellence in action is yoga

Dharma is an AI-powered chatbot built as a guide to Hindu mythology, gods, epics, and philosophy. It's designed to feel like a real product — not a generic chatbot wrapper.
Live Demo → dharma-bot-orcin.vercel.app

🌟 Why Hindu Mythology?
Most people only know the surface-level stories. Hindu mythology is incredibly deep — gods with complex personalities, philosophical concepts like karma and dharma, epics spanning thousands of verses. I wanted to build something that could actually do justice to that depth, and also make for a visually rich UI.

✨ Features

Purpose-built AI persona — Dharma responds like a wise guru, not a generic assistant. Covers the Trimurti, Ramayana, Mahabharata, Bhagavad Gita, Vedas, Upanishads, and all major deities
Temple-inspired UI — dark cosmic theme with saffron, gold and deep purple tones
Animated mandala — spinning hero element on the landing page
Sliding mantra banner — cycles through 5 Sanskrit mantras using Framer Motion
3 color themes — Midnight, Saffron, and Forest — switch live
Framer Motion animations — message bubbles, landing page, theme transitions
Floating particles — ambient golden sparks across the background
Diya flames — animated flame elements in the header
Smart empty state — suggestion cards so users know what to ask immediately
"Dharma is reflecting..." — custom typing indicator that fits the character
Responsive — works on mobile and desktop


🛠️ Tech Stack
LayerTechnologyFrameworkNext.js 14 (App Router)StylingTailwind CSS + custom CSS animationsAnimationsFramer MotionAI ModelGroq API — llama-3.3-70b-versatileFontsCinzel Decorative, Libre BaskervilleDeploymentVercel

🚀 Run Locally
1. Clone the repo
bashgit clone https://github.com/paulamartya25/DHARMA_BOT.git
cd DHARMA_BOT
2. Install dependencies
bashnpm install
3. Create .env.local in the root folder
GROQ_API_KEY=your_groq_api_key_here
Get a free Groq API key at console.groq.com
4. Run the dev server
bashnpm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
dharma-bot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js      # Backend — Groq API + system prompt
│   ├── globals.css            # All animations, CSS variables, fonts
│   ├── layout.js              # Root layout
│   └── page.js                # Full frontend — UI, components, logic
├── .env.local                 # API key (gitignored)
└── README.md

🧠 How the AI Works
The bot's character is defined by a detailed system prompt in route.js. It instructs the model to:

Respond as Dharma — a wise guru sitting beneath a banyan tree
Cover specific topics: Trimurti, Dashavatar, epics, Puranas, Vedas, philosophy
Use Sanskrit terms with their meanings
Tell stories with flair — not dry facts
End responses with a relevant shloka or blessing
Gently redirect off-topic questions back to Hindu mythology

This is what makes it feel purpose-built rather than a generic AI wrapper.

🎨 Design Decisions

Saffron + gold palette — temple and sacred fire colors, not the typical purple-on-white AI aesthetic
Cinzel Decorative font — feels ancient and carved in stone, not modern and techy
Suggestion cards on landing — removes friction, guides new users immediately
Custom typing indicator — "Dharma is reflecting..." keeps the character consistent
CSS variables for theming — one change cascades across the entire UI instantly


🔮 What I'd Add With More Time

Voice input — speak your question out loud
Image generation — see the gods and scenes visually
Bookmark feature — save your favorite stories
Share a story — send a mythology story to a friend
