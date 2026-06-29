import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { User, Link as LinkIcon, FileText } from "lucide-react";

const sectionCard = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "20px",
  color: "#fff",
};

export const SpeakerCreate = () => (
  <Create actions={false}>
    <SimpleForm
      sx={{
        "& .MuiInputBase-input": { color: "#fff" },
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
      }}
    >
      <div style={sectionCard}>
        <h3><User size={18} /> Informations générales</h3>

        <TextInput
          source="fullName"
          label="Nom complet"
          validate={required()}
          fullWidth
        />

        <TextInput
          source="photoUrl"
          label="Photo URL"
          fullWidth
        />

        <TextInput
          source="bio"
          label="Biographie"
          multiline
          rows={4}
          fullWidth
        />
      </div>

      <div style={sectionCard}>
        <h3><LinkIcon size={18} /> Liens externes</h3>

        <ArrayInput source="speakerLinks">
          <SimpleFormIterator>
            <TextInput source="platform" label="Plateforme (LinkedIn, GitHub...)" />
            <TextInput source="url" label="URL" />
          </SimpleFormIterator>
        </ArrayInput>
      </div>
    </SimpleForm>
  </Create>
);