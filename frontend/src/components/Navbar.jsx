import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, userData } = useContext(AppContext); // real auth state, not local fake state
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setShowMenu(false);
    setShowDropdown(false);
    scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout(); // real logout: clears context token + localStorage
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const linkStyle = (isActive) => ({
    color: isActive ? "#0fd4a0" : "#8899bb",
    fontWeight: isActive ? 600 : 400,
    fontSize: "0.875rem",
    textDecoration: "none",
    padding: "0.4rem 0.75rem",
    borderRadius: "0.5rem",
    transition: "all 0.25s ease",
    background: isActive ? "rgba(15,212,160,0.08)" : "transparent",
    whiteSpace: "nowrap",
  });

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.5rem",
          background: "rgba(10,15,26,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid rgba(74,158,255,0.12)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          fontFamily: "'DM Sans', sans-serif",
          gap: "1rem",
        }}
      >
        <img
          onClick={() => navigate("/")}
          style={{ width: "120px", cursor: "pointer", flexShrink: 0 }}
          src={assets.logo}
          alt="logo"
        />

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => linkStyle(isActive)}
                onMouseEnter={(e) => {
                  if (e.currentTarget.style.color !== "rgb(15, 212, 160)") {
                    e.currentTarget.style.color = "#e8f0ff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (e.currentTarget.style.color !== "rgb(15, 212, 160)") {
                    e.currentTarget.style.color = "#8899bb";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
          }}
        >
          {token ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <div
                onClick={() => setShowDropdown((p) => !p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "999px",
                  transition: "background 0.2s",
                  background: showDropdown
                    ? "rgba(15,212,160,0.08)"
                    : "transparent",
                }}
              >
                <img
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(15,212,160,0.4)",
                    objectFit: "cover",
                  }}
                  src={userData?.image || assets.profile_pic}
                  alt="profile"
                />
                <img
                  style={{
                    width: "0.55rem",
                    opacity: 0.5,
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s",
                  }}
                  src={assets.dropdown_icon}
                  alt=""
                />
              </div>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.75rem)",
                    right: 0,
                    minWidth: "180px",
                    background: "#141f35",
                    border: "0.5px solid rgba(74,158,255,0.15)",
                    borderRadius: "1rem",
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.15rem",
                    zIndex: 200,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                    animation: "fadeIn 0.15s ease",
                  }}
                >
                  {[
                    {
                      label: "My Profile",
                      action: () => {
                        navigate("/my-profile");
                        setShowDropdown(false);
                      },
                    },
                    {
                      label: "My Appointments",
                      action: () => {
                        navigate("/my-appointments");
                        setShowDropdown(false);
                      },
                    },
                    { label: "Logout", action: handleLogout, danger: true },
                  ].map(({ label, action, danger }) => (
                    <p
                      key={label}
                      onClick={action}
                      style={{
                        color: danger ? "#ef4444" : "#8899bb",
                        fontSize: "0.85rem",
                        padding: "0.6rem 0.875rem",
                        borderRadius: "0.625rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        margin: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = danger
                          ? "rgba(239,68,68,0.08)"
                          : "rgba(15,212,160,0.08)";
                        e.currentTarget.style.color = danger
                          ? "#ef4444"
                          : "#0fd4a0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = danger
                          ? "#ef4444"
                          : "#8899bb";
                      }}
                    >
                      {label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block"
              style={{
                background: "#0fd4a0",
                color: "#0a0f1a",
                border: "none",
                padding: "0.55rem 1.25rem",
                borderRadius: "999px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(15,212,160,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Create Account
            </button>
          )}

          <img
            onClick={() => setShowMenu(true)}
            className="md:hidden"
            style={{ width: "1.4rem", cursor: "pointer" }}
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0f1a",
          zIndex: 300,
          transform: showMenu ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className="md:hidden"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "0.5px solid rgba(74,158,255,0.12)",
          }}
        >
          <img style={{ width: "120px" }} src={assets.logo} alt="" />
          <img
            style={{ width: "1.4rem", cursor: "pointer" }}
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "1.5rem",
            listStyle: "none",
            margin: 0,
          }}
        >
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  display: "block",
                  padding: "0.875rem 1.25rem",
                  borderRadius: "0.875rem",
                  fontSize: "1.05rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0fd4a0" : "#8899bb",
                  background: isActive
                    ? "rgba(15,212,160,0.08)"
                    : "transparent",
                  border: `0.5px solid ${isActive ? "rgba(15,212,160,0.2)" : "transparent"}`,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {token && (
          <div style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
            <div
              style={{
                height: "0.5px",
                background: "rgba(74,158,255,0.12)",
                marginBottom: "1rem",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <img
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(15,212,160,0.4)",
                  objectFit: "cover",
                }}
                src={userData?.image || assets.profile_pic}
                alt=""
              />
              <div>
                <p
                  style={{
                    color: "#e8f0ff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  {userData?.name || "My Account"}
                </p>
                <p style={{ color: "#8899bb", fontSize: "0.75rem", margin: 0 }}>
                  Manage your profile
                </p>
              </div>
            </div>
            {[
              {
                label: "My Profile",
                action: () => {
                  navigate("/my-profile");
                  handleNavClick();
                },
              },
              {
                label: "My Appointments",
                action: () => {
                  navigate("/my-appointments");
                  handleNavClick();
                },
              },
              {
                label: "Logout",
                action: () => {
                  handleLogout();
                  handleNavClick();
                },
                danger: true,
              },
            ].map(({ label, action, danger }) => (
              <p
                key={label}
                onClick={action}
                style={{
                  color: danger ? "#ef4444" : "#8899bb",
                  fontSize: "0.9rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  margin: "0.25rem 0",
                  transition: "all 0.2s ease",
                  border: "0.5px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = danger
                    ? "rgba(239,68,68,0.08)"
                    : "rgba(15,212,160,0.08)";
                  e.currentTarget.style.color = danger ? "#ef4444" : "#0fd4a0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = danger ? "#ef4444" : "#8899bb";
                }}
              >
                {label}
              </p>
            ))}
          </div>
        )}

        {!token && (
          <div style={{ padding: "1rem 1.5rem" }}>
            <button
              onClick={() => {
                navigate("/login");
                handleNavClick();
              }}
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "999px",
                background: "#0fd4a0",
                color: "#0a0f1a",
                border: "none",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Create Account
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default Navbar;
