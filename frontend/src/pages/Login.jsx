import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

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
  const { token, login, signup } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Don't show the login form at all.
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    const result =
      state === "Sign Up"
        ? await signup(name, email, password)
        : await login(email, password);

    setSubmitting(false);

    if (result.success) {
      navigate("/");
    } else {
      setErrorMessage(
        result.message || "Something went wrong. Please try again.",
      );
    }
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
              required
              onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(74,158,255,0.2)")
              }
            />
          </div>
        )}

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
            required
            onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(74,158,255,0.2)")
            }
          />
        </div>

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
            required
            onFocus={(e) => (e.target.style.borderColor = "#0fd4a0")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(74,158,255,0.2)")
            }
          />
        </div>

        {errorMessage && (
          <p className="text-sm" style={{ color: "#ef4444" }}>
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 mt-1"
          style={{
            background: submitting ? "#0a8f6e" : "#0fd4a0",
            color: "#0a0f1a",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting
            ? "Please wait..."
            : state === "Sign Up"
              ? "Create Account"
              : "Login"}
        </button>

        <p className="text-sm text-center" style={{ color: "#8899bb" }}>
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("Login");
                  setErrorMessage("");
                }}
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
                onClick={() => {
                  setState("Sign Up");
                  setErrorMessage("");
                }}
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
