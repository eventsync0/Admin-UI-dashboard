import {
  Resource,
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

const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nom de la salle" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);

const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Edit>
);

export const HarentsoaRoomsResource = (
  <Resource 
    name="rooms" 
    list={RoomList} 
    create={RoomCreate} 
    edit={RoomEdit} 
    options={{ label: 'Salles & Horaires' }}
  />
);