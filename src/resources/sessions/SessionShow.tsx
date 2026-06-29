// src/sessions/SessionShow.tsx
import { useShowContext, Show } from "react-admin";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowLeft,
  Edit,
  FileText,
  Sparkles,
} from "lucide-react";

const COLORS = {
  primary: "#d77c5b",
  primaryDark: "#cd5b32",
  primaryGlow: "rgba(215, 124, 91, 0.25)",
  background: "#0B0B14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: {
    primary: "#f5ded6",
    secondary: "#e19d84",
    muted: "#7b371e",
  },
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

const cardStyle = {
  backgroundColor: COLORS.card,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "1.25rem",
  padding: "24px",
};

const SessionShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) {
    return (
      <div style={{ padding: 24, backgroundColor: COLORS.background, minHeight: "100vh" }}>
        <div style={{ ...cardStyle, height: 60, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ ...cardStyle, height: 120, marginTop: 16, animation: "pulse 1.5s ease-in-out infinite 0.3s" }} />
        <div style={{ ...cardStyle, height: 200, marginTop: 16, animation: "pulse 1.5s ease-in-out infinite 0.6s" }} />
      </div>
    );
  }

  if (!record) {
    return (
      <div style={{ padding: 24, backgroundColor: COLORS.background, minHeight: "100vh" }}>
        <div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
          <Sparkles size={48} style={{ color: COLORS.primary, marginBottom: 16 }} />
          <h3 style={{ color: COLORS.text.primary }}>Session introuvable</h3>
          <Link to="/sessions" style={{ color: COLORS.primary, textDecoration: "none" }}>
            Retour aux sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Link to="/sessions" style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.text.secondary, textDecoration: "none" }}>
            <ArrowLeft size={16} /> Retour
          </Link>
          <Link to={`/sessions/${record.id}`} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 10,
            background: COLORS.primary, color: "#fff", textDecoration: "none",
          }}>
            <Edit size={15} /> Modifier
          </Link>
        </div>

        {/* Titre */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: COLORS.text.primary, margin: 0 }}>
            {record.title}
          </h1>
          <p style={{ color: COLORS.text.secondary, marginTop: 8 }}>{record.description}</p>
        </div>

        {/* Infos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <Calendar size={18} color={COLORS.primary} />
              <span style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase" }}>Date</span>
            </div>
            <span style={{ color: COLORS.text.primary }}>{formatDate(record.startTime)}</span>
          </div>

          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <Clock size={18} color={COLORS.primary} />
              <span style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase" }}>Horaire</span>
            </div>
            <span style={{ color: COLORS.text.primary }}>{formatTime(record.startTime)} — {formatTime(record.endTime)}</span>
          </div>

          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <MapPin size={18} color={COLORS.primary} />
              <span style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase" }}>Salle</span>
            </div>
            <span style={{ color: COLORS.text.primary }}>{record.room?.name || "Non définie"}</span>
          </div>

          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <Users size={18} color={COLORS.primary} />
              <span style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase" }}>Capacité</span>
            </div>
            <span style={{ color: COLORS.text.primary }}>{record.capacity || 0} places</span>
          </div>
        </div>

        {/* Intervenants */}
        {record.speakers && record.speakers.length > 0 && (
          <div style={{ ...cardStyle, marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <User size={18} color={COLORS.primary} />
              <span style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase" }}>Intervenants</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {record.speakers.map((s: any) => (
                <span key={s.id} style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  backgroundColor: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text.secondary,
                  fontSize: 13,
                }}>
                  {s.fullName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export const SessionShow = () => (
  <Show actions={false} component="div">
    <SessionShowDetail />
  </Show>
);