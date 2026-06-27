import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Layers } from "lucide-react";

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

export const EventEdit = () => (
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
        "& .MuiInputBase-input": { color: "var(--txt-title)", fontFamily: "Inter, Roboto, sans-serif" },
        "& .MuiInputLabel-root": { color: "var(--txt-secondary)", fontFamily: "Inter, Roboto, sans-serif" },
        "& .MuiInputLabel-root.Mui-focused": { color: "var(--btn-primary)" },
        "& .RaToolbar-root": {
          backgroundColor: "transparent",
          padding: "16px 0 0",
          borderTop: "1px solid var(--border)",
          marginTop: "16px",
        },
        "& .MuiButton-containedPrimary": {
          backgroundColor: "var(--btn-primary)",
          color: "var(--btn-primary-txt)",
          borderRadius: "10px",
          fontWeight: 700,
          fontFamily: "Inter, Roboto, sans-serif",
          boxShadow: "0 2px 8px rgba(205, 91, 50, 0.25)",
          "&:hover": {
            backgroundColor: "var(--btn-primary-hover)",
          },
        },
      }}
    >
      {/* Form Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          paddingBottom: "20px",
          marginBottom: "4px",
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
              letterSpacing: "-0.03em",
              margin: "0 0 4px",
            }}
          >
            Modifier l'événement
          </h1>
          <p style={{ fontSize: "14px", color: "var(--txt-secondary)", margin: 0 }}>
            Mettez à jour les informations et gérez la liste des sessions.
          </p>
        </div>
        <Link
          to="/events"
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
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--txt-title)";
            e.currentTarget.style.borderColor = "var(--btn-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--txt-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <ArrowLeft size={16} />
          Retour aux événements
        </Link>
      </div>

      {/* Form Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "24px",
          width: "100%",
          alignItems: "start",
        }}
      >
        {/* Left: General Info */}
        <div style={{ ...sectionCard, display: "flex", flexDirection: "column", gap: "4px" }}>
          {sectionHeader(FileText, "Informations Générales")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "span 2" }}>
              <TextInput source="title" label="Titre de l'événement" validate={required()} fullWidth variant="outlined" />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <TextInput source="description" label="Description détaillée" multiline rows={4} fullWidth variant="outlined" />
            </div>
            <div>
              <SelectInput
                source="category"
                label="Catégorie"
                choices={[
                  { id: "CONFERENCE", name: "Conférence" },
                  { id: "WORKSHOP",   name: "Atelier" },
                  { id: "SEMINAR",    name: "Séminaire" },
                  { id: "MEETUP",     name: "Meetup" },
                  { id: "WEBINAR",    name: "Webinaire" },
                  { id: "SOCIAL",     name: "Social" },
                  { id: "FUNDRAISER", name: "Collecte de fonds" },
                  { id: "SPORTS",     name: "Sports" },
                  { id: "ARTS",       name: "Arts" },
                  { id: "TECHNOLOGY", name: "Technologie" },
                  { id: "BUSINESS",   name: "Affaires" },
                  { id: "EDUCATION",  name: "Éducation" },
                  { id: "OTHER",      name: "Autre" },
                ]}
                validate={required()}
                fullWidth
                variant="outlined"
              />
            </div>
            <div>
              <TextInput source="location" label="Lieu (adresse ou en ligne)" validate={required()} fullWidth variant="outlined" />
            </div>
            <div>
              <DateTimeInput source="startDate" label="Date & Heure de début" validate={required()} fullWidth variant="outlined" />
            </div>
            <div>
              <DateTimeInput source="endDate" label="Date & Heure de fin" validate={required()} fullWidth variant="outlined" />
            </div>
          </div>
        </div>

        {/* Right: Sessions */}
        <div style={{ ...sectionCard, display: "flex", flexDirection: "column", gap: "4px" }}>
          {sectionHeader(Layers, "Sessions de l'événement")}
          <p style={{ fontSize: "13px", color: "var(--txt-secondary)", marginBottom: "16px" }}>
            Configurez un ou plusieurs créneaux ou ateliers internes à cet événement.
          </p>

          <ArrayInput source="sessions" label="Liste des sessions">
            <SimpleFormIterator
              inline
              sx={{
                width: "100%",
                "& .RaSimpleFormIterator-form": {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  p: "16px",
                  mb: "12px",
                  backgroundColor: "var(--bg-subtle)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                },
                "& .RaSimpleFormIterator-add button": {
                  backgroundColor: "var(--btn-ghost-hover)",
                  color: "var(--btn-primary)",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontFamily: "Inter, Roboto, sans-serif",
                },
              }}
            >
              <TextInput source="title" label="Titre de la session" validate={required()} fullWidth variant="outlined" />
              <TextInput source="description" label="Description" multiline rows={2} fullWidth variant="outlined" />
              <ReferenceInput source="roomId" reference="rooms" label="Salle" fullWidth>
                <AutocompleteInput optionText="name" validate={required()} variant="outlined" />
              </ReferenceInput>
              <DateTimeInput source="startTime" label="Heure de début" validate={required()} fullWidth variant="outlined" />
              <DateTimeInput source="endTime" label="Heure de fin" validate={required()} fullWidth variant="outlined" />
              <NumberInput source="capacity" label="Capacité (pers.)" validate={required()} fullWidth variant="outlined" />
            </SimpleFormIterator>
          </ArrayInput>
        </div>
      </div>
    </SimpleForm>
  </Edit>
);
