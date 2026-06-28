import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { Login } from "./components/Login";
import Dashboard from "./Dashboard";
import { Layout } from "./layout/Layout";

import {
  EventList,
  EventCreate,
  EventEdit,
  EventShow,
} from "./resources/events";

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
    </Admin>
  );
}

export default App;
