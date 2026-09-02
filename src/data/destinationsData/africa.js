export const africaDestinations = [
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    category: "Nature",
    categories: ["Nature", "Beach", "Culture"],
    tagline: "Table Mountain Majesty, Ocean Cliffs, and Winelands",
    description: "Cape Town is a port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain. Slowly rotating cable cars climb to the mountain's flat top, from which there are sweeping views of the city, the busy harbor and boats heading for Robben Island.",
    bestTime: "November to March",
    recommendedStay: "4–6 Days",
    coordinates: { lat: -33.9249, lon: 18.4241 },
    currency: "ZAR (R)",
    language: "English, Afrikaans, Xhosa",
    timezone: "UTC+2 (SAST)",
    highlights: ["Table Mountain Cableway", "Cape Point & Cape of Good Hope", "Boulders Beach Penguins", "V&A Waterfront"],
    travelTips: ["Take the rotating Table Mountain cable car on the first clear sunny day", "Visit the African penguin colony at Boulders Beach in Simon's Town", "Take a day tour to the Cape Winelands in Stellenbosch"],
    defaultImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "table-mountain",
        name: "Table Mountain Aerial Cableway",
        description: "A flat-topped mountain forming a prominent landmark overlooking the city, harboring over 2,200 plant species.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "boulders-beach",
        name: "Boulders Beach Penguin Colony",
        description: "A sheltered beach of granite boulders in False Bay home to a breeding colony of thousands of wild African penguins.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "cape-point",
        name: "Cape Point & Cape of Good Hope",
        description: "A dramatic scenic promontory at the south-west corner of the Cape Peninsula within Table Mountain National Park.",
        recommendedTime: "Half day",
        fallbackImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "v-and-a-waterfront",
        name: "Victoria & Alfred (V&A) Waterfront",
        description: "A historic working harbour offering dining, shopping, street performers, and departures to Robben Island.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    continent: "Africa",
    category: "History",
    categories: ["History", "Culture", "City"],
    tagline: "The City of a Thousand Minarets and Giza Pyramids",
    description: "Cairo, Egypt's sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts. Nearby, Giza is the site of the iconic pyramids and Great Sphinx.",
    bestTime: "October to April",
    recommendedStay: "3–5 Days",
    coordinates: { lat: 30.0444, lon: 31.2357 },
    currency: "EGP (E£)",
    language: "Arabic",
    timezone: "UTC+2 (EET)",
    highlights: ["Great Pyramids of Giza", "The Great Sphinx", "Grand Egyptian Museum", "Khan el-Khalili Bazaar"],
    travelTips: ["Visit the Giza plateau early at 8 AM with a reputable guide", "Bargain respectfully for spices and souvenirs at Khan el-Khalili", "Take a sunset felucca sailboat ride on the Nile"],
    defaultImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "giza-pyramids",
        name: "Great Pyramids of Giza (Khufu, Khafre, Menkaure)",
        description: "The oldest and only surviving Wonder of the Ancient World, constructed over 4,500 years ago on the Giza plateau.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "great-sphinx",
        name: "The Great Sphinx of Giza",
        description: "A monumental limestone statue of a reclining sphinx with the body of a lion and the head of Pharaoh Khafre.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "khan-el-khalili",
        name: "Khan el-Khalili Souk",
        description: "A famous historic 14th-century bazaar in Islamic Cairo crowded with merchants selling brass lamps, perfumes, and silver.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "cairo-citadel",
        name: "Citadel of Saladin & Mosque of Muhammad Ali",
        description: "A medieval Islamic fortification on Mokattam hill featuring the alabaster Ottoman Mosque of Muhammad Ali.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    category: "Culture",
    categories: ["Culture", "History", "Luxury"],
    tagline: "The Red City of Palaces, Spice Souks, and Riads",
    description: "Marrakesh, a former imperial city in western Morocco, is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with mazelike alleys where thriving souks sell traditional textiles, pottery and jewelry.",
    bestTime: "March to May and September to November",
    recommendedStay: "3–5 Days",
    coordinates: { lat: 31.6295, lon: -7.9811 },
    currency: "MAD (DH)",
    language: "Arabic, Berber, French",
    timezone: "UTC+1 (WEST)",
    highlights: ["Jemaa el-Fnaa", "Jardin Majorelle & YSL Museum", "Bahia Palace", "Koutoubia Mosque"],
    travelTips: ["Stay in a traditional restored courtyard Riad in the Medina", "Watch snake charmers and storytellers at Jemaa el-Fnaa by night", "Sip fresh mint tea on a terrace overlooking the spice markets"],
    defaultImage: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "jemaa-el-fnaa",
        name: "Jemaa el-Fnaa Square",
        description: "The pulsating main square and marketplace in Marrakech's medina quarter filled with street performers and food stalls.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "jardin-majorelle",
        name: "Jardin Majorelle & Yves Saint Laurent Museum",
        description: "A vibrant two-and-a-half-acre botanical garden in cobalt blue, created by French painter Jacques Majorelle.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "bahia-palace",
        name: "Bahia Palace",
        description: "A late 19th-century palace intended to capture the essence of Moroccan and Islamic style with cedarwood carvings and zellige tiles.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "koutoubia-mosque",
        name: "Koutoubia Mosque & Gardens",
        description: "The largest mosque in Marrakech with a 77-meter sandstone minaret that has dominated the city skyline since 1150.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    continent: "Africa",
    category: "Beach",
    categories: ["Beach", "Culture", "History"],
    tagline: "The Spice Island of Turquoise Lagoons and Stone Town",
    description: "Zanzibar is an island partner of Tanzania in the Indian Ocean. Stone Town, its historic centre, is a Swahili coastal trading town on the island of Unguja, characterized by winding lanes, minarets, carved doorways and 19th-century landmarks such as the House of Wonders.",
    bestTime: "June to October and December to February",
    recommendedStay: "4–6 Days",
    coordinates: { lat: -6.1659, lon: 39.2026 },
    currency: "TZS (TSh)",
    language: "Swahili, English",
    timezone: "UTC+3 (EAT)",
    highlights: ["Stone Town Heritage", "Nungwi & Kendwa Beaches", "Prison Island Giant Tortoises", "Spice Plantation Tours"],
    travelTips: ["Explore Stone Town's intricately carved wooden doors on foot", "Take a boat tour to Mnemba Atoll for wild dolphin and reef snorkeling", "Dress modestly when walking through local villages"],
    defaultImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "stone-town",
        name: "Stone Town (Mji Mkongwe)",
        description: "A UNESCO World Heritage Swahili trading town of coral stone buildings, Persian baths, and Freddie Mercury's childhood home.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "nungwi-beach",
        name: "Nungwi & Kendwa Beaches",
        description: "Powder-white beaches on Zanzibar's northern tip where the tide never recedes completely, perfect for sunset dhow sailing.",
        recommendedTime: "Half day",
        fallbackImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "prison-island",
        name: "Prison Island (Changuu)",
        description: "A small island off Stone Town harboring a sanctuary of ancient Aldabra giant tortoises, some over 150 years old.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "mnemba-atoll",
        name: "Mnemba Atoll Coral Reef",
        description: "A protected marine reserve surrounded by crystalline turquoise waters teeming with green sea turtles and tropical fish.",
        recommendedTime: "Half day",
        fallbackImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenya",
    continent: "Africa",
    category: "Nature",
    categories: ["Nature", "City", "Adventure"],
    tagline: "The Green Safari Capital of Wildlife and Culture",
    description: "Nairobi is Kenya's capital city. In addition to its urban core, the city has Nairobi National Park, a large game reserve known for breeding endangered black rhinos and home to giraffes, zebras and lions, all set against a backdrop of distant city skyscrapers.",
    bestTime: "July to October and January to February",
    recommendedStay: "3–4 Days",
    coordinates: { lat: -1.2921, lon: 36.8219 },
    currency: "KES (KSh)",
    language: "Swahili, English",
    timezone: "UTC+3 (EAT)",
    highlights: ["Nairobi National Park", "David Sheldrick Elephant Orphanage", "Giraffe Centre", "Karen Blixen Museum"],
    travelTips: ["Book the 11 AM public visiting hour at Sheldrick Wildlife Trust in advance", "Feed endangered Rothschild giraffes by hand at the Giraffe Centre", "Use ride-hailing apps like Uber for safe city transit"],
    defaultImage: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "nairobi-national-park",
        name: "Nairobi National Park",
        description: "The world's only wildlife capital park where lions, leopards, and rhinos roam freely against skyscraper backdrops.",
        recommendedTime: "Half day",
        fallbackImage: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "sheldrick-elephant-orphanage",
        name: "Sheldrick Wildlife Trust Elephant Orphanage",
        description: "A world-leading conservation project rescuing and rehabilitating orphaned baby elephants and rhinos back to the wild.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "giraffe-centre",
        name: "The Giraffe Centre",
        description: "A conservation sanctuary dedicated to protecting the endangered Rothschild's giraffe, offering raised feeding platforms.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "karura-forest",
        name: "Karura Forest Reserve",
        description: "An urban forest in Nairobi with lush walking trails, bamboo groves, scenic waterfalls, and Mau Mau caves.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];
