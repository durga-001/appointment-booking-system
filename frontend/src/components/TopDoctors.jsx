import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div
      className="flex flex-col items-center gap-4 my-0 py-16 md:mx-10"
      style={{ background: "#0a0f1a" }}
    >
      {/* Heading */}
      <h1
        className="text-3xl font-semibold"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e8f0ff" }}
      >
        Our Top Doctors
      </h1>
      <p className="sm:w-1/3 text-center text-sm" style={{ color: "#8899bb" }}>
        Browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor cards grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
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
              className="w-full overflow-hidden relative"
              style={{
                background: "linear-gradient(160deg, #0d2040 0%, #0a1a30 100%)",
              }}
            >
              <img
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                src={item.image}
                alt={item.name}
              />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #141f35)",
                }}
              />
            </div>

            {/* Info */}
            <div className="p-4">
              {/* Available badge */}
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
              <p className="text-base font-medium" style={{ color: "#e8f0ff" }}>
                {item.name}
              </p>
              <p className="text-sm mt-0.5" style={{ color: "#8899bb" }}>
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="px-12 py-3 rounded-full mt-6 text-sm font-medium transition-all duration-300"
        style={{
          background: "transparent",
          border: "0.5px solid rgba(15,212,160,0.4)",
          color: "#0fd4a0",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(15,212,160,0.1)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,212,160,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        View All Doctors →
      </button>
    </div>
  );
};

export default TopDoctors;
