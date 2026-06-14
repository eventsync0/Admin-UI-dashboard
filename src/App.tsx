import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { Login } from "./components/Login";
import { CustomLayout } from "./components/CustomLayout";
import { ListGuesser, EditGuesser, ShowGuesser } from "react-admin";

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
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
}

export default App;
