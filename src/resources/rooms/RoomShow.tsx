import { useShowContext, Show } from "react-admin";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Edit } from "lucide-react";

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
              height: i === 1 ? "80px" : "120px",
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
          borderLeft: "4px solid var(--btn-primary)",
          padding: "28px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            backgroundColor: "rgba(205, 91, 50, 0.1)",
            color: "var(--btn-primary)",
            display: "flex",
          }}
        >
          <Home size={28} />
        </div>

        <div>
          <div
            style={{
              fontSize: "11px",
              color: "var(--txt-disabled)",
              marginBottom: "4px",
            }}
          >
            ID #{record.id}
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
      </div>
    </div>
  );
};

export const RoomShow = () => (
  <Show actions={false} component="div">
    <RoomShowDetail />
  </Show>
);