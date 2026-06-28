import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";

import { CustomAppBar } from "./CustomAppBar";
import { CustomMenu } from "./CustomMenu";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={CustomAppBar}
    menu={CustomMenu}
    sx={{
      "& .RaLayout-appFrame": {
        background: "var(--background)",
      },
      "& .RaLayout-content": {
        background: "var(--background)",
        padding: "20px",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
      },
      // certaines versions de react-admin ajoutent un container interne
      "& .RaLayout-contentWithSidebar": {
        width: "100%",
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);