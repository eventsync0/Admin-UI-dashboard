import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Clock, Users } from "lucide-react";

const COLORS = {
  primary: "#ea580c",
  primaryDark: "#d94a00",
  background: "#0B0B14",
  darkCard: "rgba(255, 255, 255, 0.03)",
  darkBorder: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
};

const cardStyle = {
  backgroundColor: COLORS.darkCard,
  border: `1px solid ${COLORS.darkBorder}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const SectionHeader = ({
  icon: Icon,
  label,
  description,
}: {
  icon: React.FC<any>;
  label: string;
  description?: string;
}) => (
  <div style={{ marginBottom: "24px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        paddingBottom: "16px",
        borderBottom: `1px solid ${COLORS.darkBorder}`,
      }}
    >
      <div
        style={{
          padding: "8px",
          borderRadius: "10px",
          backgroundColor: `${COLORS.primary}20`,
          color: COLORS.primary,
          display: "flex",
        }}
      >
        <Icon size={18} />
      </div>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: COLORS.text.primary,
          margin: 0,
        }}
      >
        {label}
      </h3>
    </div>
    {description && (
      <p
        style={{
          fontSize: "13px",
          color: COLORS.text.secondary,
          margin: "10px 0 0 42px",
        }}
      >
        {description}
      </p>
    )}
  </div>
);

export const SessionCreate = () => (
  <div
    style={{
      minHeight: "100vh",
      padding: "24px",
      backgroundColor: COLORS.background,
    }}
  >
    <Create
      component="div"
      actions={false}
      sx={{ "& .RaCreate-main": { marginTop: 0 } }}
    >
      <SimpleForm
        sx={{
          p: 0,
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "transparent",
          "& .MuiFormControl-root": { width: "100%" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "10px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: COLORS.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: COLORS.primary,
              borderWidth: "2px",
              boxShadow: `0 0 0 4px ${COLORS.primary}25`,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.darkBorder,
            borderWidth: "1.5px",
          },
          "& .MuiInputBase-input": {
            color: COLORS.text.primary,
            fontSize: "14px",
            padding: "12px 14px",
          },
          "& .MuiInputLabel-root": {
            color: COLORS.text.secondary,
            fontSize: "13px",
            "&.Mui-focused": { color: COLORS.primary },
          },
          "& .MuiSelect-select": {
            color: COLORS.text.primary,
            padding: "12px 14px",
          },
          "& .MuiSelect-icon": { color: COLORS.primary },
          "& .MuiAutocomplete-root .MuiOutlinedInput-root": { padding: 0 },
          "& .MuiAutocomplete-root .MuiInputBase-input": {
            padding: "12px 14px",
          },
          "& .RaToolbar-root": {
            backgroundColor: "transparent",
            padding: "24px 0 0",
            borderTop: `1px solid ${COLORS.darkBorder}`,
            marginTop: "8px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          },
          "& .MuiButton-containedPrimary": {
            backgroundColor: COLORS.primary,
            color: "#fff",
            borderRadius: "10px",
            fontWeight: 600,
            padding: "10px 28px",
            textTransform: "none",
            "&:hover": { backgroundColor: COLORS.primaryDark },
          },
          "& .MuiButton-text": {
            color: COLORS.text.secondary,
            padding: "10px 20px",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": {
              color: COLORS.text.primary,
              backgroundColor: `${COLORS.darkBorder}40`,
            },
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "20px",
            marginBottom: "24px",
            borderBottom: `1px solid ${COLORS.darkBorder}`,
            width: "100%",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Sparkles size={24} color={COLORS.primary} />
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: COLORS.text.primary,
                  margin: 0,
                }}
              >
                Nouvelle session
              </h1>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: COLORS.text.secondary,
                margin: "4px 0 0 34px",
              }}
            >
              Remplissez les champs ci-dessous
            </p>
          </div>
          <Link
            to="/sessions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: COLORS.text.secondary,
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "10px",
              border: `1.5px solid ${COLORS.darkBorder}`,
            }}
          >
            <ArrowLeft size={16} />
            Retour aux sessions
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: "24px",
            width: "100%",
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <SectionHeader
              icon={FileText}
              label="Informations générales"
              description="Titre, description et événement associé"
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <TextInput
                source="title"
                label="Titre"
                validate={required()}
                fullWidth
                variant="outlined"
                placeholder="Ex: Workshop React"
              />
              <TextInput
                source="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Décrivez la session..."
              />
              <ReferenceInput
                source="eventId"
                reference="events"
                label="Événement"
                fullWidth
              >
                <AutocompleteInput
                  optionText="title"
                  validate={required()}
                  variant="outlined"
                  label="Choisir un événement"
                />
              </ReferenceInput>
              <ReferenceArrayInput
                source="speakerIds"
                reference="speakers"
                label="Intervenants"
                fullWidth
              >
                <SelectArrayInput
                  optionText="fullName"
                  validate={required()}
                  variant="outlined"
                />
              </ReferenceArrayInput>
            </div>
          </div>

          <div style={cardStyle}>
            <SectionHeader
              icon={Clock}
              label="Lieu et horaires"
              description="Salle, capacité et horaires"
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <ReferenceInput
                source="roomId"
                reference="rooms"
                label="Salle"
                fullWidth
              >
                <AutocompleteInput
                  optionText="name"
                  validate={required()}
                  variant="outlined"
                  label="Choisir une salle"
                />
              </ReferenceInput>
              <NumberInput
                source="capacity"
                label="Capacité"
                validate={required()}
                fullWidth
                variant="outlined"
                placeholder="Nombre de places"
              />
              <DateTimeInput
                source="startTime"
                label="Début"
                validate={required()}
                fullWidth
                variant="outlined"
              />
              <DateTimeInput
                source="endTime"
                label="Fin"
                validate={required()}
                fullWidth
                variant="outlined"
              />
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: `1px solid ${COLORS.darkBorder}`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Users size={14} color={COLORS.primary} />
              <span style={{ fontSize: "12px", color: COLORS.text.muted }}>
                La session doit démarrer entre 7h et 19h59, et finir avant 20h00
              </span>
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  </div>
);
