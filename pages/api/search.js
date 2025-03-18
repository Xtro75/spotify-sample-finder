export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query, limit = 30, filter = "all", genre = "", era = "" } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Request an access token from Spotify
    const authResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Build search query
    let searchQuery = encodeURIComponent(query);
    if (genre) {
      searchQuery += ` genre:${genre}`;
    }

    // Apply filters in the search request
    let searchURL = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=${limit}`;

    if (filter === "popularity") {
      searchURL += "&sort=popularity";
    } else if (filter === "recent") {
      searchURL += "&sort=newest";
    }

    // Apply era filter
    if (era) {
      searchURL += `&year=${era}`;
    }

    // Make the request to Spotify API
    const searchResponse = await fetch(searchURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const searchData = await searchResponse.json();
    if (!searchData.tracks) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const tracks = searchData.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      albumArt: track.album.images[0]?.url || "",
    }));

    // ✅ Missing Closing Brackets Were Here!
    res.status(200).json({ tracks });

  } catch (error) {
    console.error("Spotify API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
