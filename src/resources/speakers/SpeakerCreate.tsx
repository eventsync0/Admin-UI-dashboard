import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
import { User, FileText } from "lucide-react";

const sectionCard = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "32px",
  color: "#fff",
} as const;

const sectionHeader = (Icon: React.FC<any>, label: string) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
    <div style={{ padding: 10, borderRadius: 10, background: "rgba(205,91,50,0.15)", color: "#cd5b32" }}>
      <Icon size={18} />
    </div>
    <h3 style={{ margin: 0, fontSize: 18 }}>{label}</h3>
  </div>
);

export const SpeakerCreate = () => (
  <div style={{ minHeight: "100vh", padding: 24, background: "#0f0c29" }}>
    <Create actions={false}>
      <SimpleForm
        sx={{
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
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#cd5b32",
          },
        }}
      >
        <div style={sectionCard}>
          {sectionHeader(User, "Informations Speaker")}

          <TextInput
            source="name"
            label="Nom complet"
            validate={required()}
            fullWidth
          />

          <TextInput
            source="jobTitle"
            label="Poste"
            fullWidth
          />

          <TextInput
            source="company"
            label="Entreprise"
            fullWidth
          />

          <TextInput
            source="bio"
            label="Biographie"
            multiline
            rows={4}
            fullWidth
          />

          <TextInput
            source="avatar"
            label="Image (URL)"
            fullWidth
          />
        </div>
      </SimpleForm>
    </Create>
  </div>
);