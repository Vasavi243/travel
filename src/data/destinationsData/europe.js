export const europeDestinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    continent: "Europe",
    category: "City",
    categories: ["City", "Culture", "History"],
    tagline: "The City of Light and Timeless Romance",
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    bestTime: "June to August and September to October",
    recommendedStay: "4–5 Days",
    coordinates: { lat: 48.8566, lon: 2.3522 },
    currency: "EUR (€)",
    language: "French",
    timezone: "UTC+1 (CET)",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre"],
    travelTips: ["Book museum tickets in advance", "Use the Paris Metro for fast transit", "Validate tickets before boarding"],
    defaultImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        description: "The iconic wrought-iron lattice tower on the Champ de Mars, offering panoramic vistas of Paris.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "louvre-museum",
        name: "Louvre Museum",
        description: "The world's largest art museum and historic monument, home to the Mona Lisa and thousands of masterworks.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "notre-dame",
        name: "Notre-Dame Cathedral",
        description: "A medieval Catholic cathedral celebrated for French Gothic architecture, gargoyles, and rose windows.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "montmartre",
        name: "Montmartre & Sacré-Cœur",
        description: "A charming hilltop arts quarter crowned by the domed Basilica of the Sacred Heart overlooking bohemian cafés.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1550340499-a6c60fc8286c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "arc-de-triomphe",
        name: "Arc de Triomphe",
        description: "Standing proudly at the western end of the Champs-Élysées, honoring those who fought and died for France.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    category: "History",
    categories: ["History", "Culture", "City"],
    tagline: "The Eternal City of Ancient Emperors",
    description: "Rome is a sprawling cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and culture on display, from the Colosseum to the Vatican.",
    bestTime: "October to April",
    recommendedStay: "4–5 Days",
    coordinates: { lat: 41.9028, lon: 12.4964 },
    currency: "EUR (€)",
    language: "Italian",
    timezone: "UTC+1 (CET)",
    highlights: ["Colosseum", "Vatican Museums", "Trevi Fountain", "Pantheon"],
    travelTips: ["Dress modestly when visiting churches", "Carry reusable water bottles for public fountains", "Book Vatican passes early"],
    defaultImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "colosseum",
        name: "The Colosseum",
        description: "An immense oval amphitheatre in the centre of Rome, once hosting gladiatorial contests and public spectacles.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "vatican-museums",
        name: "Vatican Museums & Sistine Chapel",
        description: "Christian and art museums showcasing immense collections amassed by the Catholic Church including Michelangelo's frescoes.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trevi-fountain",
        name: "Trevi Fountain",
        description: "An awe-inspiring Baroque fountain designed by Nicola Salvi where tradition invites tossing a coin to ensure your return.",
        recommendedTime: "45 mins",
        fallbackImage: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "pantheon",
        name: "The Pantheon",
        description: "A former Roman temple and Catholic church renowned for its monumental unreinforced concrete dome and open oculus.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "roman-forum",
        name: "Roman Forum",
        description: "A sprawling rectangular forum surrounded by ruins of several important ancient government buildings.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    continent: "Europe",
    category: "City",
    categories: ["City", "History", "Culture"],
    tagline: "Timeless Royal Heritage and Modern Vibrancy",
    description: "London stands on the River Thames, a world capital of finance, theatre, royal architecture, and world-class museums with centuries of rich global history.",
    bestTime: "May to September",
    recommendedStay: "4–6 Days",
    coordinates: { lat: 51.5074, lon: -0.1278 },
    currency: "GBP (£)",
    language: "English",
    timezone: "UTC+0 (GMT)",
    highlights: ["Big Ben & Parliament", "Tower Bridge", "British Museum", "Buckingham Palace"],
    travelTips: ["Use contactless card for Tube transit", "Take advantage of free world-class national museums", "Carry an umbrella for unexpected drizzles"],
    defaultImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "tower-bridge",
        name: "Tower Bridge",
        description: "The iconic Victorian bascule and suspension bridge spanning the River Thames near the Tower of London.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "big-ben",
        name: "Big Ben & Westminster",
        description: "The great clock tower and Palace of Westminster standing along the Thames as the heart of British democracy.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "british-museum",
        name: "The British Museum",
        description: "A world-famous public museum dedicated to human history, art, and culture housing the Rosetta Stone.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "buckingham-palace",
        name: "Buckingham Palace",
        description: "The London residence and administrative headquarters of the monarch of the United Kingdom.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "london-eye",
        name: "The London Eye",
        description: "A cantilevered observation wheel on the South Bank offering 360-degree panoramic skyline vistas.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1506158669146-619067261a76?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "Beach", "City"],
    tagline: "Gaudí Masterpieces and Sunlit Mediterranean Living",
    description: "Barcelona is the cosmopolitan capital of Spain's Catalonia region, celebrated for Antoni Gaudí's whimsical modernist architecture, vibrant tapas culture, and golden Mediterranean beaches.",
    bestTime: "May to June and September to October",
    recommendedStay: "3–5 Days",
    coordinates: { lat: 41.3874, lon: 2.1686 },
    currency: "EUR (€)",
    language: "Spanish, Catalan",
    timezone: "UTC+1 (CET)",
    highlights: ["Sagrada Família", "Park Güell", "Gothic Quarter", "Barceloneta Beach"],
    travelTips: ["Reserve Sagrada Família tickets weeks ahead", "Enjoy tapas in El Born and Gràcia", "Watch your belongings on Las Ramblas"],
    defaultImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "sagrada-familia",
        name: "Basílica de la Sagrada Família",
        description: "Antoni Gaudí's unfinished masterpiece, an awe-inspiring basilica of organic forest-like stone columns.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "park-guell",
        name: "Park Güell",
        description: "A public park system composed of colourful mosaic gardens, serpentine benches, and whimsical architecture.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "casa-batllo",
        name: "Casa Batlló",
        description: "A renowned building in the center of Barcelona considered one of Gaudí's visceral architectural triumphs.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "gothic-quarter",
        name: "Gothic Quarter (Barri Gòtic)",
        description: "The historic heart of the old city with narrow medieval alleys, secluded plazas, and tapas bars.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "barceloneta",
        name: "Barceloneta Beach",
        description: "A bustling golden Mediterranean beachfront lined with seafood chiringuitos and seaside boardwalks.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "City", "History"],
    tagline: "Scenic Canals, Golden Age Art, and Bicycle Culture",
    description: "Amsterdam is the Netherlands' capital, known for its artistic heritage, elaborate 17th-century canal ring, narrow gabled houses, and relaxed cycling culture.",
    bestTime: "April to May and September to November",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 52.3676, lon: 4.9041 },
    currency: "EUR (€)",
    language: "Dutch",
    timezone: "UTC+1 (CET)",
    highlights: ["Rijksmuseum", "Van Gogh Museum", "Canal Cruise", "Anne Frank House"],
    travelTips: ["Rent a bicycle to explore like a local", "Pre-book Anne Frank House and Van Gogh Museum", "Take a twilight canal cruise"],
    defaultImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "rijksmuseum",
        name: "Rijksmuseum",
        description: "The Dutch national museum dedicated to arts and history, featuring Rembrandt's Night Watch.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "van-gogh-museum",
        name: "Van Gogh Museum",
        description: "An art museum dedicated to the works of Vincent van Gogh and his contemporaries with over 200 paintings.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "herengracht-canals",
        name: "Canal Ring (Grachtengordel)",
        description: "A UNESCO World Heritage network of historic concentric canals lined with stately gabled mansions.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "anne-frank-house",
        name: "Anne Frank House",
        description: "The biographical museum dedicated to Jewish wartime diarist Anne Frank in her secret annex hiding place.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "vondelpark",
        name: "Vondelpark",
        description: "A lush 120-acre public urban park with ponds, open-air theatres, and cycling paths.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1576924542749-0ecffad44358?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "venice",
    name: "Venice",
    country: "Italy",
    continent: "Europe",
    category: "History",
    categories: ["History", "Culture", "Luxury"],
    tagline: "The Floating City of Canals and Palaces",
    description: "Venice, the capital of northern Italy's Veneto region, is built on more than 100 small islands in a lagoon in the Adriatic Sea with no roads, only canals.",
    bestTime: "April to May and September to October",
    recommendedStay: "2–3 Days",
    coordinates: { lat: 45.4408, lon: 12.3155 },
    currency: "EUR (€)",
    language: "Italian",
    timezone: "UTC+1 (CET)",
    highlights: ["St. Mark's Basilica", "Grand Canal Gondola", "Rialto Bridge", "Doge's Palace"],
    travelTips: ["Wake up early to photograph St. Mark's Square without crowds", "Take the Vaporetto for scenic waterway transit", "Explore quieter neighborhoods like Cannaregio"],
    defaultImage: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "st-marks-basilica",
        name: "St. Mark's Basilica & Piazza",
        description: "The cathedral church of Venice renowned for Byzantine architecture, glittering gold mosaics, and campanile tower.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "grand-canal",
        name: "Grand Canal",
        description: "The sweeping waterway that snakes through Venice lined with over 170 historic Renaissance and Gothic palaces.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "rialto-bridge",
        name: "Rialto Bridge",
        description: "The oldest of the four bridges spanning the Grand Canal, famous for its stone arches and boutique shops.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "doges-palace",
        name: "Doge's Palace & Bridge of Sighs",
        description: "A masterpiece of Gothic architecture that served as the residence of the Doge of Venice and seat of government.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "florence",
    name: "Florence",
    country: "Italy",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "History", "City"],
    tagline: "The Cradle of the Italian Renaissance",
    description: "Florence, capital of Italy's Tuscany region, is home to many masterpieces of Renaissance art and architecture, including the Duomo and the Uffizi Gallery.",
    bestTime: "May to September",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 43.7696, lon: 11.2558 },
    currency: "EUR (€)",
    language: "Italian",
    timezone: "UTC+1 (CET)",
    highlights: ["Florence Cathedral (Duomo)", "Uffizi Gallery", "Ponte Vecchio", "Piazzale Michelangelo"],
    travelTips: ["Climb the Duomo dome for breathtaking Tuscan vistas", "Visit Piazzale Michelangelo at sunset", "Try authentic Florentine steak (Bistecca)"],
    defaultImage: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "florence-duomo",
        name: "Cathedral of Santa Maria del Fiore (Duomo)",
        description: "The monumental cathedral crowned by Brunelleschi's terracotta tiled dome and Giotto's bell tower.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "uffizi-gallery",
        name: "Uffizi Gallery",
        description: "One of the world's premier art museums, containing priceless works by Botticelli, Leonardo da Vinci, and Michelangelo.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "ponte-vecchio",
        name: "Ponte Vecchio",
        description: "A medieval stone closed-spandrel segmental arch bridge over the Arno River, lined with artisan jewelry shops.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "galleria-dell-accademia",
        name: "Galleria dell'Accademia",
        description: "An art museum best known as the home of Michelangelo's iconic sculpture of David.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "prague",
    name: "Prague",
    country: "Czech Republic",
    continent: "Europe",
    category: "History",
    categories: ["History", "Culture", "City"],
    tagline: "The City of a Hundred Spires",
    description: "Prague, capital of the Czech Republic, is bisected by the Vltava River. It is known for its Old Town Square, colourful baroque buildings, Gothic churches, and medieval Astronomical Clock.",
    bestTime: "May to September",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 50.0755, lon: 14.4378 },
    currency: "CZK (Kč)",
    language: "Czech",
    timezone: "UTC+1 (CET)",
    highlights: ["Charles Bridge", "Prague Castle", "Astronomical Clock", "Old Town Square"],
    travelTips: ["Cross Charles Bridge at dawn for mist-covered views", "Taste traditional Czech Pilsner beer", "Explore the ancient Jewish Quarter"],
    defaultImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "charles-bridge",
        name: "Charles Bridge",
        description: "A historic stone Gothic bridge crossing the Vltava River decorated with a continuous alley of 30 baroque statues.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "prague-castle",
        name: "Prague Castle Complex",
        description: "A 9th-century castle complex that is the official office of the President, featuring St. Vitus Cathedral.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "astronomical-clock",
        name: "Prague Astronomical Clock",
        description: "A medieval astronomical clock mounted on the southern wall of Old Town City Hall installed in 1410.",
        recommendedTime: "45 mins",
        fallbackImage: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "old-town-square",
        name: "Old Town Square (Staroměstské náměstí)",
        description: "The historic square featuring the Church of Our Lady before Týn and festive seasonal markets.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "History", "Luxury"],
    tagline: "The Imperial Capital of Classical Music and Palaces",
    description: "Vienna, Austria's capital, lies in the country's east on the Danube River. Its artistic and intellectual legacy was shaped by residents including Mozart, Beethoven, and Sigmund Freud.",
    bestTime: "April to May and September to October",
    recommendedStay: "3–5 Days",
    coordinates: { lat: 48.2082, lon: 16.3738 },
    currency: "EUR (€)",
    language: "German",
    timezone: "UTC+1 (CET)",
    highlights: ["Schönbrunn Palace", "St. Stephen's Cathedral", "Belvedere Palace", "Vienna State Opera"],
    travelTips: ["Experience traditional Viennese coffee house culture with Sachertorte", "Attend a classical concert at the Musikverein", "Use the efficient U-Bahn metro network"],
    defaultImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "schonbrunn-palace",
        name: "Schönbrunn Palace",
        description: "The monumental 1,441-room Baroque summer residence of the Habsburg monarchs with expansive manicured gardens.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "st-stephens-vienna",
        name: "St. Stephen's Cathedral (Stephansdom)",
        description: "The mother church of the Roman Catholic Archdiocese of Vienna, famed for its multi-coloured tiled roof.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "belvedere-palace",
        name: "Belvedere Palace",
        description: "A historic Baroque complex housing an art collection featuring Gustav Klimt's masterpiece The Kiss.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "hofburg-palace",
        name: "The Hofburg",
        description: "The former principal imperial palace of the Habsburg dynasty in the heart of Vienna.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    category: "Beach",
    categories: ["Beach", "Luxury", "Culture"],
    tagline: "Whitewashed Cycladic Cliffs and Golden Caldera Sunsets",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged caldera cliffs and whitewashed cubiform villages.",
    bestTime: "May to October",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 36.3932, lon: 25.4615 },
    currency: "EUR (€)",
    language: "Greek",
    timezone: "UTC+2 (EET)",
    highlights: ["Oia Sunset", "Fira Caldera Walk", "Red Beach", "Akrotiri Archaeological Site"],
    travelTips: ["Book caldera-view suites months in advance", "Hike the scenic cliff trail from Fira to Oia", "Taste local Assyrtiko volcanic wines"],
    defaultImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "oia-village",
        name: "Oia Village",
        description: "A cliffside village renowned for blue-domed churches, pastel windmills, and world-famous golden sunsets.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fira-caldera",
        name: "Fira & Caldera Promenade",
        description: "The vibrant island capital overlooking the submerged volcanic crater with terraced restaurants and shops.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "red-beach",
        name: "Red Beach (Kokkini Paralia)",
        description: "A volcanic sand beach framed by soaring reddish-black volcanic cliffs and crystal-clear turquoise waters.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "akrotiri",
        name: "Ancient Akrotiri Ruins",
        description: "A Minoan Bronze Age settlement preserved under volcanic ash, offering a window into ancient Aegean civilization.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    continent: "Europe",
    category: "History",
    categories: ["History", "Culture", "City"],
    tagline: "The Ancient Birthplace of Western Civilization",
    description: "Athens, the capital of Greece, was the heart of Ancient Greece, a powerful civilization and empire. The city is still dominated by 5th-century BC landmarks like the Acropolis and the Parthenon.",
    bestTime: "April to May and September to November",
    recommendedStay: "2–4 Days",
    coordinates: { lat: 37.9838, lon: 23.7275 },
    currency: "EUR (€)",
    language: "Greek",
    timezone: "UTC+2 (EET)",
    highlights: ["The Acropolis & Parthenon", "Acropolis Museum", "Plaka Neighborhood", "Temple of Olympian Zeus"],
    travelTips: ["Visit the Acropolis early at 8 AM to beat crowds and heat", "Wander through the historic Plaka tavernas in the evening", "Use the Metro for easy airport transit"],
    defaultImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "acropolis-parthenon",
        name: "The Acropolis & Parthenon",
        description: "An ancient citadel perched on a rocky outcrop above the city containing monuments of great architectural significance.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "acropolis-museum",
        name: "Acropolis Museum",
        description: "An archaeological museum focused on findings from the archaeological site of the Acropolis of Athens.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "plaka-district",
        name: "Plaka Historic Neighborhood",
        description: "The old historical neighborhood of Athens featuring labyrinthine streets and neoclassical architecture.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "temple-of-zeus",
        name: "Temple of Olympian Zeus",
        description: "A former colossal temple in the centre of Athens that was dedicated to Olympian Zeus, king of the Olympian gods.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "City", "Beach"],
    tagline: "Sunlit Coastal Capital of Tiles and Fado Melodies",
    description: "Lisbon is Portugal's hilly, coastal capital city. From imposing São Jorge Castle, the view encompasses the old city's pastel-coloured buildings, Tagus Estuary and the 25 de Abril suspension bridge.",
    bestTime: "March to May and September to October",
    recommendedStay: "3–5 Days",
    coordinates: { lat: 38.7223, lon: -9.1393 },
    currency: "EUR (€)",
    language: "Portuguese",
    timezone: "UTC+0 (WET)",
    highlights: ["Belém Tower", "Tram 28", "Alfama District", "Jerónimos Monastery"],
    travelTips: ["Ride vintage Tram 28 through scenic hills", "Taste fresh Pastéis de Belém custard tarts", "Wear shoes with good grip for cobbled streets"],
    defaultImage: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "belem-tower",
        name: "Belém Tower (Torre de Belém)",
        description: "A 16th-century fortress on the northern bank of the Tagus River that served as a ceremonial gateway to Lisbon.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "jeronimos-monastery",
        name: "Jerónimos Monastery",
        description: "A prominent example of the Portuguese Manueline style of architecture near the Tagus River.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "alfama",
        name: "Alfama Old Quarter",
        description: "Lisbon's oldest neighbourhood, spreading down the slope between São Jorge Castle and the Tejo river.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1513688285373-c6d25000a735?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "sao-jorge-castle",
        name: "Castelo de São Jorge",
        description: "A historic Moorish castle occupying a commanding hilltop overlooking the historic center of Lisbon.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    continent: "Europe",
    category: "City",
    categories: ["City", "Culture", "History"],
    tagline: "Grand Boulevards, Royal Splendor, and World Art",
    description: "Madrid, Spain's central capital, is a city of elegant boulevards and expansive, manicured parks such as the Buen Retiro. It is renowned for its rich repositories of European art, including the Prado Museum.",
    bestTime: "September to November and March to May",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 40.4168, lon: -3.7038 },
    currency: "EUR (€)",
    language: "Spanish",
    timezone: "UTC+1 (CET)",
    highlights: ["Prado Museum", "Royal Palace of Madrid", "El Retiro Park", "Plaza Mayor"],
    travelTips: ["Dine like a local: lunch around 2 PM and dinner after 9 PM", "Stroll through the Golden Triangle of Art", "Enjoy churros con chocolate at San Ginés"],
    defaultImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "prado-museum",
        name: "Museo Nacional del Prado",
        description: "Spain's main national art museum featuring masterworks by Francisco Goya, Diego Velázquez, and El Greco.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "royal-palace-madrid",
        name: "Royal Palace of Madrid",
        description: "The official residence of the Spanish royal family, containing over 3,400 opulent rooms and armor galleries.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "retiro-park",
        name: "El Retiro Park & Crystal Palace",
        description: "One of the largest parks of Madrid, featuring a large artificial lake, rose gardens, and the Crystal Palace.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "plaza-mayor-madrid",
        name: "Plaza Mayor",
        description: "A monumental central public square in Madrid surrounded by three-story residential buildings with 237 balconies.",
        recommendedTime: "1 hour",
        fallbackImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "zurich",
    name: "Zurich",
    country: "Switzerland",
    continent: "Europe",
    category: "Luxury",
    categories: ["Luxury", "City", "Culture"],
    tagline: "Alpine Lake Elegance and Financial Prestige",
    description: "The city of Zurich, a global center for banking and finance, lies at the north end of Lake Zurich in northern Switzerland. The picturesque lanes of the central Altstadt reflect its pre-medieval history.",
    bestTime: "June to August and December to February",
    recommendedStay: "2–4 Days",
    coordinates: { lat: 47.3769, lon: 8.5417 },
    currency: "CHF (Fr.)",
    language: "German",
    timezone: "UTC+1 (CET)",
    highlights: ["Lake Zurich Promenade", "Old Town (Altstadt)", "Bahnhofstrasse", "Uetliberg Mountain"],
    travelTips: ["Use the Swiss Travel Pass for seamless trains and boat rides", "Take the train up Uetliberg for panoramic Alpine views", "Sample Swiss fondue and artisan chocolates"],
    defaultImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "lake-zurich",
        name: "Lake Zurich Promenade",
        description: "A serene alpine lake surrounded by leafy parks, promenades, and historic paddle steamers.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "altstadt-zurich",
        name: "Zurich Old Town (Altstadt)",
        description: "A historic district with cobblestone lanes, guild houses, and the twin towers of Grossmünster cathedral.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "bahnhofstrasse",
        name: "Bahnhofstrasse",
        description: "One of the world's most exclusive shopping avenues, lined with luxury boutiques and master watchmakers.",
        recommendedTime: "1–2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "uetliberg",
        name: "Uetliberg Mountain Viewpoint",
        description: "Zurich's home mountain offering sweeping panoramic views of the city, lake, and snow-dusted Alps.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "interlaken",
    name: "Interlaken",
    country: "Switzerland",
    continent: "Europe",
    category: "Nature",
    categories: ["Nature", "Luxury", "Adventure"],
    tagline: "Adventure Capital Between Emerald Lakes and Snowy Peaks",
    description: "Interlaken is a traditional resort town in the mountainous Bernese Oberland region of central Switzerland. Built on a narrow valley between the waters of Lake Thun and Lake Brienz, it is the gateway to the Jungfrau region.",
    bestTime: "June to September and December to March",
    recommendedStay: "3–4 Days",
    coordinates: { lat: 46.6863, lon: 7.8632 },
    currency: "CHF (Fr.)",
    language: "German",
    timezone: "UTC+1 (CET)",
    highlights: ["Jungfraujoch Top of Europe", "Harder Kulm", "Lake Brienz & Thun", "Lauterbrunnen Valley"],
    travelTips: ["Book Jungfraujoch cogwheel train tickets on clear sunny days", "Take a day excursion into magical Lauterbrunnen waterfall valley", "Try paragliding over the turquoise lakes"],
    defaultImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "jungfraujoch",
        name: "Jungfraujoch - Top of Europe",
        description: "The highest railway station in Europe at 3,454m, featuring eternal ice palaces and panoramic Aletsch Glacier vistas.",
        recommendedTime: "Half day",
        fallbackImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "harder-kulm",
        name: "Harder Kulm Viewpoint",
        description: "A funicular railway ascent to a dramatic glass-bottomed sky platform overlooking both lakes and the Eiger peak.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "lake-brienz",
        name: "Lake Brienz & Giessbach Falls",
        description: "A turquoise glacier-fed lake surrounded by sheer cliffs and cascading waterfalls reachable by paddle steamer.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "lauterbrunnen",
        name: "Lauterbrunnen Valley",
        description: "A fairytale glacial valley renowned for 72 plunging waterfalls, including Staubbach Falls.",
        recommendedTime: "3–4 hours",
        fallbackImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    continent: "Europe",
    category: "Culture",
    categories: ["Culture", "History", "City"],
    tagline: "The Timeless Crossroads Where East Meets West",
    description: "Straddling Europe and Asia across the Bosphorus Strait, Istanbul is a historic crossroads of civilizations. Its Old City reflects cultural influences of the Roman, Byzantine, and Ottoman empires.",
    bestTime: "April to May and September to November",
    recommendedStay: "4–5 Days",
    coordinates: { lat: 41.0082, lon: 28.9784 },
    currency: "TRY (₺)",
    language: "Turkish",
    timezone: "UTC+3 (TRT)",
    highlights: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus Cruise"],
    travelTips: ["Remove shoes and cover hair before entering historic mosques", "Bargain politely in the Grand Bazaar", "Take a scenic sunset ferry between Europe and Asia"],
    defaultImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "hagia-sophia",
        name: "Hagia Sophia (Ayasofya)",
        description: "A world-famous architectural wonder built in 537 AD, celebrated for massive soaring domes and golden mosaics.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "blue-mosque",
        name: "The Blue Mosque (Sultan Ahmed Mosque)",
        description: "An Ottoman-era historic mosque renowned for six slender minarets and hand-painted blue tiles.",
        recommendedTime: "1.5 hours",
        fallbackImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "grand-bazaar",
        name: "The Grand Bazaar (Kapalıçarşı)",
        description: "One of the largest and oldest covered markets in the world, with 61 covered streets and over 4,000 shops.",
        recommendedTime: "2–3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "topkapi-palace",
        name: "Topkapı Palace",
        description: "The grand residence and administrative center of the Ottoman sultans from the 1460s until the mid-19th century.",
        recommendedTime: "3 hours",
        fallbackImage: "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "bosphorus-strait",
        name: "Bosphorus Strait Cruise",
        description: "A scenic waterway cruise dividing Europe and Asia flanked by Ottoman waterfront mansions and fortresses.",
        recommendedTime: "2 hours",
        fallbackImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];
