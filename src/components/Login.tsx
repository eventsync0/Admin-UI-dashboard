import { useState } from "react";
import { useLogin, useNotify } from "react-admin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ username: email, password });
    } catch (error) {
      notify("Email ou mot de passe invalide", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "var(--background)",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          padding: "2.5rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          width: "420px",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "var(--btn-primary)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "30px",
            }}
          >
            📅
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "var(--txt-title)",
            }}
          >
            EventSync
          </h2>
          <p
            style={{
              margin: "0.5rem 0 0",
              color: "var(--txt-secondary)",
              fontSize: "0.875rem",
            }}
          >
            Administration
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "var(--txt-body)",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@eventsync.com"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: `1px solid var(--border)`,
                backgroundColor: "var(--bg-card)",
                color: "var(--txt-body)",
                fontSize: "0.875rem",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--btn-primary)";
                e.target.style.outline = "none";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
              }}
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "var(--txt-body)",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: `1px solid var(--border)`,
                backgroundColor: "var(--bg-card)",
                color: "var(--txt-body)",
                fontSize: "0.875rem",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--btn-primary)";
                e.target.style.outline = "none";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: isLoading
                ? "var(--btn-primary-disabled)"
                : "var(--btn-primary)",
              color: "var(--btn-primary-txt)",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor =
                  "var(--btn-primary-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "var(--btn-primary)";
              }
            }}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: `1px solid var(--border)`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--txt-disabled)",
              fontSize: "0.75rem",
            }}
          >
            Plateforme de gestion d'événements
          </p>
        </div>
      </div>
    </div>
  );
};
