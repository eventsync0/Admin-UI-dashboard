import { useShowContext, Show } from "react-admin";
import { Link } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  ArrowLeft,
  Edit,
  Layers,
} from "lucide-react";

// === TYPE MAP ===
const typeMap: Record<string, { label: string; color: string; bg: string }> = {
  MEETING: { label: "Meeting", color: "#2563eb", bg: "#eff6ff" },
  CONFERENCE: { label: "Conférence", color: "#7c3aed", bg: "#f5f3ff" },
  WORKSHOP: { label: "Atelier", color: "#059669", bg: "#ecfdf5" },
  OTHER: { label: "Autre", color: "#6b7280", bg: "#f9fafb" },
};

// === FORMAT ===
const card = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
} as const;

const RoomShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              ...card,
              height: i === 1 ? "80px" : "200px",
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
          Salle introuvable.
        </p>
        <Link
          to="/rooms"
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
          Retour aux salles
        </Link>
      </div>
    );
  }

  const t = typeMap[record.type] || typeMap.OTHER;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* NAV */}
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
          to="/rooms"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--txt-secondary)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />
          Retour aux salles
        </Link>

        <Link
          to={`/rooms/${record.id}`}
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
          }}
        >
          <Edit size={15} />
          Modifier
        </Link>
      </div>

      {/* HERO */}
      <div
        style={{
          ...card,
          background: `linear-gradient(135deg, ${t.bg} 0%, var(--bg-card) 60%)`,
          borderLeft: `4px solid ${t.color}`,
          padding: "28px 24px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: t.bg,
              color: t.color,
              border: `1px solid ${t.color}33`,
              textTransform: "uppercase",
            }}
          >
            {t.label}
          </span>
          <span style={{ fontSize: "12px", color: "var(--txt-disabled)" }}>
            ID #{record.id}
          </span>
        </div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--txt-title)",
            margin: 0,
          }}
        >
          {record.name}
        </h1>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* DESCRIPTION */}
          <div style={card}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              Description
            </h2>
            <p style={{ color: "var(--txt-secondary)", lineHeight: 1.6 }}>
              {record.description || "Aucune description disponible."}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={card}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "16px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "12px",
            }}
          >
            Informations
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* LOCATION */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ color: "#dc2626" }}>
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--txt-disabled)" }}>
                  Lieu
                </div>
                <div style={{ fontWeight: 600 }}>{record.location}</div>
              </div>
            </div>

            {/* CAPACITY */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ color: "#2563eb" }}>
                <Users size={16} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--txt-disabled)" }}>
                  Capacité
                </div>
                <div style={{ fontWeight: 600 }}>
                  {record.capacity} personnes
                </div>
              </div>
            </div>

            {/* TYPE */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ color: t.color }}>
                <Layers size={16} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--txt-disabled)" }}>
                  Type
                </div>
                <div style={{ fontWeight: 600 }}>{t.label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RoomShow = () => (
  <Show actions={false} component="div">
    <RoomShowDetail />
  </Show>
);