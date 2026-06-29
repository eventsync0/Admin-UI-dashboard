import React from "react";
import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const sectionCard = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
} as const;

const sectionHeader = (Icon: React.FC<any>, label: string) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      paddingBottom: "14px",
      marginBottom: "20px",
      borderBottom: "1px solid var(--border)",
    }}
  >
    <div
      style={{
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "rgba(205, 91, 50, 0.1)",
        color: "var(--btn-primary)",
        display: "flex",
      }}
    >
      <Icon size={16} />
    </div>
    <h3
      style={{
        fontSize: "16px",
        fontWeight: 700,
        color: "var(--txt-title)",
        margin: 0,
      }}
    >
      {label}
    </h3>
  </div>
);

export const RoomEdit = () => {
  return (
    <Edit component="div" actions={false}>
      <SimpleForm
        className="bg-transparent"
        sx={{
          p: 0,
          "& .MuiFormControl-root": { width: "100%" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "10px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--border)",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--btn-primary)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--btn-primary)",
            borderWidth: "2px",
          },
          "& .MuiInputBase-input": {
            color: "var(--txt-title)",
            fontFamily: "Inter, Roboto, sans-serif",
          },
          "& .MuiInputLabel-root": {
            color: "var(--txt-secondary)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--btn-primary)",
          },
          "& .MuiButton-containedPrimary": {
            backgroundColor: "var(--btn-primary)",
            color: "var(--btn-primary-txt)",
            borderRadius: "10px",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "var(--btn-primary-hover)",
            },
          },
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            paddingBottom: "20px",
            marginBottom: "10px",
            borderBottom: "1px solid var(--border)",
            width: "100%",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--txt-title)",
                margin: 0,
              }}
            >
              Modifier une salle
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--txt-secondary)",
                margin: 0,
              }}
            >
          Update the room name            </p>
          </div>

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
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--bg-subtle)",
            }}
          >
            <ArrowLeft size={16} />
            Retour
          </Link>
        </div>

        {/* FORM */}
        <div style={{ maxWidth: "480px", width: "100%" }}>
          <div style={{ ...sectionCard, display: "flex", flexDirection: "column", gap: "6px" }}>
            {sectionHeader(Home, "Informations de la salle")}

            <TextInput
              source="name"
              label="Nom de la salle"
              validate={required()}
              fullWidth
              variant="outlined"
            />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};