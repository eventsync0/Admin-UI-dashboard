import React, { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import {
  Calendar,
  Mail,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  Star,
  Activity,
} from "lucide-react";

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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030305", // Fond très sombre de base
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Arrière-plan : Effet Bokeh / Concert Lights */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "25%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {}
      {/* 2. Arrière-plan : Anneaux concentriques orangés (Copie exacte de l'image) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Glow central intense */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(234, 88, 12, 0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Anneau 1 (Intérieur, épais et brillant) */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "6px solid rgba(234, 88, 12, 0.4)",
            boxShadow:
              "0 0 60px rgba(234, 88, 12, 0.4), inset 0 0 40px rgba(234, 88, 12, 0.2)",
          }}
        />
        {/* Anneau 2 (Médian, plus fin) */}
        <div
          style={{
            position: "absolute",
            width: "680px",
            height: "680px",
            borderRadius: "50%",
            border: "2px solid rgba(234, 88, 12, 0.3)",
            boxShadow: "0 0 30px rgba(234, 88, 12, 0.15)",
          }}
        />
        {/* Anneau 3 (Extérieur, très fin et large) */}
        <div
          style={{
            position: "absolute",
            width: "880px",
            height: "880px",
            borderRadius: "50%",
            border: "1px solid rgba(234, 88, 12, 0.15)",
          }}
        />
      </div>

      {}
      {/* 3. Arrière-plan : Ondes (Soundwaves multiples croisées) */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          style={{ width: "100%", height: "400px", opacity: 0.8 }}
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          {/* Ondes Orangées/Dorées principales */}
          <path
            d="M0,200 Q150,50 300,200 T600,200 T900,200 T1200,200"
            fill="none"
            stroke="rgba(249, 115, 22, 0.6)"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 8px rgba(249,115,22,0.5))" }}
          />
          <path
            d="M0,200 Q100,300 250,200 T550,200 T850,200 T1200,200"
            fill="none"
            stroke="rgba(249, 115, 22, 0.4)"
            strokeWidth="1"
          />
          <path
            d="M0,200 Q200,100 400,200 T800,200 T1200,200"
            fill="none"
            stroke="rgba(253, 186, 116, 0.5)"
            strokeWidth="0.8"
          />

          {/* Ondes Bleutées/Violettes secondaires pour le contraste (comme sur l'image) */}
          <path
            d="M0,200 Q120,350 350,200 T700,200 T1050,200 T1200,200"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
          />
          <path
            d="M0,200 Q180,50 450,200 T850,200 T1200,200"
            fill="none"
            stroke="rgba(129, 140, 248, 0.2)"
            strokeWidth="1.5"
          />

          {/* Grille d'ondes fines type oscilloscope */}
          <path
            d="M0,200 C100,150 150,250 300,200 C450,150 500,250 600,200 C700,150 750,250 900,200 C1050,150 1100,250 1200,200"
            fill="none"
            stroke="rgba(234, 88, 12, 0.5)"
            strokeWidth="0.5"
          />
          <path
            d="M0,200 C120,280 180,120 350,200 C520,280 580,120 700,200 C820,280 880,120 1050,200 C1150,240 1180,180 1200,200"
            fill="none"
            stroke="rgba(234, 88, 12, 0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {}
      {/* 4. Carte Principale Glassmorphism */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "400px",
          padding: "40px 32px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)", // Pour Safari
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {}
        {/* Logo Container (Carré arrondi translucide avec icône) */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow:
              "0 10px 30px rgba(234, 88, 12, 0.2), inset 0 0 20px rgba(234, 88, 12, 0.15)",
            position: "relative",
          }}
        >
          {/* Composition de l'icône personnalisée semblable à l'image */}
          <div style={{ position: "relative", width: "32px", height: "32px" }}>
            <Calendar
              color="#ea580c"
              size={32}
              strokeWidth={1.5}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <Activity
              color="#ea580c"
              size={16}
              strokeWidth={2.5}
              style={{ position: "absolute", top: "10px", left: "8px" }}
            />
            <Star
              color="#ea580c"
              size={14}
              fill="#ea580c"
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                filter: "drop-shadow(0 0 4px rgba(234,88,12,0.8))",
              }}
            />
          </div>
        </div>

        {/* Titres */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
          }}
        >
          EventSync
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.6)",
            margin: "0 0 16px",
            fontWeight: 400,
          }}
        >
          Administration Panel
        </p>

        {/* Badge Secure */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "99px",
            backgroundColor: "rgba(234, 88, 12, 0.1)",
            border: "1px solid rgba(234, 88, 12, 0.25)",
            color: "#ffedd5",
            fontSize: "11px",
            fontWeight: 500,
            marginBottom: "32px",
          }}
        >
          <Sparkles size={12} color="#f97316" />
          Secure Access
        </div>

        {}
        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Champ Email */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "6px",
                marginLeft: "2px",
              }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255, 255, 255, 0.6)",
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
                  padding: "12px 14px 12px 40px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(234, 88, 12, 0.5)", // Bordure orangée par défaut comme sur l'image
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "13px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#f97316";
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(234, 88, 12, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 88, 12, 0.5)";
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {}
          {/* Champ Mot de passe */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "6px",
                marginLeft: "2px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255, 255, 255, 0.6)",
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
                  padding: "12px 40px 12px 40px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.15)", // Bordure grise par défaut
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "13px",
                  letterSpacing: showPassword ? "normal" : "0.15em",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#f97316";
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(234, 88, 12, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
                }
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Lien Mdp oublié */}
          <div style={{ textAlign: "right", marginTop: "-6px" }}>
            <button
              type="button"
              style={{
                fontSize: "11px",
                fontWeight: 400,
                color: "#ea580c",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ea580c")}
            >
              Mot de passe oublié ?
            </button>
          </div>

          {}
          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              background: isLoading
                ? "rgba(234, 88, 12, 0.5)"
                : "linear-gradient(90deg, #ea580c 0%, #d94a00 100%)", // Dégradé orangé précis
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              boxShadow: isLoading
                ? "none"
                : "0 4px 12px rgba(234, 88, 12, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(234, 88, 12, 0.4)";
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #f97316 0%, #ea580c 100%)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(234, 88, 12, 0.3)";
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #ea580c 0%, #d94a00 100%)";
              }
            }}
          >
            {isLoading ? (
              <span>Connexion...</span>
            ) : (
              <>
                <span>Se connecter</span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "32px",
            width: "100%",
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: "0 0 6px",
              fontWeight: 400,
            }}
          >
            Plateforme de Gestion d'Événements
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <Lock size={10} /> Protégé par chiffrement SSL
          </div>
        </div>
      </div>
    </div>
  );
};
