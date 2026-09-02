# WanderAI — AI-Powered Travel Explorer

## 🚀 Live Demo

🌐 **WanderAI is live here:**

👉 https://travel-one-silk.vercel.app/

> **Explore the world. Plan intelligently.**

WanderAI is a modern, visually immersive, production-ready AI travel explorer and itinerary architect built with React, Vite, Tailwind CSS, Lucide icons, Framer Motion, and Google Gemini.

---

## 🌟 Key Features

### 1. 🎬 Cinematic Landing Experience
- Full-screen hero section featuring looping HD travel background video with smooth dark gradient overlays.
- Modern call-to-action buttons for instantaneous exploration and AI itinerary generation.
- Responsive live feature telemetry cards highlighting curated cities, live weather, Gemini AI assistant, and the interactive planner.

### 2. 🌍 Destination Explorer & Search/Filter
- Curated catalog of global destinations: **Paris, Tokyo, Dubai, Bali, New York, Rome, Singapore, and Goa**.
- Real-time keyword search by destination name, country, or keyword.
- Instant category tabs (**All, City, Beach, History, Luxury, Culture**) with active visual styling and empty state feedback.

### 3. 📍 Location Awareness & Real-Time Weather
- **Browser Geolocation API (`📍 Use My Location`)**: One-click detection of geographic coordinates with friendly permission/error handling.
- **Manual City Search**: Instant weather and geocoding lookup for any world city with quick-pick shortcuts.
- **OpenWeather API Integration**: Displays Celsius temperature, condition emoji, feels-like temperature, humidity, and wind speed.
- Built-in graceful fallback simulation if external APIs are unconfigured or rate-limited.

### 4. 🏛️ Dedicated Destination Pages & Famous Places
- Dynamic high-resolution hero imagery via **Unsplash API** with client-side caching and fallback photography.
- Comprehensive quick facts: Country, Category, Best Time to Visit, Recommended Stay, Currency, and Primary Language.
- Rich famous place cards with visiting duration badges (e.g., 2–3 hours), detailed descriptions, and image skeletons.

### 5. 🤖 Destination-Aware AI Travel Assistant
- Context-aware chatbot powered by Google Gemini (e.g. Gemini 2.5 Flash).
- Quick suggestion chips for common questions (photography spots, packing, local food, budgeting, transit).
- Visual distinction between user and assistant messages, typing pulse animations, and graceful offline knowledge fallback.

### 6. 📅 AI Itinerary Planner with Structured Day-by-Day View
- Customizable trip duration (1 to 7 days), travel styles (**Budget, Standard, Luxury, Adventure, Relaxed**), and multi-select interests.
- Strictly formatted JSON parsing with markdown fence stripping and validation.
- Interactive day-by-day accordion cards displaying **🌅 Morning**, **☀️ Afternoon**, **🌙 Evening**, and **💡 Travel Tips**.
- Print and regenerate support.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **APIs**:
  - Google Gemini API (via serverless API proxy or direct browser fallback)
  - OpenWeather API (Current Weather + Geocoding)
  - Unsplash API (Dynamic travel photography)
  - Browser Geolocation API (`navigator.geolocation`)

---

## 📁 Project Structure

