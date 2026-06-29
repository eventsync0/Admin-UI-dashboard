import {
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    EditButton,
    DeleteButton,
    SearchInput,
    ReferenceField,
} from 'react-admin';

const sessionFilters = [
    <SearchInput source="q" alwaysOn placeholder="Rechercher une session..." />
];

export const SessionList = () => (
    <List filters={sessionFilters} perPage={10}>
        <Datagrid rowClick="show">
            <TextField source="title" label="Titre" />
            <ReferenceField source="roomId" reference="rooms" label="Salle">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="startTime" label="Début" showTime locales="fr-FR" />
            <DateField source="endTime" label="Fin" showTime locales="fr-FR" />
            <NumberField source="capacity" label="Capacité" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);