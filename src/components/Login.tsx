import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Coffee, Mail, Lock, Sparkles, Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ username: email, password });
    } catch {
      notify("Email ou mot de passe invalide", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, Roboto, sans-serif",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          className="animate-spin-slow"
          style={{
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            border: "4px solid rgba(205, 91, 50, 0.12)",
          }}
        />
        <div
          className="animate-spin-slower"
          style={{
            position: "absolute",
            bottom: "-50%",
            left: "-50%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "4px solid rgba(205, 91, 50, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(205,91,50,0.07) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* Login Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "28px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.1)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "5px",
            background: "linear-gradient(90deg, #cd5b32, #a44928, #7b371e)",
          }}
        />

        <div style={{ padding: "40px" }}>
          {/* Logo & title */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="animate-pulse-glow"
              style={{
                display: "inline-flex",
                padding: "16px",
                borderRadius: "20px",
                backgroundColor: "var(--bg-subtle)",
                marginBottom: "16px",
              }}
            >
              <Coffee size={32} color="var(--btn-primary)" />
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--txt-title)",
                letterSpacing: "-0.04em",
                margin: "0 0 6px",
              }}
            >
              EventSync
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--txt-secondary)",
                fontWeight: 500,
                margin: "0 0 14px",
              }}
            >
              Administration Panel
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--badge-txt)",
                backgroundColor: "var(--badge-bg)",
                padding: "5px 12px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
              }}
            >
              <Sparkles size={12} />
              Secure Access
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Email field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--txt-secondary)",
                  marginBottom: "6px",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--txt-disabled)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@eventsync.com"
                  required
                  autoFocus
                  style={{
                    width: "100%",
                    paddingLeft: "44px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    backgroundColor: "var(--bg-subtle)",
                    border: "2px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--txt-title)",
                    fontSize: "14px",
                    fontFamily: "Inter, Roboto, sans-serif",
                    outline: "none",
                    transition: "all 0.25s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--btn-primary)";
                    e.currentTarget.style.backgroundColor = "var(--bg-card)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 4px rgba(205, 91, 50, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--txt-secondary)",
                  marginBottom: "6px",
                }}
              >
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--txt-disabled)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    paddingLeft: "44px",
                    paddingRight: "48px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    backgroundColor: "var(--bg-subtle)",
                    border: "2px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--txt-title)",
                    fontSize: "14px",
                    fontFamily: "Inter, Roboto, sans-serif",
                    outline: "none",
                    transition: "all 0.25s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--btn-primary)";
                    e.currentTarget.style.backgroundColor = "var(--bg-card)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 4px rgba(205, 91, 50, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "6px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    color: "var(--txt-disabled)",
                    display: "flex",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
                    e.currentTarget.style.color = "var(--txt-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--txt-disabled)";
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "-8px" }}>
              <button
                type="button"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--btn-primary)",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontFamily: "Inter, Roboto, sans-serif",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: isLoading
                  ? "var(--btn-primary-disabled)"
                  : "var(--btn-primary)",
                color: "var(--btn-primary-txt)",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Inter, Roboto, sans-serif",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: isLoading
                  ? "none"
                  : "0 4px 14px rgba(205, 91, 50, 0.35)",
                transition: "all 0.25s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-hover)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(205, 91, 50, 0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "var(--btn-primary)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(205, 91, 50, 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      width: "18px",
                      height: "18px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--txt-disabled)",
                margin: "0 0 4px",
              }}
            >
              Event Management Platform
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "var(--txt-disabled)",
                opacity: 0.6,
                margin: 0,
              }}
            >
              🔒 Protégé par chiffrement SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
