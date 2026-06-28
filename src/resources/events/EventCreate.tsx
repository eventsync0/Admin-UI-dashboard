import React from "react";
import {
  Create,
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

// Style réutilisable pour les cartes en Glassmorphism
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

// En-tête de section avec l'icône
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
        boxShadow: "inset 0 0 10px rgba(205, 91, 50, 0.1)",
      }}
    >
      <Icon size={20} />
    </div>
    <h3
      style={{
        fontSize: "18px",
        fontWeight: 700,
        color: "#ffffff",
        margin: 0,
        letterSpacing: "-0.01em",
      }}
    >
      {label}
    </h3>
  </div>
);

export const EventCreate = () => (
  <div
    style={{
      position: "relative",
      minHeight: "100%",
      padding: "24px",
      // Si votre layout global n'est pas déjà sombre, ce fond assure que le glassmorphism ressorte
      backgroundColor: "#0f0c29",
      borderRadius: "24px",
      overflow: "hidden",
    }}
  >
    {/* Orbes lumineux décoratifs en arrière-plan (Style Login) */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
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
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#4a00e0",
          filter: "blur(150px)",
          opacity: 0.2,
        }}
      />
    </div>

    <Create
      component="div"
      actions={false}
      sx={{ "& .RaCreate-main": { marginTop: 0 } }}
    >
      <SimpleForm
        sx={{
          p: 0,
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 10,
          "& .MuiFormControl-root": { width: "100%" },

          /* Style global des inputs Mui (Text, Select, Date, etc.) */
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            color: "#ffffff",
            transition: "all 0.3s ease",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: "1px",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "rgba(205, 91, 50, 0.8)",
              borderWidth: "1px",
              boxShadow: "0 0 0 4px rgba(205, 91, 50, 0.2)",
            },

          /* Style des labels */
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: "Inter, Roboto, sans-serif",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#cd5b32",
          },
          "& .MuiSvgIcon-root": {
            color: "rgba(255, 255, 255, 0.5)",
          },

          /* Toolbar de soumission (Bouton Enregistrer) */
          "& .RaToolbar-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            padding: "16px 24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            marginTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
          },

          /* Bouton Principal (Save) reproduisant le bouton de login */
          "& .MuiButton-containedPrimary": {
            background: "linear-gradient(90deg, #cd5b32 0%, #d4704b 100%)",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            fontFamily: "Inter, Roboto, sans-serif",
            boxShadow: "0 4px 15px rgba(205, 91, 50, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(205, 91, 50, 0.6)",
              transform: "translateY(-1px)",
            },
          },
        }}
      >
        {/* En-tête de la page */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "24px",
            marginBottom: "24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Créer un événement
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.6)",
                margin: 0,
              }}
            >
              Saisissez les informations de base et configurez les sessions
              associées.
            </p>
          </div>

          <Link
            to="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.8)",
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(205, 91, 50, 0.5)";
              e.currentTarget.style.backgroundColor = "rgba(205, 91, 50, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.05)";
            }}
          >
            <ArrowLeft size={16} />
            Retour
          </Link>
        </div>

        {/* Grille du Formulaire */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "24px",
            width: "100%",
            alignItems: "start",
          }}
        >
          {/* Colonne Gauche: Informations Générales */}
          <div
            style={{ ...sectionCard, display: "flex", flexDirection: "column" }}
          >
            {sectionHeader(FileText, "Informations Générales")}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div style={{ gridColumn: "span 2" }}>
                <TextInput
                  source="title"
                  label="Titre de l'événement"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <TextInput
                  source="description"
                  label="Description détaillée"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <SelectInput
                  source="category"
                  label="Catégorie"
                  choices={[
                    { id: "CONFERENCE", name: "Conférence" },
                    { id: "WORKSHOP", name: "Atelier" },
                    { id: "SEMINAR", name: "Séminaire" },
                    { id: "MEETUP", name: "Meetup" },
                    { id: "WEBINAR", name: "Webinaire" },
                  ]}
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <TextInput
                  source="location"
                  label="Lieu (adresse ou en ligne)"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <DateTimeInput
                  source="startDate"
                  label="Début"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <DateTimeInput
                  source="endDate"
                  label="Fin"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
            </div>
          </div>

          {/* Colonne Droite: Sessions */}
          <div
            style={{ ...sectionCard, display: "flex", flexDirection: "column" }}
          >
            {sectionHeader(Layers, "Sessions de l'événement")}
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "20px",
              }}
            >
              Configurez les créneaux ou ateliers internes.
            </p>

            <ArrayInput source="sessions" label=" ">
              <SimpleFormIterator
                inline
                sx={{
                  width: "100%",
                  /* Style de chaque bloc session */
                  "& .RaSimpleFormIterator-form": {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    p: "20px",
                    mb: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  },
                  /* Bouton d'ajout d'une session */
                  "& .RaSimpleFormIterator-add button": {
                    backgroundColor: "rgba(205, 91, 50, 0.1)",
                    color: "#cd5b32",
                    borderRadius: "10px",
                    fontWeight: 600,
                    textTransform: "none",
                    border: "1px dashed rgba(205, 91, 50, 0.4)",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "rgba(205, 91, 50, 0.2)",
                    },
                  },
                  /* Bouton de suppression d'une session */
                  "& .RaSimpleFormIterator-remove button": {
                    color: "rgba(255, 255, 255, 0.4)",
                    "&:hover": {
                      color: "#ef4444",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                    },
                  },
                }}
              >
                <TextInput
                  source="title"
                  label="Titre de la session"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
                <TextInput
                  source="description"
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                  variant="outlined"
                />
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
                  />
                </ReferenceInput>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    width: "100%",
                  }}
                >
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
                <NumberInput
                  source="capacity"
                  label="Capacité (pers.)"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </div>
        </div>
      </SimpleForm>
    </Create>
  </div>
);
