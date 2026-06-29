import {
    Create,
    SimpleForm,
    TextInput,
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    ReferenceArrayInput,
    SelectArrayInput,
} from 'react-admin';

export const SessionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" label="Titre" required />
            <TextInput source="description" label="Description" multiline rows={4} />
            <ReferenceInput source="roomId" reference="rooms" label="Salle">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput source="startTime" label="Début" />
            <DateTimeInput source="endTime" label="Fin" />
            <NumberInput source="capacity" label="Capacité" />
            <ReferenceArrayInput source="speakerIds" reference="speakers" label="Intervenants">
                <SelectArrayInput optionText="fullName" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);