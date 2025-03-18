export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: { Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}` },
    });

    const data = await response.json();
    console.log("Spotify API Response:", JSON.stringify(data, null, 2)); // Debugging log

    if (!data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
      return res.status(404).json({ error: "No tracks found", spotifyResponse: data });
    }

    res.status(200).json({
      tracks: data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        albumArt: track.album.images[0]?.url || ""
      }))
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
