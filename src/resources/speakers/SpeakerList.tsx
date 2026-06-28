import { List, useListContext } from "react-admin";
import { Link } from "react-router-dom";
import { User, Eye, Edit2 } from "lucide-react";

const COLORS = {
  bg: "#0B0B14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: {
    primary: "#fff",
    secondary: "rgba(255,255,255,0.7)",
  },
};

const SpeakerGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
    }}>
      {data?.map((s: any) => (
        <div
          key={s.id}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 20,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <User size={18} />
            <h3>{s.name}</h3>
          </div>

          <p style={{ opacity: 0.7 }}>{s.jobTitle}</p>
          <p style={{ fontSize: 12, opacity: 0.5 }}>{s.company}</p>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Link to={`/speakers/${s.id}/show`}><Eye size={16} /></Link>
            <Link to={`/speakers/${s.id}`}><Edit2 size={16} /></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SpeakerList = () => (
  <List actions={false}>
    <SpeakerGrid />
  </List>
);