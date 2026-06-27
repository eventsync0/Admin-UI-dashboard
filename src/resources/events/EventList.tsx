import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  Filter,
  SearchInput,
  SelectInput,
} from "react-admin";

const EventFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput
      source="q"
      placeholder="Rechercher par titre ou description"
      alwaysOn
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
    />
  </Filter>
);

export const EventList = () => (
  <List filters={<EventFilter />}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Titre" />
      <TextField source="category" label="Catégorie" />
      <TextField source="location" label="Lieu" />
      <DateField source="startDate" label="Date de début" showTime />
      <DateField source="endDate" label="Date de fin" showTime />
      <NumberField source="sessions.length" label="Nombre de sessions" />
    </Datagrid>
  </List>
);
