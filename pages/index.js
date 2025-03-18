import { useState, useEffect } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchTracks = async () => {
    if (!query) return;
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data.tracks || []);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* ✅ Add a Title Here */}
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>🎵 Spotify Sample Finder</h1>
      
      {/* ✅ Search Bar */}
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks..."
        style={{ padding: "10px", width: "60%", borderRadius: "5px" }}
      />
      <button onClick={searchTracks} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>

      {/* ✅ Display Results */}
      <div style={{ marginTop: "20px" }}>
        {results.map((track) => (
          <div key={track.id} style={{ marginBottom: "20px" }}>
            <img src={track.albumArt} alt={track.name} width="100" height="100" />
            <p><strong>{track.name}</strong> - {track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
