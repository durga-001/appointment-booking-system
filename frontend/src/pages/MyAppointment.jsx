import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { appointments, cancelAppointment, payAppointment } =
    useContext(AppContext);
  const navigate = useNavigate();

  const formatSlotDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        background: "#0a0f1a",
        minHeight: "100vh",
        padding: "2.5rem 2rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
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

      {appointments.length === 0 ? (
        <div
          style={{ color: "#8899bb", textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{ marginBottom: "1rem" }}>
            You don't have any appointments yet.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "999px",
              background: "#0fd4a0",
              color: "#0a0f1a",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Browse Doctors
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {appointments.map((appt) => (
            <div
              key={appt.id}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "1rem",
                background: "#141f35",
                border: "0.5px solid rgba(74,158,255,0.15)",
                alignItems: "center",
                opacity: appt.cancelled ? 0.5 : 1,
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <img
                  src={appt.docData.image}
                  alt={appt.docData.name}
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
                  }}
                >
                  {appt.docData.name}
                </p>
                <p
                  style={{
                    color: "#0fd4a0",
                    fontSize: "0.8rem",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {appt.docData.speciality}
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
                <p style={{ color: "#8899bb", fontSize: "0.73rem", margin: 0 }}>
                  {appt.docData.address.line1}
                </p>
                <p style={{ color: "#8899bb", fontSize: "0.73rem", margin: 0 }}>
                  {appt.docData.address.line2}
                </p>

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
                    📅 {formatSlotDate(appt.slotDate)} · {appt.slotTime}
                  </span>
                  {appt.cancelled && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.7rem",
                        color: "#ef4444",
                        fontWeight: 600,
                      }}
                    >
                      CANCELLED
                    </span>
                  )}
                  {appt.payment && !appt.cancelled && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.7rem",
                        color: "#0fd4a0",
                        fontWeight: 600,
                      }}
                    >
                      PAID
                    </span>
                  )}
                </div>
              </div>

              {!appt.cancelled && (
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    width: "130px",
                  }}
                >
                  {!appt.payment && (
                    <button
                      onClick={() => payAppointment(appt.id)}
                      style={{
                        padding: "0.55rem 0.75rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "rgba(15,212,160,0.08)",
                        border: "0.5px solid #0fd4a0",
                        color: "#0fd4a0",
                        width: "100%",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Pay Online
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm("Cancel this appointment?")) {
                        cancelAppointment(appt.id);
                      }
                    }}
                    style={{
                      padding: "0.55rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: "rgba(239,68,68,0.06)",
                      border: "0.5px solid rgba(239,68,68,0.5)",
                      color: "#ef4444",
                      width: "100%",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
