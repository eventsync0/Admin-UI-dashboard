import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
} from "react-admin";

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={4}
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
      />
      <DateTimeInput
        source="endDate"
        label="Date de fin"
        validate={required()}
      />
      <NumberInput source="maxAttendees" label="Capacité maximum" />
    </SimpleForm>
  </Create>
);
