import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, required } from "react-admin";
import { User } from "lucide-react";

export const SpeakerEdit = () => (
  <Edit actions={false}
  mutationMode="pessimistic"
  redirect={false}>
    <SimpleForm
      sx={{
        "& .MuiInputBase-input": { color: "#fff" },
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
      }}
    >
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 24,
      }}>
        <h2><User /> Modifier Speaker</h2>

        <TextInput source="fullName" label="Nom complet" validate={required()} fullWidth />
        <TextInput source="photoUrl" label="Photo URL" fullWidth />
        <TextInput source="bio" label="Biographie" multiline rows={4} fullWidth />
      </div>

      <div style={{
        marginTop: 20,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 20,
        padding: 24,
      }}>
        <h3>Liens externes</h3>

        <ArrayInput source="links">
          <SimpleFormIterator>
            <TextInput source="platform" label="Plateforme" />
            <TextInput source="url" label="URL" />
          </SimpleFormIterator>
        </ArrayInput>
      </div>
    </SimpleForm>
  </Edit>
);