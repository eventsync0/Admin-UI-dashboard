import { Show, useShowContext } from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

export const SpeakerShowDetail = () => {
  const { record, isLoading } = useShowContext();

  if (isLoading) return <p style={{ color: "#fff" }}>Loading...</p>;
  if (!record) return <p>Not found</p>;

  return (
    <div style={{ padding: 24, color: "#fff" }}>
      <Link to="/speakers" style={{ color: "#fff" }}>
        <ArrowLeft /> Retour
      </Link>

      <div style={{
        marginTop: 20,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 24,
      }}>
        <User size={40} />
        <h1>{record.name}</h1>
        <p>{record.jobTitle}</p>
        <p>{record.company}</p>

        <p style={{ marginTop: 20, opacity: 0.8 }}>
          {record.bio}
        </p>
      </div>
    </div>
  );
};

export const SpeakerShow = () => (
  <Show actions={false}>
    <SpeakerShowDetail />
  </Show>
);