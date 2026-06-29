import React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const sectionCard = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  color: "#ffffff",
  position: "relative",
  zIndex: 10,
} as const;

const sectionHeader = (Icon: React.FC<any>, label: string) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      paddingBottom: "16px",
      marginBottom: "24px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    }}
  >
    <div
      style={{
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: "rgba(205, 91, 50, 0.15)",
        border: "1px solid rgba(205, 91, 50, 0.3)",
        color: "#cd5b32",
        display: "flex",
      }}
    >
      <Icon size={20} />
    </div>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{label}</h3>
  </div>
);

export const RoomCreate = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100%",
        padding: "24px",
        backgroundColor: "#0f0c29",
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      {/* background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#cd5b32",
            filter: "blur(120px)",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#4a00e0",
            filter: "blur(140px)",
            opacity: 0.2,
          }}
        />
      </div>

      <Create actions={false}>
        <SimpleForm
          sx={{
            p: 0,
            backgroundColor: "transparent",
            position: "relative",
            zIndex: 10,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "12px",
              color: "#fff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.6)",
            },
            "& .MuiButton-containedPrimary": {
              background: "linear-gradient(90deg, #cd5b32 0%, #d4704b 100%)",
              borderRadius: "12px",
            },
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
              width: "100%",
            }}
          >
            <div>
              <h1 style={{ color: "#fff", fontSize: "28px", margin: 0 }}>
                Créer une salle
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>
                Ajoutez une nouvelle salle au système
              </p>
            </div>

            <Link
              to="/rooms"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ArrowLeft size={16} />
              Retour
            </Link>
          </div>

          {/* FORM */}
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <div style={sectionCard}>
              {sectionHeader(Home, "Informations de la salle")}

              <TextInput
                source="name"
                label="Nom de la salle"
                validate={required()}
                fullWidth
              />
            </div>
          </div>
        </SimpleForm>
      </Create>
    </div>
  );
};