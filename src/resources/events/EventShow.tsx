import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
} from "react-admin";

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="location" label="Lieu" />
      <DateField source="startDate" label="Date début" showTime />
      <DateField source="endDate" label="Date fin" showTime />
      <NumberField source="maxAttendees" label="Capacité maximum" />
    </SimpleShowLayout>
  </Show>
);
