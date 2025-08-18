import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const SubmissionsDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [error, setError] = useState("");
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error("Failed to fetch submissions");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSubmissions(data);
          setFilteredSubs(data);
        } else throw new Error("Unexpected response format");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to load submissions. Please log in again.");
      });
  }, [navigate]);

  const handleDownload = async () => {
    setLoadingCSV(true);
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        navigate("/login");
        throw new Error("Unauthorized");
      }
      if (!res.ok) throw new Error("Failed to download CSV");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `submissions_${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "_")}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV download failed:", err);
      setError("CSV download failed. Please try again.");
    } finally {
      setLoadingCSV(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(value) ||
        s.email.toLowerCase().includes(value) ||
        s.message.toLowerCase().includes(value)
    );
    setFilteredSubs(filtered);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Copied ${email} to clipboard!`);
  };

  const bg = darkMode ? "#121212" : "#f5f5f5";
  const text = darkMode ? "#e0e0e0" : "#000";
  const tableBg = darkMode ? "#1e1e1e" : "#fff";
  const rowHover = darkMode ? "#2a2a2a" : "#f0f0f0";
  const borderColor = darkMode ? "#444" : "#ccc";
  const inputBg = darkMode ? "#2a2a2a" : "#fff";
  const inputText = darkMode ? "#e0e0e0" : "#111";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          padding: "2rem",
          textAlign: "center",
          borderRadius: "8px",
          backgroundColor: tableBg,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Contact Submissions</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Search by name, email or message..."
            value={search}
            onChange={handleSearch}
            style={{
              flexGrow: 1,
              padding: "8px 12px",
              borderRadius: "6px",
              border: `1px solid ${borderColor}`,
              backgroundColor: inputBg,
              color: inputText,
              minWidth: "200px",
            }}
          />
          <button
            onClick={handleDownload}
            disabled={loadingCSV}
            style={{
              ...buttonStyle,
              opacity: loadingCSV ? 0.6 : 1,
              cursor: loadingCSV ? "not-allowed" : "pointer",
            }}
          >
            {loadingCSV ? "Downloading..." : "Download CSV"}
          </button>
        </div>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {!error && filteredSubs.length === 0 && <p>No submissions found.</p>}

        {!error && filteredSubs.length > 0 && (
          <div style={{ overflowX: "auto", marginTop: "1rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: tableBg,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  zIndex: 1,
                }}
              >
                <tr>
                  <th style={{ ...thStyle, borderBottom: `2px solid ${borderColor}` }}>Name</th>
                  <th style={{ ...thStyle, borderBottom: `2px solid ${borderColor}` }}>Email</th>
                  <th style={{ ...thStyle, borderBottom: `2px solid ${borderColor}` }}>Message</th>
                  <th style={{ ...thStyle, borderBottom: `2px solid ${borderColor}` }}>Timestamp</th>
                  <th style={{ ...thStyle, borderBottom: `2px solid ${borderColor}` }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((s, idx) => (
                  <tr
                    key={s.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "transparent" : rowHover,
                      transition: "background 0.2s",
                    }}
                  >
                    <td style={tdStyle}>{s.name}</td>
                    <td style={tdStyle}>{s.email}</td>
                    <td style={tdStyle}>{s.message}</td>
                    <td style={tdStyle}>{new Date(s.timestamp).toLocaleString()}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleCopyEmail(s.email)}
                        style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
                      >
                        Copy Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "1rem",
  transition: "background 0.2s, transform 0.2s",
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
};

export default SubmissionsDashboard;
