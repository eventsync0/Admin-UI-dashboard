import { Show, useShowContext } from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const SpeakerShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) return <p>Loading...</p>;
  if (!record) return <p>Not found</p>;

  return (
    <div style={{ padding: 24, color: "#fff" }}>
      <Link to="/speakers" style={{ color: "#fff" }}>
        <ArrowLeft /> Retour
      </Link>

      <div style={{
        marginTop: 20,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 20,
        padding: 24,
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <img
          src={record.photoUrl}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <h1>{record.fullName}</h1>
        <p style={{ opacity: 0.7 }}>{record.bio}</p>

        <h3>Liens</h3>
        {record.links?.map((l: any, i: number) => (
          <p key={i}>
            🔗 <strong>{l.platform}</strong> — {l.url}
          </p>
        ))}
      </div>
    </div>
  );
};

export const SpeakerShow = () => (
  <Show actions={false}>
    <SpeakerShowDetail />
  </Show>
);