import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";
import { User } from "lucide-react";

export const SpeakerCreate = () => (
  <Create redirect="list">
    <SimpleForm
      sx={{
        "& .MuiInputBase-input": { color: "#fff" },
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#fff", display: "flex", gap: 8 }}>
          <User size={20} />
          Create Speaker
        </h2>

        <TextInput
          source="fullName"
          label="Nom complet"
          validate={required()}
          fullWidth
        />

        <TextInput source="jobTitle" label="Poste" fullWidth />

        <TextInput source="company" label="Entreprise" fullWidth />

        <TextInput source="photoUrl" label="Photo URL" fullWidth />

        <TextInput
          source="bio"
          label="Biographie"
          multiline
          rows={4}
          fullWidth
        />
      </div>

      {/* LINKS */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h3 style={{ color: "#fff", marginBottom: 16 }}>
          Liens externes
        </h3>

        <ArrayInput source="links">
          <SimpleFormIterator>
            <TextInput source="platform" label="Plateforme" />
            <TextInput source="url" label="URL" />
          </SimpleFormIterator>
        </ArrayInput>
      </div>
    </SimpleForm>
  </Create>
);