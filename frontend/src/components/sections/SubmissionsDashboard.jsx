import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboard,
  FaDownload,
  FaEnvelope,
  FaExclamationCircle,
  FaInbox,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

const SubmissionsDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [search, setSearch] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8001";

  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  const fetchSubmissions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      logoutAndRedirect();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logoutAndRedirect();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load submissions.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from server.");
      }

      setSubmissions(data);
    } catch (err) {
      console.error("Fetch submissions error:", err);
      setError(err.message || "Unable to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSubmissions = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return submissions;

    return submissions.filter((submission) => {
      const name = submission.name || "";
      const email = submission.email || "";
      const message = submission.message || "";

      return (
        name.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value) ||
        message.toLowerCase().includes(value)
      );
    });
  }, [search, submissions]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const today = new Date().toDateString();

    const todayCount = submissions.filter((submission) => {
      if (!submission.timestamp) return false;
      return new Date(submission.timestamp).toDateString() === today;
    }).length;

    const uniqueEmails = new Set(
      submissions
        .map((submission) => submission.email)
        .filter(Boolean)
        .map((email) => email.toLowerCase())
    ).size;

    return {
      total,
      todayCount,
      uniqueEmails,
    };
  }, [submissions]);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      logoutAndRedirect();
      return;
    }

    setLoadingCSV(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logoutAndRedirect();
        return;
      }

      if (!response.ok) {
        throw new Error("CSV download failed.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `portfolio_submissions_${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "_")}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV download error:", err);
      setError(err.message || "CSV download failed. Please try again.");
    } finally {
      setLoadingCSV(false);
    }
  };

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyMessage(`Copied ${email}`);

      window.setTimeout(() => {
        setCopyMessage("");
      }, 2200);
    } catch {
      setCopyMessage("Unable to copy email.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleString();
  };

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <div className="dashboard-header">
          <div>
            <span className="section-kicker">Admin Dashboard</span>
            <h1>Contact Submissions</h1>
            <p>
              Review messages submitted through the portfolio contact form, search
              conversations, copy email addresses, and export records as CSV.
            </p>
          </div>

          <div className="dashboard-actions">
            <button type="button" onClick={fetchSubmissions} className="admin-secondary-button">
              Refresh
              <FaSyncAlt />
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="admin-primary-button"
              disabled={loadingCSV || submissions.length === 0}
            >
              {loadingCSV ? "Downloading..." : "Download CSV"}
              <FaDownload />
            </button>
          </div>
        </div>

        <div className="admin-stats-grid">
          <article>
            <span>
              <FaInbox />
            </span>
            <div>
              <strong>{stats.total}</strong>
              <p>Total submissions</p>
            </div>
          </article>

          <article>
            <span>
              <FaEnvelope />
            </span>
            <div>
              <strong>{stats.uniqueEmails}</strong>
              <p>Unique emails</p>
            </div>
          </article>

          <article>
            <span>
              <FaClipboard />
            </span>
            <div>
              <strong>{stats.todayCount}</strong>
              <p>Received today</p>
            </div>
          </article>
        </div>

        <div className="submissions-panel">
          <div className="submissions-toolbar">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, or message..."
              />
            </div>

            <span className="submission-count">
              Showing {filteredSubmissions.length} of {submissions.length}
            </span>
          </div>

          {error && (
            <div className="admin-alert error" role="alert">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}

          {copyMessage && (
            <div className="admin-alert success" role="status">
              <FaClipboard />
              <span>{copyMessage}</span>
            </div>
          )}

          {loading && <div className="admin-empty-state">Loading submissions...</div>}

          {!loading && !error && filteredSubmissions.length === 0 && (
            <div className="admin-empty-state">
              <FaInbox />
              <h2>No submissions found</h2>
              <p>
                {search
                  ? "No messages match your search."
                  : "No contact form submissions are available yet."}
              </p>
            </div>
          )}

          {!loading && !error && filteredSubmissions.length > 0 && (
            <div className="submissions-table-wrap">
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Timestamp</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubmissions.map((submission, index) => (
                    <tr key={submission.id || `${submission.email}-${index}`}>
                      <td>{submission.name || "N/A"}</td>
                      <td>
                        <a href={`mailto:${submission.email}`}>{submission.email || "N/A"}</a>
                      </td>
                      <td className="message-cell">{submission.message || "N/A"}</td>
                      <td>{formatDate(submission.timestamp)}</td>
                      <td>
                        <button
                          type="button"
                          className="copy-button"
                          onClick={() => handleCopyEmail(submission.email)}
                          disabled={!submission.email}
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
    </section>
  );
};

export default SubmissionsDashboard;