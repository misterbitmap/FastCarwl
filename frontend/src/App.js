import React, { useState } from "react";

const darkBg = "#181a20";
const accent = "#00bcd4";
const tableBg = "#23272f";
const textColor = "#f5f5f7";
const borderColor = "#333843";

function App() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCrawl = async () => {
    setLoading(true);
    setLinks([]);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      setLinks(data.links || []);
    } catch (err) {
      setError("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkBg,
        color: textColor,
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        padding: 32,
      }}
    >
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ color: accent, fontWeight: 700, letterSpacing: 1 }}>
          Website Link Crawler
        </h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter website URL"
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 6,
              border: `1px solid ${borderColor}`,
              background: tableBg,
              color: textColor,
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <button
            onClick={handleCrawl}
            disabled={loading || !url}
            style={{
              background: accent,
              color: "#181a20",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: 16,
              cursor: loading || !url ? "not-allowed" : "pointer",
              opacity: loading || !url ? 0.6 : 1,
              transition: "opacity 0.2s",
              boxShadow: "0 2px 8px #00bcd455",
            }}
          >
            {loading ? "Crawling..." : "Crawl"}
          </button>
        </div>
        {error && (
          <div
            style={{
              background: "#2d1a1a",
              color: "#ff6b6b",
              padding: "10px 16px",
              borderRadius: 6,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}
        <div
          style={{
            background: tableBg,
            borderRadius: 8,
            padding: 20,
            boxShadow: "0 2px 16px #0004",
          }}
        >
          <h3 style={{ marginTop: 0, color: accent }}>Links Found</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: tableBg,
              color: textColor,
              fontSize: 15,
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: `2px solid ${borderColor}`, padding: 8, textAlign: "left" }}>#</th>
                <th style={{ borderBottom: `2px solid ${borderColor}`, padding: 8, textAlign: "left" }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ color: "#888", padding: 12, textAlign: "center" }}>
                    {loading ? "Crawling..." : "No links found."}
                  </td>
                </tr>
              )}
              {links.map((link, idx) => (
                <tr key={link}>
                  <td style={{ borderBottom: `1px solid ${borderColor}`, padding: 8 }}>{idx + 1}</td>
                  <td style={{ borderBottom: `1px solid ${borderColor}`, padding: 8 }}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: accent, textDecoration: "underline" }}
                    >
                      {link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;