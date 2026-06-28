// pages/events/EventShow.tsx (extrait de la bannière corrigée)
import { useShowContext, Show } from "react-admin";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Edit,
  Users,
  CheckCircle,
  FileText,
  Home,
  Info,
} from "lucide-react";

// === CATEGORIES ===
const CATEGORIES: Record<string, { label: string; color: string; bg: string }> =
  {
    CONFERENCE: { label: "Conférence", color: "#7c3aed", bg: "#f5f3ff" },
    WORKSHOP: { label: "Atelier", color: "#2563eb", bg: "#eff6ff" },
    SEMINAR: { label: "Séminaire", color: "#4338ca", bg: "#eef2ff" },
    MEETUP: { label: "Meetup", color: "#059669", bg: "#ecfdf5" },
    WEBINAR: { label: "Webinaire", color: "#0d9488", bg: "#f0fdfa" },
    SOCIAL: { label: "Social", color: "#db2777", bg: "#fdf2f8" },
    FUNDRAISER: { label: "Collecte", color: "#e11d48", bg: "#fff1f2" },
    SPORTS: { label: "Sports", color: "#dc2626", bg: "#fef2f2" },
    ARTS: { label: "Arts", color: "#c026d3", bg: "#fdf4ff" },
    TECHNOLOGY: { label: "Technologie", color: "#0891b2", bg: "#ecfeff" },
    BUSINESS: { label: "Affaires", color: "#d97706", bg: "#fffbeb" },
    EDUCATION: { label: "Éducation", color: "#65a30d", bg: "#f7fee7" },
    OTHER: { label: "Autre", color: "#6b7280", bg: "#f9fafb" },
  };

// === COULEURS COFFEE BEAN ===
const COLORS = {
  coffee: {
    50: "#ede1db",
    100: "#f5ded6",
    200: "#ebbdad",
    300: "#e19d84",
    400: "#d77c5b",
    500: "#cd5b32",
    600: "#a44928",
    700: "#7b371e",
    800: "#522414",
    900: "#29120a",
    950: "#1d0d07",
  },
  background: "#0B0B14",
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",
};

// === FORMAT DATE ===
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTimeOnly = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// === STYLES ===
const cardStyle = {
  backgroundColor: "#29120a",
  border: "1px solid #522414",
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
};

