import { List, useListContext } from "react-admin";
import { Link } from "react-router-dom";
import { Eye, Edit2 } from "lucide-react";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 20,
};

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: 16,
  color: "#fff",
  backdropFilter: "blur(10px)",
};

const Avatar = ({ url }: { url?: string }) => (
  <img
    src={url || "https://via.placeholder.com/80"}
    alt="avatar"
    style={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid rgba(255,255,255,0.2)",
    }}
  />
);

const SpeakerGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <p style={{ color: "#fff" }}>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p style={{ color: "#fff" }}>No speakers found</p>;
  }

  return (
    <div style={gridStyle}>
      {data.map((s: any) => (
        <div key={s.id} style={cardStyle}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar url={s.photoUrl} />
            <div>
              <h3 style={{ margin: 0 }}>{s.fullName}</h3>
              <p style={{ margin: 0, opacity: 0.6, fontSize: 12 }}>
                {s.bio ? s.bio.slice(0, 60) : "No bio"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Link to={`/speakers/${s.id}/show`} title="View">
              <Eye size={16} color="white" />
            </Link>

            <Link to={`/speakers/${s.id}`} title="Edit">
              <Edit2 size={16} color="white" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SpeakerList = () => (
  <List
    actions={false}
    perPage={12}
    sort={{ field: "fullName", order: "ASC" }}
  >
    <SpeakerGrid />
  </List>
);