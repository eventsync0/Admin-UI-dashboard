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
      {/* General Information */}
      <div style={cardStyle}>
        <SectionHeader
          icon={FileText}
          label="General Information"
          description="Title, description and associated event"
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
            label="Title"
            validate={required()}
            fullWidth
            variant="outlined"
            placeholder="Ex: React Workshop"
          />

          <TextInput
            source="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Describe the session..."
          />

          <ReferenceInput
            source="eventId"
            reference="events"
            label="Event"
            fullWidth
          >
            <AutocompleteInput
              optionText="title"
              validate={required()}
              variant="outlined"
              label="Choose an event"
            />
          </ReferenceInput>

          <ReferenceArrayInput
            source="speakerIds"
            reference="speakers"
            label="Speakers"
            fullWidth
          >
            <SelectArrayInput
              optionText="fullName"
              validate={required()}
            />
          </ReferenceArrayInput>
        </div>
      </div>

      {/* Room / Schedule */}
      <div style={cardStyle}>
        <SectionHeader
          icon={Clock}
          label="Venue & Schedule"
          description="Room, capacity and time slots"
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
            label="Room"
            fullWidth
          >
            <AutocompleteInput
              optionText="name"
              validate={required()}
              variant="outlined"
              label="Choose a room"
            />
          </ReferenceInput>

          <NumberInput
            source="capacity"
            label="Capacity"
            validate={required()}
            fullWidth
            variant="outlined"
            placeholder="Number of seats"
          />

          <DateTimeInput
            source="startTime"
            label="Start"
            validate={required()}
            fullWidth
            variant="outlined"
          />

          <DateTimeInput
            source="endTime"
            label="End"
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
            The session must start between 7:00 and 19:59 and end before 20:00.
          </span>
        </div>
      </div>
    </div>
  );
};