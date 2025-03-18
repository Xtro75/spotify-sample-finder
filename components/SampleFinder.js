import React, { useState } from "react";

const SampleFinder = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(30);
  const [filter, setFilter] = useState("all");
  const [genre, setGenre] = useState(""); // Genre filter
  const [era, setEra] = useState(""); // Era filter

  const searchSamples = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}&limit=${limit}&filter=${filter}&genre=${genre}&era=${era}`
      );
      const data = await response.json();

      setResults(data.tracks || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Search Bar - Fixed at the Top */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a track..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchSamples}>Search</button>

        {/* Limit Dropdown */}
        <select onChange={(e) => setLimit(e.target.value)} value={limit}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>

        {/* Filter Dropdown */}
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="popularity">Most Popular</option>
          <option value="recent">Newest Releases</option>
        </select>

        {/* Genre Dropdown */}
        <select onChange={(e) => setGenre(e.target.value)} value={genre}>
          <option value="">All Genres</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="hip-hop">Hip-Hop</option>
          <option value="classical">Classical</option>
          <option value="electronic">Electronic</option>
          <option value="reggae">Reggae</option>
          <option value="blues">Blues</option>
        </select>

        {/* Era Dropdown */}
        <select onChange={(e) => setEra(e.target.value)} value={era}>
          <option value="">All Eras</option>
          <option value="1950-1959">1950s</option>
          <option value="1960-1969">1960s</option>
          <option value="1970-1979">1970s</option>
          <option value="1980-1989">1980s</option>
          <option value="1990-1999">1990s</option>
          <option value="2000-2009">2000s</option>
          <option value="2010-2019">2010s</option>
          <option value="2020-2029">2020s</option>
        </select>
      </div>

      {/* Results Container */}
      <div className="results-container">
        {loading && <p>Searching...</p>}
        <ul className="track-list">
          {results.map((track) => (
            <li key={track.id} className="track">
              <img src={track.albumArt} alt={track.name} />
              <div className="track-info">
                <p><strong>{track.name}</strong></p>
                <p>{track.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SampleFinder;
