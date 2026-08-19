import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

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
  const { userData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  // keep local editable copy in sync with real context data
  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const saveProfile = async () => {
    try {
      setSaving(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        {
          name: formData.name,
          phone: formData.phone,
          address: JSON.stringify(formData.address),
          dob: formData.dob,
          gender: formData.gender,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        await loadUserProfileData(); // refresh from server so context stays in sync
        setIsEdit(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

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

  if (!formData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0f1a", color: "#8899bb" }}
      >
        Loading profile...
      </div>
    );
  }

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
        <div className="flex items-center gap-5 mb-6">
          <img
            className="w-20 h-20 rounded-2xl object-cover"
            style={{ border: "2px solid rgba(15,212,160,0.3)" }}
            src={formData.image || assets.profile_pic}
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
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
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
                {formData.name}
              </p>
            )}
            <p className="text-xs mt-1" style={{ color: "#0fd4a0" }}>
              Patient Profile
            </p>
          </div>
        </div>

        <div style={{ height: "0.5px", background: "rgba(74,158,255,0.12)" }} />

        <Section label="Contact Information">
          <Row label="Email">
            <p className="text-sm" style={{ color: "#4a9eff" }}>
              {formData.email}
            </p>
          </Row>
          <Row label="Phone">
            {isEdit ? (
              <input
                style={inputStyle}
                type="text"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm" style={{ color: "#4a9eff" }}>
                {formData.phone || "Not set"}
              </p>
            )}
          </Row>
          <Row label="Address">
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  style={inputStyle}
                  type="text"
                  value={formData.address?.line1 || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      address: { ...p.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={formData.address?.line2 || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
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
                {formData.address?.line1 || "Not set"}
                <br />
                {formData.address?.line2}
              </p>
            )}
          </Row>
        </Section>

        <Section label="Basic Details">
          <Row label="Gender">
            {isEdit ? (
              <select
                style={inputStyle}
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, gender: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-sm" style={{ color: "#8899bb" }}>
                {formData.gender || "Not set"}
              </p>
            )}
          </Row>
          <Row label="Date of Birth">
            {isEdit ? (
              <input
                style={inputStyle}
                type="date"
                value={formData.dob || ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm" style={{ color: "#8899bb" }}>
                {formData.dob || "Not set"}
              </p>
            )}
          </Row>
        </Section>

        <div className="mt-8">
          <button
            disabled={saving}
            onClick={() => (isEdit ? saveProfile() : setIsEdit(true))}
            className="px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: isEdit ? "#0fd4a0" : "transparent",
              border: "0.5px solid rgba(15,212,160,0.4)",
              color: isEdit ? "#0a0f1a" : "#0fd4a0",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
