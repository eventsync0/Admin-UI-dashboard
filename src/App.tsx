import { Admin } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { HarentsoaRooms } from "./rooms"; 

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    {HarentsoaRooms}
  </Admin>
);