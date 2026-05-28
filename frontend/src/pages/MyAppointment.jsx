import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div
      style={{
        background: "#0a0f1a",
        minHeight: "100vh",
        padding: "2.5rem 2rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Page heading */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            color: "#4a5878",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.25rem",
          }}
        >
          Dashboard
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 600,
            color: "#e8f0ff",
            margin: 0,
          }}
        >
          My Appointments
        </h1>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row" /* always row — never stacks */,
              flexWrap: "nowrap" /* never wraps to next line */,
              gap: "1rem",
              padding: "1rem",
              borderRadius: "1rem",
              background: "#141f35",
              border: "0.5px solid rgba(74,158,255,0.15)",
              transition: "all 0.3s ease",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(15,212,160,0.3)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(74,158,255,0.15)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Doctor image — hides on very small screens to save space */}
            <div style={{ flexShrink: 0 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "0.75rem",
                  objectFit: "cover",
                  background: "#0f1829",
                  display: "block",
                  border: "0.5px solid rgba(15,212,160,0.15)",
                }}
              />
            </div>

            {/* Doctor info — takes all remaining space, truncates if needed */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  color: "#e8f0ff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  margin: 0,
                  fontFamily: "'Playfair Display', serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  color: "#0fd4a0",
                  fontSize: "0.8rem",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {item.speciality}
              </p>

              <div
                style={{
                  height: "0.5px",
                  background: "rgba(74,158,255,0.1)",
                  margin: "0.3rem 0",
                }}
              />

              <p
                style={{
                  color: "#4a5878",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}
              >
                Address
              </p>
              <p
                style={{
                  color: "#8899bb",
                  fontSize: "0.73rem",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.address.line1}
              </p>
              <p
                style={{
                  color: "#8899bb",
                  fontSize: "0.73rem",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.address.line2}
              </p>

              {/* Date badge */}
              <div style={{ marginTop: "0.35rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.65rem",
                    borderRadius: "999px",
                    background: "rgba(15,212,160,0.08)",
                    border: "0.5px solid rgba(15,212,160,0.3)",
                    color: "#0fd4a0",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  📅 24 June, 2026 · 3:40 PM
                </span>
              </div>
            </div>

            {/* Action buttons — always on the right, never pushed down */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "130px",
              }}
            >
              <button
                style={{
                  padding: "0.55rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "rgba(15,212,160,0.08)",
                  border: "0.5px solid #0fd4a0",
                  color: "#0fd4a0",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0fd4a0";
                  e.currentTarget.style.color = "#0a0f1a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(15,212,160,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15,212,160,0.08)";
                  e.currentTarget.style.color = "#0fd4a0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Pay Online
              </button>

              <button
                style={{
                  padding: "0.55rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "rgba(239,68,68,0.06)",
                  border: "0.5px solid rgba(239,68,68,0.5)",
                  color: "#ef4444",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.borderColor = "#ef4444";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(239,68,68,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.06)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
