/**
 * WanderAI Image Service
 * Dynamically queries Unsplash API with client-side caching and failsafe fallbacks.
 */

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const imageCache = new Map();

// Curated high-resolution fallback photography mapping to guarantee zero broken images
const CURATED_FALLBACKS = {
  // Destinations
  "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
  "tokyo": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
  "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
  "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80",
  "rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
  "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80",
  "goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",

  // Famous Places
  "eiffel tower": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
  "louvre museum": "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=800&q=80",
  "notre-dame": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
  "montmartre": "https://images.unsplash.com/photo-1550340499-a6c60fc8286c?auto=format&fit=crop&w=800&q=80",
  "arc de triomphe": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80",
  "senso-ji": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
  "shibuya crossing": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
  "shinjuku gyoen": "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80",
  "tokyo skytree": "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80",
  "burj khalifa": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
  "the dubai mall": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
  "palm jumeirah": "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
  "museum of the future": "https://images.unsplash.com/photo-1644783353597-9e73507d4b47?auto=format&fit=crop&w=800&q=80",
  "tanah lot": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
  "tegalalang rice": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  "uluwatu": "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80",
  "monkey forest": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  "times square": "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
  "central park": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
  "statue of liberty": "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80",
  "brooklyn bridge": "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=800&q=80",
  "colosseum": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
  "vatican": "https://images.unsplash.com/photo-1548625361-127db8e19e7e?auto=format&fit=crop&w=800&q=80",
  "trevi fountain": "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
  "pantheon": "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=800&q=80",
  "marina bay sands": "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=800&q=80",
  "gardens by the bay": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  "sentosa": "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80",
  "jewel changi": "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=800&q=80",
  "baga beach": "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
  "basilica of bom jesus": "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80",
  "dudhsagar falls": "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80",
  "fort aguada": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
};

const GENERIC_FALLBACK = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

function findCuratedFallback(query) {
  const q = (query || "").toLowerCase();
  for (const [key, url] of Object.entries(CURATED_FALLBACKS)) {
    if (q.includes(key) || key.includes(q)) {
      return url;
    }
  }
  return GENERIC_FALLBACK;
}

/**
 * Dynamically fetches an image from Unsplash API by search query
 * @param {string} searchQuery - Search terms (e.g., 'Paris France travel')
 * @returns {Promise<string>} - Image URL
 */
export async function fetchDynamicImage(searchQuery) {
  if (!searchQuery) return GENERIC_FALLBACK;

  const normalized = searchQuery.trim().toLowerCase();
  if (imageCache.has(normalized)) {
    return imageCache.get(normalized);
  }

  // If Unsplash API key is available, attempt real-time query
  if (UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== "your_key_here") {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchQuery
      )}&per_page=1&orientation=landscape`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const fetchedUrl = data.results[0].urls.regular;
          imageCache.set(normalized, fetchedUrl);
          return fetchedUrl;
        }
      } else {
        console.warn(`Unsplash API returned status ${response.status} for query "${searchQuery}". Using fallback.`);
      }
    } catch (err) {
      console.warn(`Unsplash fetch failed for "${searchQuery}":`, err.message);
    }
  }

  // Fallback to curated high-res imagery matching query
  const fallbackUrl = findCuratedFallback(searchQuery);
  imageCache.set(normalized, fallbackUrl);
  return fallbackUrl;
}

/**
 * Dynamic image for a destination
 * @param {string} destinationName - e.g. "Paris" or "Tokyo, Japan"
 * @returns {Promise<string>}
 */
export async function getDestinationImage(destinationName) {
  return fetchDynamicImage(`${destinationName} travel landscape landmark`);
}

/**
 * Dynamic image for a famous place
 * @param {string} placeName - e.g. "Eiffel Tower"
 * @param {string} [destinationName] - e.g. "Paris"
 * @returns {Promise<string>}
 */
export async function getPlaceImage(placeName, destinationName = "") {
  const query = destinationName ? `${placeName} ${destinationName}` : placeName;
  return fetchDynamicImage(query);
}