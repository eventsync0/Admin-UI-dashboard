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

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
      />
      <SelectInput
        source="category"
        label="Catégorie"
        choices={[
          { id: "CONFERENCE", name: "Conférence" },
          { id: "WORKSHOP", name: "Atelier" },
          { id: "SEMINAR", name: "Séminaire" },
          { id: "MEETUP", name: "Meetup" },
          { id: "WEBINAR", name: "Webinaire" },
          { id: "SOCIAL", name: "Social" },
          { id: "FUNDRAISER", name: "Collecte de fonds" },
          { id: "SPORTS", name: "Sports" },
          { id: "ARTS", name: "Arts" },
          { id: "TECHNOLOGY", name: "Technologie" },
          { id: "BUSINESS", name: "Affaires" },
          { id: "EDUCATION", name: "Éducation" },
          { id: "OTHER", name: "Autre" },
        ]}
        validate={required()}
        fullWidth
      />
      <TextInput
        source="location"
        label="Lieu"
        validate={required()}
        fullWidth
      />
      <DateTimeInput
        source="startDate"
        label="Date de début"
        validate={required()}
        fullWidth
      />
      <DateTimeInput
        source="endDate"
        label="Date de fin"
        validate={required()}
        fullWidth
      />

      <ArrayInput source="sessions" label="Sessions">
        <SimpleFormIterator>
          <TextInput
            source="title"
            label="Titre de la session"
            validate={required()}
            fullWidth
          />
          <TextInput
            source="description"
            label="Description"
            multiline
            rows={2}
            fullWidth
          />
          <ReferenceInput
            source="roomId"
            reference="rooms"
            label="Salle"
            fullWidth
          >
            <AutocompleteInput optionText="name" validate={required()} />
          </ReferenceInput>
          <DateTimeInput
            source="startTime"
            label="Heure de début"
            validate={required()}
            fullWidth
          />
          <DateTimeInput
            source="endTime"
            label="Heure de fin"
            validate={required()}
            fullWidth
          />
          <NumberInput
            source="capacity"
            label="Capacité"
            validate={required()}
            fullWidth
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
