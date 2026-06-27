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
} from "lucide-react";

const categoryMap: Record<string, { label: string; color: string; bg: string }> = {
  CONFERENCE: { label: "Conférence",    color: "#7c3aed", bg: "#f5f3ff" },
  WORKSHOP:   { label: "Atelier",       color: "#2563eb", bg: "#eff6ff" },
  SEMINAR:    { label: "Séminaire",     color: "#4338ca", bg: "#eef2ff" },
  MEETUP:     { label: "Meetup",        color: "#059669", bg: "#ecfdf5" },
  WEBINAR:    { label: "Webinaire",     color: "#0d9488", bg: "#f0fdfa" },
  SOCIAL:     { label: "Social",        color: "#db2777", bg: "#fdf2f8" },
  FUNDRAISER: { label: "Collecte",      color: "#e11d48", bg: "#fff1f2" },
  SPORTS:     { label: "Sports",        color: "#dc2626", bg: "#fef2f2" },
  ARTS:       { label: "Arts",          color: "#c026d3", bg: "#fdf4ff" },
  TECHNOLOGY: { label: "Technologie",   color: "#0891b2", bg: "#ecfeff" },
  BUSINESS:   { label: "Affaires",      color: "#d97706", bg: "#fffbeb" },
  EDUCATION:  { label: "Éducation",     color: "#65a30d", bg: "#f7fee7" },
  OTHER:      { label: "Autre",         color: "#6b7280", bg: "#f9fafb" },
};

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

const card = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
} as const;

const EventShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "pulse 1.5s ease-in-out infinite" }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              ...card,
              height: i === 1 ? "60px" : i === 2 ? "120px" : "200px",
              backgroundColor: "var(--bg-subtle)",
            }}
          />
        ))}
      </div>
    );
  }

  if (!record) {
    return (
      <div style={{ ...card, textAlign: "center", padding: "48px 24px" }}>
        <p style={{ color: "var(--txt-secondary)", marginBottom: "16px" }}>
          Événement introuvable.
        </p>
        <Link
          to="/events"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--btn-primary)",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />
          Retourner aux événements
        </Link>
      </div>
    );
  }

  const cat = categoryMap[record.category] || categoryMap.OTHER;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Navigation bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--border)",
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
            color: "var(--txt-secondary)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--txt-title)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--txt-secondary)")}
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
            backgroundColor: "var(--btn-primary)",
            color: "var(--btn-primary-txt)",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(205, 91, 50, 0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--btn-primary-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--btn-primary)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Edit size={15} />
          Modifier l'événement
        </Link>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          ...card,
          background: `linear-gradient(135deg, ${cat.bg} 0%, var(--bg-card) 60%)`,
          borderLeft: `4px solid ${cat.color}`,
          padding: "28px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
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
            }}
          >
            {cat.label}
          </span>
          <span style={{ fontSize: "12px", color: "var(--txt-disabled)", fontWeight: 500 }}>
            ID #{record.id}
          </span>
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--txt-title)",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {record.title}
        </h1>
      </div>

      {/* 2-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }}
      >
        {/* Left: description + sessions */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Description */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(205, 91, 50, 0.1)",
                    color: "var(--btn-primary)",
                    display: "flex",
                  }}
                >
                  <FileText size={16} />
                </div>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--txt-title)", margin: 0 }}>
                  Description
                </h2>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--txt-secondary)",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {record.description || "Aucune description fournie pour cet événement."}
              </p>
            </div>

            {/* Sessions */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(205, 91, 50, 0.1)",
                    color: "var(--btn-primary)",
                    display: "flex",
                  }}
                >
                  <Clock size={16} />
                </div>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--txt-title)", margin: 0 }}>
                  Sessions associées{" "}
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--txt-secondary)",
                      backgroundColor: "var(--bg-subtle)",
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
                    backgroundColor: "var(--bg-subtle)",
                    borderRadius: "12px",
                    border: "2px dashed var(--border)",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "var(--txt-secondary)", margin: 0 }}>
                    Aucune session n'est planifiée pour cet événement.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {record.sessions.map((session: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: "20px",
                        backgroundColor: "var(--bg-subtle)",
                        borderRadius: "14px",
                        border: "1px solid var(--border)",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--btn-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
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
                            color: "var(--txt-title)",
                            margin: 0,
                          }}
                        >
                          {session.title}
                        </h4>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "3px 8px",
                              borderRadius: "6px",
                              backgroundColor: "var(--bg-card)",
                              color: "var(--txt-secondary)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <Home size={11} />
                            Salle: {session.roomId || "Non spécifiée"}
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
                              backgroundColor: "rgba(205, 91, 50, 0.08)",
                              color: "var(--btn-primary)",
                              border: "1px solid rgba(205, 91, 50, 0.2)",
                            }}
                          >
                            <Users size={11} />
                            Capacité: {session.capacity}
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "var(--txt-secondary)",
                          marginBottom: "12px",
                          lineHeight: "1.55",
                        }}
                      >
                        {session.description || "Aucune description pour cette session."}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontSize: "12px",
                          color: "var(--txt-disabled)",
                          fontWeight: 600,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Calendar size={12} />
                          <span>{formatDate(session.startTime)}</span>
                        </div>
                        <span>—</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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

          {/* Right: Logistics */}
          <div style={card}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--txt-title)",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Logistique & Dates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  icon: <MapPin size={16} />,
                  bg: "rgba(220, 38, 38, 0.1)",
                  color: "#dc2626",
                  label: "Lieu",
                  value: record.location,
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
                        label: "Capacité maximum",
                        value: `${record.maxAttendees} participants`,
                      },
                    ]
                  : []),
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
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
                        color: "var(--txt-disabled)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--txt-title)",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventShow = () => (
  <Show actions={false} component="div">
    <EventShowDetail />
  </Show>
);
