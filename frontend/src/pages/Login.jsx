import React, { useState } from "react";

const inputStyle = {
  background: "#0f1829",
  border: "0.5px solid rgba(74,158,255,0.2)",
  borderRadius: "10px",
  color: "#e8f0ff",
  padding: "0.6rem 0.875rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.3s",
};

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center px-4"
      style={{ background: "#0a0f1a" }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: "#141f35",
          border: "0.5px solid rgba(74,158,255,0.12)",
        }}
      >
        {/* Heading */}
        <div>
          <p
            className="text-2xl font-semibold mb-1"
            style={{ fontFamily: "'Playfair Display',serif", color: "#e8f0ff" }}
          >
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </p>
          <p className="text-sm" style={{ color: "#8899bb" }}>
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an
            appointment
          </p>
        </div>

        <div style={{ height: "0.5px", background: "rgba(74,158,255,0.1)" }} />

        {/* Full name — only for sign up */}
        {state === "Sign Up" && (
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "#4a5878" }}
            >
              Full Name
            </label>
            <input
              style={inputStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Isha Sharma"
              onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(74,158,255,0.2)")
              }
            />
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "#4a5878" }}
          >
            Email
          </label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(74,158,255,0.2)")
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "#4a5878" }}
          >
            Password
          </label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(74,158,255,0.2)")
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 mt-1"
          style={{ background: "#0fd4a0", color: "#0a0f1a" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(15,212,160,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-center" style={{ color: "#8899bb" }}>
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="cursor-pointer font-medium underline"
                style={{ color: "#0fd4a0" }}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="cursor-pointer font-medium underline"
                style={{ color: "#0fd4a0" }}
              >
                Sign up here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
