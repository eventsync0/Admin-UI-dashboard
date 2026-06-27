import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { Login } from "./components/Login";
import { CustomLayout } from "./components/CustomLayout";
import {
  EventList,
  EventCreate,
  EventEdit,
  EventShow,
} from "./resources/events";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={Login}
      layout={CustomLayout}
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
