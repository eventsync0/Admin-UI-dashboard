// pages/events/EventShow.tsx
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
    CONFERENCE: { label: "Conference", color: "#7c3aed", bg: "#f5f3ff" },
    WORKSHOP: { label: "Workshop", color: "#2563eb", bg: "#eff6ff" },
    SEMINAR: { label: "Seminar", color: "#4338ca", bg: "#eef2ff" },
    MEETUP: { label: "Meetup", color: "#059669", bg: "#ecfdf5" },
    WEBINAR: { label: "Webinar", color: "#0d9488", bg: "#f0fdfa" },
    SOCIAL: { label: "Social", color: "#db2777", bg: "#fdf2f8" },
    FUNDRAISER: { label: "Fundraiser", color: "#e11d48", bg: "#fff1f2" },
    SPORTS: { label: "Sports", color: "#dc2626", bg: "#fef2f2" },
    ARTS: { label: "Arts", color: "#c026d3", bg: "#fdf4ff" },
    TECHNOLOGY: { label: "Technology", color: "#0891b2", bg: "#ecfeff" },
    BUSINESS: { label: "Business", color: "#d97706", bg: "#fffbeb" },
    EDUCATION: { label: "Education", color: "#65a30d", bg: "#f7fee7" },
    OTHER: { label: "Other", color: "#6b7280", bg: "#f9fafb" },
  };

// === ORANGE COLORS ===
const COLORS = {
  primary: "#ea580c",
  primaryDark: "#d94a00",
  primaryGlow: "rgba(234, 88, 12, 0.25)",
  background: "#0B0B14",
  darkCard: "rgba(255, 255, 255, 0.03)",
  darkBorder: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",
};

// === FORMAT DATE ===
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
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
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// === STYLES ===
const cardStyle = {
  backgroundColor: COLORS.darkCard,
  border: `1px solid ${COLORS.darkBorder}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
};

// === MAIN COMPONENT ===
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
          backgroundColor: COLORS.background,
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
          backgroundColor: COLORS.background,
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* GLOW EFFECT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
              filter: "blur(80px)",
            }}
          />
        </div>

        <div
          style={{
            ...cardStyle,
            textAlign: "center",
            padding: "48px 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Info size={48} style={{ color: COLORS.primary, marginBottom: "16px" }} />
          <h3
            style={{
              color: COLORS.text.primary,
              marginBottom: "8px",
            }}
          >
            Event Not Found
          </h3>
          <p
            style={{
              color: COLORS.text.secondary,
              marginBottom: "16px",
            }}
          >
            The event you are looking for does not exist or has been deleted.
          </p>
          <Link
            to="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
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
            Back to Events
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
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* GLOW EFFECT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            paddingBottom: "16px",
            borderBottom: `1px solid ${COLORS.darkBorder}`,
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
              color: COLORS.text.secondary,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COLORS.text.primary;
              e.currentTarget.style.transform = "translateX(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = COLORS.text.secondary;
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
          <Link
            to={`/events/${record.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: `0 2px 12px ${COLORS.primary}40`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.primary}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 2px 12px ${COLORS.primary}40`;
            }}
          >
            <Edit size={15} />
            Edit Event
          </Link>
        </div>

        {/* HERO BANNER */}
        <div
          style={{
            ...cardStyle,
            backgroundColor: COLORS.darkCard,
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
              }}
            >
              {cat.label}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: COLORS.primary,
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
              color: COLORS.text.primary,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {record.title}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: COLORS.text.secondary,
              marginTop: "8px",
            }}
          >
            {record.location}
          </p>
        </div>

        {/* MAIN CONTENT - 2 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* LEFT COLUMN */}
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
                    backgroundColor: `${COLORS.primary}20`,
                    color: COLORS.primary,
                    display: "flex",
                  }}
                >
                  <FileText size={16} />
                </div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: COLORS.text.primary,
                    margin: 0,
                  }}
                >
                  Description
                </h2>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: COLORS.text.secondary,
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {record.description || "No description provided for this event."}
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
                    backgroundColor: `${COLORS.primary}20`,
                    color: COLORS.primary,
                    display: "flex",
                  }}
                >
                  <Clock size={16} />
                </div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: COLORS.text.primary,
                    margin: 0,
                  }}
                >
                  Sessions
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: COLORS.text.secondary,
                      backgroundColor: COLORS.darkBorder,
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
                    backgroundColor: COLORS.darkBorder,
                    borderRadius: "12px",
                    border: `2px dashed ${COLORS.darkBorder}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: COLORS.text.secondary,
                      margin: 0,
                    }}
                  >
                    No sessions planned for this event.
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
                        backgroundColor: COLORS.darkBorder,
                        borderRadius: "14px",
                        border: `1px solid ${COLORS.darkBorder}`,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = COLORS.primary;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = COLORS.darkBorder;
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
                            color: COLORS.text.primary,
                            margin: 0,
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
                              backgroundColor: COLORS.darkCard,
                              color: COLORS.text.secondary,
                              border: `1px solid ${COLORS.darkBorder}`,
                            }}
                          >
                            <Home size={11} />
                            Room: {session.roomId || "N/A"}
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
                              backgroundColor: `${COLORS.primary}20`,
                              color: COLORS.primary,
                              border: `1px solid ${COLORS.primary}30`,
                            }}
                          >
                            <Users size={11} />
                            Capacity: {session.capacity || "N/A"}
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: COLORS.text.secondary,
                          marginBottom: "12px",
                          lineHeight: "1.55",
                        }}
                      >
                        {session.description || "No description for this session."}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontSize: "12px",
                          color: COLORS.primary,
                          fontWeight: 500,
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

          {/* RIGHT COLUMN - Logistics */}
          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: COLORS.text.primary,
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: `1px solid ${COLORS.darkBorder}`,
              }}
            >
              Logistics & Dates
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  icon: <MapPin size={16} />,
                  bg: "rgba(220, 38, 38, 0.1)",
                  color: "#dc2626",
                  label: "Location",
                  value: record.location || "Not specified",
                },
                {
                  icon: <Calendar size={16} />,
                  bg: "rgba(37, 99, 235, 0.1)",
                  color: "#2563eb",
                  label: "Start Date",
                  value: formatDate(record.startDate),
                },
                {
                  icon: <Calendar size={16} />,
                  bg: "rgba(5, 150, 105, 0.1)",
                  color: "#059669",
                  label: "End Date",
                  value: formatDate(record.endDate),
                },
                ...(record.maxAttendees !== undefined
                  ? [
                      {
                        icon: <Users size={16} />,
                        bg: "rgba(124, 58, 237, 0.1)",
                        color: "#7c3aed",
                        label: "Max Capacity",
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
                        color: COLORS.primary,
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
                        color: COLORS.text.primary,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* STATUS */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: `1px solid ${COLORS.darkBorder}`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle size={16} style={{ color: COLORS.success }} />
                <span
                  style={{
                    color: COLORS.text.secondary,
                    fontSize: "13px",
                  }}
                >
                  Status:{" "}
                  <strong style={{ color: COLORS.text.primary }}>
                    {new Date(record.startDate) > new Date()
                      ? "Upcoming"
                      : "Completed"}
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