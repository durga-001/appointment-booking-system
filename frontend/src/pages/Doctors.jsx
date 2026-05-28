import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const specialities = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div
      className="min-h-screen px-4 sm:px-8 md:px-12 py-10"
      style={{ background: "#0a0f1a", color: "#e8f0ff" }}
    >
      {/* Page heading */}
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#e8f0ff" }}
        >
          Find a Doctor
        </h1>
        <p className="text-sm" style={{ color: "#8899bb" }}>
          Browse through our specialists and book your appointment hassle-free.
        </p>
      </div>

      {/* Mobile filter toggle */}
      <button
        className="sm:hidden mb-4 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
        onClick={() => setShowFilter((prev) => !prev)}
        style={{
          background: showFilter ? "#0fd4a0" : "transparent",
          color: showFilter ? "#0a0f1a" : "#0fd4a0",
          border: "0.5px solid rgba(15,212,160,0.4)",
        }}
      >
        {showFilter ? "Hide Filters ✕" : "Show Filters ≡"}
      </button>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* ── Sidebar ── */}
        <div
          className={`flex-col gap-2 w-full sm:w-52 shrink-0 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#4a5878" }}
          >
            Speciality
          </p>
          {specialities.map((spec) => {
            const isActive = speciality === spec;
            return (
              <button
                key={spec}
                onClick={() =>
                  isActive ? navigate("/doctors") : navigate(`/doctors/${spec}`)
                }
                className="text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 w-full"
                style={{
                  background: isActive ? "rgba(15,212,160,0.12)" : "#141f35",
                  border: isActive
                    ? "0.5px solid #0fd4a0"
                    : "0.5px solid rgba(74,158,255,0.12)",
                  color: isActive ? "#0fd4a0" : "#8899bb",
                  fontWeight: isActive ? "500" : "400",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(15,212,160,0.3)";
                    e.currentTarget.style.color = "#e8f0ff";
                    e.currentTarget.style.background = "#1a2844";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(74,158,255,0.12)";
                    e.currentTarget.style.color = "#8899bb";
                    e.currentTarget.style.background = "#141f35";
                  }
                }}
              >
                {isActive && (
                  <span className="mr-2" style={{ color: "#0fd4a0" }}>
                    ▸
                  </span>
                )}
                {spec}
              </button>
            );
          })}
        </div>

        {/* ── Doctors grid ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-[350ms]"
              style={{
                background: "#141f35",
                border: "0.5px solid rgba(74,158,255,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "rgba(15,212,160,0.35)";
                e.currentTarget.style.boxShadow =
                  "0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(15,212,160,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(74,158,255,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Doctor image */}
              <div
                className="w-full relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #0d2040 0%, #0a1a30 100%)",
                }}
              >
                <img
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  src={item.image}
                  alt={item.name}
                />
                {/* Bottom fade into card */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, #141f35)",
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <div
                  className="flex items-center gap-2 text-xs mb-1"
                  style={{ color: "#0fd4a0" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "#0fd4a0",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  Available
                </div>
                <p
                  className="text-base font-medium"
                  style={{ color: "#e8f0ff" }}
                >
                  {item.name}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#8899bb" }}>
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filterDoc.length === 0 && (
            <div
              className="col-span-full flex flex-col items-center justify-center py-20 rounded-2xl"
              style={{
                background: "#141f35",
                border: "0.5px solid rgba(74,158,255,0.12)",
                color: "#4a5878",
              }}
            >
              <p className="text-4xl mb-3">🩺</p>
              <p className="text-sm">No doctors found for this speciality.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
