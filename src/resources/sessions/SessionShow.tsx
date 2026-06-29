import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    DateField,
    ReferenceField,
    ArrayField,
    SingleFieldList,
    ChipField,
} from 'react-admin';

export const SessionShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" label="Titre" />
            <TextField source="description" label="Description" />
            <ReferenceField source="roomId" reference="rooms" label="Salle">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="startTime" label="Début" showTime locales="fr-FR" />
            <DateField source="endTime" label="Fin" showTime locales="fr-FR" />
            <NumberField source="capacity" label="Capacité" />
            <ArrayField source="speakers" label="Intervenants">
                <SingleFieldList>
                    <ChipField source="fullName" />
                </SingleFieldList>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);