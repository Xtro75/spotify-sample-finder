import { useState } from "react";

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
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh"
    }}>
      
      {/* ✅ Fixed Header */}
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
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "#1DB954",
          marginBottom: "10px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          🎵 Welcome to Alpha Centori Audio Research Labs 🎵
        </h1>

        {/* ✅ Search Bar & Filters */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tracks..."
            style={{ padding: "10px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="all">All Genres</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="jazz">Jazz</option>
            <option value="rock">Rock</option>
            <option value="soul">Soul</option>
            <option value="electronic">Electronic</option>
          </select>

          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
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
            style={{ padding: "10px 15px", backgroundColor: "#1DB954", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* ✅ Spacing to Prevent Overlap */}
      <div style={{ marginTop: "120px" }}>
        
        {/* ✅ Display Results in a Clean List Format */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>
          {results.length === 0 ? (
            <p style={{ color: "#555", fontSize: "14px" }}>No results yet. Start searching!</p>
          ) : (
            results.map((track) => (
              <div 
                key={track.id} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  width: "100%", 
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
