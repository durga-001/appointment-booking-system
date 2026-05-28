import React, { useState } from "react";
import { assets } from "../assets/assets";

const inputStyle = {
  background: "#0f1829",
  border: "0.5px solid rgba(74,158,255,0.2)",
  borderRadius: "10px",
  color: "#e8f0ff",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.3s",
};

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Isha Sharma",
    image: assets.profile_pic,
    email: "ishaaaa@gmail.com",
    phone: "+1 123 456 7890",
    address: { line1: "Road cross-12, Diamond Way", line2: "New Road, Norves" },
    gender: "Female",
    dob: "2001-12-21",
  });

  const [isEdit, setIsEdit] = useState(false);

  const Section = ({ label, children }) => (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3 mt-6"
        style={{ color: "#4a5878" }}
      >
        {label}
      </p>
      {children}
    </div>
  );

  const Row = ({ label, children }) => (
    <div
      className="grid grid-cols-[130px_1fr] gap-3 items-center py-2"
      style={{ borderBottom: "0.5px solid rgba(74,158,255,0.08)" }}
    >
      <p className="text-sm" style={{ color: "#8899bb" }}>
        {label}
      </p>
      {children}
    </div>
  );

  return (
    <div
      className="min-h-screen px-4 sm:px-8 md:px-12 py-10"
      style={{ background: "#0a0f1a" }}
    >
      <div
        className="max-w-lg rounded-2xl p-8"
        style={{
          background: "#141f35",
          border: "0.5px solid rgba(74,158,255,0.12)",
        }}
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-5 mb-6">
          <img
            className="w-20 h-20 rounded-2xl object-cover"
            style={{ border: "2px solid rgba(15,212,160,0.3)" }}
            src={userData.image}
            alt="Profile"
          />
          <div className="flex-1">
            {isEdit ? (
              <input
                style={{
                  ...inputStyle,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, name: e.target.value }))
                }
              />
            ) : (
              <p
                className="text-2xl font-semibold"
                style={{
                  fontFamily: "'Playfair Display',serif",
                  color: "#e8f0ff",
                }}
              >
                {userData.name}
              </p>
            )}
            <p className="text-xs mt-1" style={{ color: "#0fd4a0" }}>
              Patient Profile
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "0.5px", background: "rgba(74,158,255,0.12)" }} />

        {/* Contact info */}
        <Section label="Contact Information">
          <Row label="Email">
            <p className="text-sm" style={{ color: "#4a9eff" }}>
              {userData.email}
            </p>
          </Row>
          <Row label="Phone">
            {isEdit ? (
              <input
                style={inputStyle}
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm" style={{ color: "#4a9eff" }}>
                {userData.phone}
              </p>
            )}
          </Row>
          <Row label="Address">
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  style={inputStyle}
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((p) => ({
                      ...p,
                      address: { ...p.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((p) => ({
                      ...p,
                      address: { ...p.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8899bb" }}
              >
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </Row>
        </Section>

        {/* Basic details */}
        <Section label="Basic Details">
          <Row label="Gender">
            {isEdit ? (
              <select
                style={inputStyle}
                value={userData.gender}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-sm" style={{ color: "#8899bb" }}>
                {userData.gender}
              </p>
            )}
          </Row>
          <Row label="Date of Birth">
            {isEdit ? (
              <input
                style={inputStyle}
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm" style={{ color: "#8899bb" }}>
                {userData.dob}
              </p>
            )}
          </Row>
        </Section>

        {/* Action button */}
        <div className="mt-8">
          <button
            onClick={() => setIsEdit((p) => !p)}
            className="px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: isEdit ? "#0fd4a0" : "transparent",
              border: "0.5px solid rgba(15,212,160,0.4)",
              color: isEdit ? "#0a0f1a" : "#0fd4a0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(15,212,160,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