// === COMPOSANT PRINCIPAL ===
const EventShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
          backgroundColor: "#0B0B14",
          minHeight: "100vh",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              ...cardStyle,
              height: i === 1 ? "60px" : i === 2 ? "120px" : "200px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    );
  }

  if (!record) {
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: "#0B0B14",
          minHeight: "100vh",
        }}
      >
        <div
          style={{ ...cardStyle, textAlign: "center", padding: "48px 24px" }}
        >
          <Info size={48} style={{ color: "#d77c5b", marginBottom: "16px" }} />
          <h3
            style={{
              color: "#ede1db",
              marginBottom: "8px",
              fontFamily: "Audiowide, cursive",
            }}
          >
            Événement introuvable
          </h3>
          <p
            style={{
              color: "#e19d84",
              marginBottom: "16px",
              fontFamily: "Quicksand, sans-serif",
            }}
          >
            L'événement que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "linear-gradient(90deg, #d77c5b, #a44928)",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ArrowLeft size={16} />
            Retourner aux événements
          </Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[record.category] || CATEGORIES.OTHER;

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#0B0B14",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADER avec navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            paddingBottom: "16px",
            borderBottom: "1px solid #522414",
          }}
        >
          <Link
            to="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e19d84",
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontFamily: "Quicksand, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ede1db";
              e.currentTarget.style.transform = "translateX(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e19d84";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <ArrowLeft size={16} />
            Retour aux événements
          </Link>
          <Link
            to={`/events/${record.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: "linear-gradient(90deg, #d77c5b, #a44928)",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(205, 91, 50, 0.3)",
              transition: "all 0.3s ease",
              fontFamily: "Quicksand, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(205, 91, 50, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 12px rgba(205, 91, 50, 0.3)";
            }}
          >
            <Edit size={15} />
            Modifier l'événement
          </Link>
        </div>

        {/* BANNIÈRE HERO - fond uniforme comme le Dashboard */}
        <div
          style={{
            ...cardStyle,
            backgroundColor: "#29120a",
            borderLeft: `4px solid ${cat.color}`,
            padding: "28px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "999px",
                backgroundColor: cat.bg,
                color: cat.color,
                border: `1px solid ${cat.color}33`,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              {cat.label}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#d77c5b",
                fontWeight: 500,
                fontFamily: "monospace",
              }}
            >
              #{record.id}
            </span>
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#ede1db",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              margin: 0,
              fontFamily: "Audiowide, cursive",
            }}
          >
            {record.title}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#e19d84",
              marginTop: "8px",
              fontFamily: "Quicksand, sans-serif",
            }}
          >
            {record.location}
          </p>
        </div>

        {/* CONTENU PRINCIPAL - 2 colonnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* COLONNE GAUCHE */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* DESCRIPTION */}
            <div style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(215, 124, 91, 0.2)",
                    color: "#d77c5b",
                    display: "flex",
                  }}
                >
                  <FileText size={16} />
                </div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#ede1db",
                    margin: 0,
                    fontFamily: "Audiowide, cursive",
                  }}
                >
                  Description
                </h2>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#e19d84",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                  margin: 0,
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                {record.description ||
                  "Aucune description fournie pour cet événement."}
              </p>
            </div>

            {/* SESSIONS */}
            <div style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(215, 124, 91, 0.2)",
                    color: "#d77c5b",
                    display: "flex",
                  }}
                >
                  <Clock size={16} />
                </div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#ede1db",
                    margin: 0,
                    fontFamily: "Audiowide, cursive",
                  }}
                >
                  Sessions associées
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#e19d84",
                      backgroundColor: "#522414",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      marginLeft: "6px",
                    }}
                  >
                    {record.sessions?.length || 0}
                  </span>
                </h2>
              </div>

              {!record.sessions || record.sessions.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 16px",
                    backgroundColor: "#522414",
                    borderRadius: "12px",
                    border: "2px dashed #522414",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#e19d84",
                      margin: 0,
                      fontFamily: "Quicksand, sans-serif",
                    }}
                  >
                    Aucune session n'est planifiée pour cet événement.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {record.sessions.map((session: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: "20px",
                        backgroundColor: "#522414",
                        borderRadius: "14px",
                        border: "1px solid #522414",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#d77c5b";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#522414";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#ede1db",
                            margin: 0,
                            fontFamily: "Quicksand, sans-serif",
                          }}
                        >
                          {session.title}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "3px 8px",
                              borderRadius: "6px",
                              backgroundColor: "#29120a",
                              color: "#e19d84",
                              border: "1px solid #522414",
                              fontFamily: "Quicksand, sans-serif",
                            }}
                          >
                            <Home size={11} />
                            Salle: {session.roomId || "N/A"}
                          </span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "3px 8px",
                              borderRadius: "6px",
                              backgroundColor: "rgba(215, 124, 91, 0.2)",
                              color: "#d77c5b",
                              border: "1px solid rgba(215, 124, 91, 0.3)",
                              fontFamily: "Quicksand, sans-serif",
                            }}
                          >
                            <Users size={11} />
                            Capacité: {session.capacity || "N/A"}
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#e19d84",
                          marginBottom: "12px",
                          lineHeight: "1.55",
                          fontFamily: "Quicksand, sans-serif",
                        }}
                      >
                        {session.description ||
                          "Aucune description pour cette session."}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontSize: "12px",
                          color: "#d77c5b",
                          fontWeight: 500,
                          fontFamily: "Quicksand, sans-serif",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Calendar size={12} />
                          <span>{formatDate(session.startTime)}</span>
                        </div>
                        <span>—</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Clock size={12} />
                          <span>{formatTimeOnly(session.endTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLONNE DROITE - Logistique */}
          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#ede1db",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid #522414",
                fontFamily: "Audiowide, cursive",
              }}
            >
              Logistique & Dates
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  icon: <MapPin size={16} />,
                  bg: "rgba(220, 38, 38, 0.1)",
                  color: "#dc2626",
                  label: "Lieu",
                  value: record.location || "Non spécifié",
                },
                {
                  icon: <Calendar size={16} />,
                  bg: "rgba(37, 99, 235, 0.1)",
                  color: "#2563eb",
                  label: "Date de début",
                  value: formatDate(record.startDate),
                },
                {
                  icon: <Calendar size={16} />,
                  bg: "rgba(5, 150, 105, 0.1)",
                  color: "#059669",
                  label: "Date de fin",
                  value: formatDate(record.endDate),
                },
                ...(record.maxAttendees !== undefined
                  ? [
                      {
                        icon: <Users size={16} />,
                        bg: "rgba(124, 58, 237, 0.1)",
                        color: "#7c3aed",
                        label: "Capacité max",
                        value: `${record.maxAttendees} participants`,
                      },
                    ]
                  : []),
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "12px",
                      backgroundColor: item.bg,
                      color: item.color,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#d77c5b",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                        fontFamily: "Quicksand, sans-serif",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#ede1db",
                        fontFamily: "Quicksand, sans-serif",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* STATUT */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid #522414",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle size={16} style={{ color: "#4ade80" }} />
                <span
                  style={{
                    color: "#e19d84",
                    fontSize: "13px",
                    fontFamily: "Quicksand, sans-serif",
                  }}
                >
                  Statut:{" "}
                  <strong style={{ color: "#ede1db" }}>
                    {new Date(record.startDate) > new Date()
                      ? "À venir"
                      : "Terminé"}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export const EventShow = () => (
  <Show actions={false} component="div">
    <EventShowDetail />
  </Show>
);
