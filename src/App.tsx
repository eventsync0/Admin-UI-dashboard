import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { Login } from "./components/Login";
import Dashboard from "./Dashboard";
import { Layout } from "./layout/Layout";
import { SessionList } from "./resources/sessions/SessionList";
import { SessionCreate } from "./resources/sessions/SessionCreate";

import {
  EventList,
  EventCreate,
  EventEdit,
  EventShow,
} from "./resources/events";

import {
  RoomList,
  RoomCreate,
  RoomEdit,
  RoomShow,
} from "./resources/rooms";

import {
  SpeakerList,
  SpeakerCreate,
  SpeakerEdit,
  SpeakerShow,
} from "./resources/speakers";

function App() {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      loginPage={Login}
      title="EventSync - Administration"
    >
      <Resource
        name="events"
        label="Événements"
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        show={EventShow}
        recordRepresentation="title"
      />

      <Resource 
                name="sessions"
                options={{ label: 'Sessions' }}
                list={SessionList}
                create={SessionCreate}
            />

      <Resource
        name="rooms"
        label="Salles"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        show={RoomShow}
        recordRepresentation="name"
      />

      <Resource
        name="speakers"
        label="Intervenants"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        show={SpeakerShow}
        recordRepresentation="name"
      />

    </Admin>
  );
}

export default App;
