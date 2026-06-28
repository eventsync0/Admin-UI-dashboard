import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  EditButton,
  DeleteButton,
  required
} from "react-admin";

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nom de la salle" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Edit>
);