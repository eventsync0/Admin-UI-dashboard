import React from "react";
import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { User } from "lucide-react";

export const SpeakerEdit = () => (
  <Edit actions={false}>
    <SimpleForm
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "10px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--border)",
        },
        "& .MuiInputLabel-root": {
          color: "var(--txt-secondary)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--btn-primary)",
        },
      }}
    >
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 24,
      }}>
        <h2 style={{ display: "flex", gap: 10 }}>
          <User /> Modifier speaker
        </h2>

        <TextInput source="name" label="Nom" validate={required()} fullWidth />
        <TextInput source="jobTitle" label="Poste" fullWidth />
        <TextInput source="company" label="Entreprise" fullWidth />
        <TextInput source="bio" label="Biographie" multiline rows={4} fullWidth />
        <TextInput source="avatar" label="Image URL" fullWidth />
      </div>
    </SimpleForm>
  </Edit>
);