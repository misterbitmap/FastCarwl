import React, { useState } from "react";

const darkBg = "#181a20";
const accent = "#00bcd4";
const tableBg = "#23272f";
const textColor = "#f5f5f7";
const borderColor = "#333843";

function App() {
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
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
        body: JSON.stringify({ url, max_depth: maxDepth }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      setLinks(data.links || []);
    } catch (err) {
      setError("Error: " + err.message);
    }
    setLoading(false);
  };

  // Simple PDF export using browser's Blob and window.open
  const handleExportPDF = () => {
    const now = new Date();
    const datetime = now.toLocaleString();

    // Build HTML content with theme and clickable links
    let html = `
    <html>
      <head>
        <title>Fast Crawl Report</title>
        <style>
          body {
            font-family: 'Inter', Arial, sans-serif;
            background: #181a20;
            color: #f5f5f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 800px;
            margin: 40px auto;
            background: #23272f;
            border-radius: 12px;
            box-shadow: 0 2px 16px #0004;
            padding: 32px 40px;
          }
          h1 {
            color: #00bcd4;
            text-align: center;
            margin-bottom: 24px;
            letter-spacing: 2px;
          }
          .info {
            background: #1e222a;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 24px;
            color: #b0bec5;
            font-size: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #23272f;
            color: #f5f5f7;
            margin-top: 16px;
          }
          th, td {
            padding: 10px 8px;
            border-bottom: 1px solid #333843;
            text-align: left;
          }
          th {
            background: #181a20;
            color: #00bcd4;
            font-size: 16px;
            font-weight: 700;
          }
          a {
            color: #00bcd4;
            text-decoration: underline;
            word-break: break-all;
          }
          tr:nth-child(even) td {
            background: #20232a;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Fast Crawler</h1>
          <div class="info">
            <div><b>Datetime:</b> ${datetime}</div>
            <div><b>URL:</b> ${url}</div>
            <div><b>Maximum Depth:</b> ${maxDepth}</div>
          </div>
          <h2 style="color:#00bcd4; margin-bottom:8px;">Links Found</h2>
          <table>
            <thead>
              <tr>
                <th style="width:40px;">#</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              ${
                links.length === 0
                  ? `<tr><td colspan="2" style="color:#888;text-align:center;">No links found.</td></tr>`
                  : links
                      .map(
                        (link, idx) =>
                          `<tr>
                            <td>${idx + 1}</td>
                            <td><a href="${link}" target="_blank">${link}</a></td>
                          </tr>`
                      )
                      .join("")
              }
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;

    // Open in new window and print (user can save as PDF)
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
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
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ color: accent, fontWeight: 700, letterSpacing: 1 }}>
          Fast Crawl
        </h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "flex-end" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label htmlFor="url-input" style={{ marginBottom: 4, fontWeight: 500, color: "#b0bec5" }}>
              URL
            </label>
            <input
              id="url-input"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter website URL"
              style={{
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
          </div>
          <div style={{ width: 100, display: "flex", flexDirection: "column" }}>
            <label htmlFor="depth-input" style={{ marginBottom: 4, fontWeight: 500, color: "#b0bec5" }}>
              Max Depth
            </label>
            <input
              id="depth-input"
              type="number"
              min={1}
              max={10}
              value={maxDepth}
              onChange={e => setMaxDepth(Number(e.target.value))}
              placeholder="Max Depth"
              style={{
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
          </div>
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
              alignSelf: "flex-end"
            }}
          >
            {loading ? "Crawling..." : "Crawl"}
          </button>
          {links.length > 0 && (
            <button
              onClick={handleExportPDF}
              style={{
                background: "#fff",
                color: accent,
                border: `1px solid ${accent}`,
                borderRadius: 6,
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                marginLeft: 8,
                alignSelf: "flex-end"
              }}
            >
              Export
            </button>
          )}
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
            width: "100%"
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