```
wanderai/
├── api/
│   └── gemini.js               # Vercel Serverless Function proxy for Google Gemini
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── AIChatbot.jsx        # Contextual AI travel concierge
│   │   ├── DestinationCard.jsx  # Dynamic destination card with image loader
│   │   ├── ErrorMessage.jsx     # Friendly error card with retry button
│   │   ├── FamousPlaces.jsx     # Responsive grid of must-visit attractions
│   │   ├── Footer.jsx           # Dark glassmorphic footer
│   │   ├── Hero.jsx             # Cinematic looping video hero
│   │   ├── ItineraryPlanner.jsx # AI-powered day-by-day itinerary generator
│   │   ├── LoadingSpinner.jsx   # Spinner and skeleton loaders
│   │   ├── LocationSelector.jsx # Geolocation & manual city weather search
│   │   ├── Navbar.jsx           # Sticky glassmorphic navigation bar
│   │   ├── PlaceCard.jsx        # Rich attraction card with duration badge
│   │   ├── SearchFilter.jsx     # Search input and category filter pills
│   │   └── WeatherCard.jsx      # Meteorological telemetry display
│   ├── data/
│   │   └── destinations.js      # Curated destination & landmark dataset
│   ├── pages/
│   │   ├── DestinationDetails.jsx # Dedicated destination hub
│   │   ├── Home.jsx             # Main explorer & landing page
│   │   └── NotFound.jsx         # 404 error page
│   ├── services/
│   │   ├── geminiService.js     # AI prompts, JSON parsing & offline fallback
│   │   ├── imageService.js      # Dynamic Unsplash search & image cache
│   │   ├── locationService.js   # Browser Geolocation API wrapper
│   │   └── weatherService.js    # OpenWeather integration & climate simulation
│   ├── utils/
│   │   └── helpers.js           # Formatting and weather emoji helpers
│   ├── App.jsx                  # Main application routes & global state
│   ├── index.css                # Tailwind CSS v4 & custom glassmorphic styling
│   └── main.jsx                 # Application entry point
├── .env.example                 # Environment variable templates
├── vercel.json                  # Vercel SPA routing and serverless rewrites
├── vite.config.js               # Vite + React + Tailwind v4 configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone & Navigate to Project
```bash
cd wanderai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your API keys:
```env
VITE_OPENWEATHER_API_KEY=your_openweather_key
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key
GEMINI_API_KEY=your_gemini_key
VITE_GEMINI_API_KEY=your_gemini_key
```
> **Note:** WanderAI is engineered with **zero-breakage failover**. If any API keys are omitted or rate-limited, the application seamlessly switches to realistic climate models, curated high-res CDN photography, and smart offline travel reasoning.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔒 Security & Vercel Deployment

WanderAI is architected with security best practices:

1. **Serverless Architecture**: For production deployments, Gemini API calls route through `api/gemini.js` (Vercel Serverless Function), keeping `GEMINI_API_KEY` private on the server.
2. **Environment Variable Configuration on Vercel**:
   - Go to your Vercel Project Dashboard → **Settings** → **Environment Variables**.
   - Add `GEMINI_API_KEY`, `VITE_OPENWEATHER_API_KEY`, and `VITE_UNSPLASH_ACCESS_KEY`.
3. **Client-Side Routing Support**: `vercel.json` contains rewrites mapping all SPA routes to `index.html` and `/api/*` to serverless routes.

---

## 📋 Assignment Compliance Verification

- [x] Landing page with looping background video and dark overlay
- [x] Sticky glassmorphic navbar with mobile hamburger menu
- [x] 8+ curated destinations with rich metadata
- [x] Search by name and country with live results
- [x] Category filtering (All, City, Beach, History, Luxury, Culture)
- [x] Dedicated destination details pages (`/destination/:id`)
- [x] Famous places with visiting durations and dynamic images
- [x] Dynamic Unsplash image fetching with zero-broken-image fallbacks
- [x] Browser location detection (`📍 Use My Location`)
- [x] Manual city search with geocoding
- [x] Real-time weather with temperature, humidity, wind, and conditions
- [x] AI Travel Chatbot with destination context and quick prompts
- [x] AI Itinerary Planner (1-7 days, travel styles, multi-select interests)
- [x] Structured day-by-day itinerary display (Morning, Afternoon, Evening, Tips)
- [x] Safe JSON parsing with markdown fence stripping
- [x] Skeleton loaders and spinners for all async states
- [x] Friendly error handling and retry mechanisms
- [x] Fully responsive layout on mobile, tablet, and desktop
- [x] Vercel serverless function (`api/gemini.js`) and `vercel.json` rewrites
- [x] Clean production build (`npm run build` succeeds)

---

## 📄 License
MIT License. Built for Front-End Developer Assignment.

