import { Admin } from "react-admin";
import { authProvider } from "./providers/authProvider";
import { Login } from "./components/Login";

function App() {
  return (
    <Admin
      authProvider={authProvider}
      loginPage={Login}
      title="EventSync - Administration"
    ></Admin>
  );
}

export default App;
