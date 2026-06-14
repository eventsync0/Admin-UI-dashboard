import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  Filter,
  TextInput,
  DateInput,
} from "react-admin";

const EventFilters = () => (
  <Filter>
    <TextInput source="title" label="Titre" alwaysOn />
    <TextInput source="location" label="Lieu" />
    <DateInput source="startDate" label="Date début" />
    <DateInput source="endDate" label="Date fin" />
  </Filter>
);

export const EventList = () => (
  <List filters={<EventFilters />} sort={{ field: "startDate", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Titre" />
      <TextField source="location" label="Lieu" />
      <DateField source="startDate" label="Date début" showTime />
      <DateField source="endDate" label="Date fin" showTime />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
