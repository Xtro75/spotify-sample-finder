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
      {/* ✅ Updated Title */}
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#1DB954",
        marginBottom: "10px",
        textTransform: "uppercase"
      }}>
        🎵 Welcome To Alpha Centori Audio Research Labs Sampler Finder 🎵
      </h1>

      {/* ✅ Search Bar */}
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks..."
        style={{ padding: "10px", width: "60%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button 
        onClick={searchTracks} 
        style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#1DB954", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Search
      </button>

      {/* ✅ Display Results */}
      <div style={{ marginTop: "20px" }}>
        {results.map((track) => (
          <div key={track.id} style={{ marginBottom: "20px", display: "inline-block", textAlign: "center", width: "150px", margin: "10px" }}>
            <img src={track.albumArt} alt={track.name} width="120" height="120" style={{ borderRadius: "10px" }} />
            <p style={{ fontSize: "14px", fontWeight: "bold" }}>{track.name}</p>
            <p style={{ fontSize: "12px", color: "#555" }}>{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
