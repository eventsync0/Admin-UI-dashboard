import {
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { Clock, FileText, Users } from "lucide-react";
import { COLORS, cardStyle } from "../../styles/SessionStyle";
import { SectionHeader } from "./SectionHeader";

export const SessionForm = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        gap: "24px",
        width: "100%",
        alignItems: "start",
      }}
    >
      {/* Informations générales */}
      <div style={cardStyle}>
        <SectionHeader
          icon={FileText}
          label="Informations générales"
          description="Titre, description et événement associé"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextInput
            source="title"
            label="Titre"
            validate={required()}
            fullWidth
            variant="outlined"
            placeholder="Ex : Workshop React"
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
            />
          </ReferenceArrayInput>
        </div>
      </div>

      {/* Salle / horaires */}
      <div style={cardStyle}>
        <SectionHeader
          icon={Clock}
          label="Lieu et horaires"
          description="Salle, capacité et horaires"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
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
          <span
            style={{
              fontSize: "12px",
              color: COLORS.text.muted,
            }}
          >
            La session doit démarrer entre 7h et 19h59 et finir avant 20h00.
          </span>
        </div>
      </div>
    </div>
  );
};