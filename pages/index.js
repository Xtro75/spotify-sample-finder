import { useState, useEffect } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");

  const searchTracks = async () => {
    if (!query) return;

    let apiUrl = `/api/search?query=${query}`;
    if (genre !== "all") apiUrl += `&genre=${genre}`;
    if (year !== "all") apiUrl += `&year=${year}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data.tracks || []);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      
      {/* ✅ Fixed Header Section */}
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#fff",
        padding: "15px 0",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        zIndex: "1000",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#1DB954",
          marginBottom: "10px",
          textTransform: "uppercase"
        }}>
          🎵 Welcome To Alpha Centori Audio Research Labs Sampler Finder 🎵
        </h1>

        {/* ✅ Search Bar & Filters */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tracks..."
            style={{ padding: "10px", width: "40%", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          {/* ✅ Genre Filter */}
          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          >
            <option value="all">All Genres</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="jazz">Jazz</option>
            <option value="rock">Rock</option>
            <option value="soul">Soul</option>
            <option value="electronic">Electronic</option>
          </select>

          {/* ✅ Year Filter */}
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          >
            <option value="all">All Years</option>
            <option value="1960s">1960s</option>
            <option value="1970s">1970s</option>
            <option value="1980s">1980s</option>
            <option value="1990s">1990s</option>
            <option value="2000s">2000s</option>
            <option value="2010s">2010s</option>
          </select>

          <button 
            onClick={searchTracks} 
            style={{ padding: "10px 20px", backgroundColor: "#1DB954", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* ✅ Spacing to Prevent Content From Overlapping */}
      <div style={{ marginTop: "120px", textAlign: "center" }}>

        {/* ✅ Display Results in a List Format */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {results.map((track) => (
            <div 
              key={track.id} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                width: "80%", 
                maxWidth: "600px", 
                padding: "10px", 
                borderBottom: "1px solid #ddd" 
              }}
            >
              <img 
                src={track.albumArt} 
                alt={track.name} 
                width="60" 
                height="60" 
                style={{ borderRadius: "5px", marginRight: "15px" }} 
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>{track.name}</p>
                <p style={{ fontSize: "14px", color: "#555", margin: "0" }}>{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
