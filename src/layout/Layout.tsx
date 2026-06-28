import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";

import { CustomAppBar } from "./CustomAppBar";
import { CustomMenu } from "./CustomMenu";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={CustomAppBar}
    menu={CustomMenu}
    sx={{
      // fond global de l'app
      "& .RaLayout-appFrame": {
        background: "var(--background)",
      },

      // zone content (pages)
      "& .RaLayout-content": {
        background: "var(--background)",
        padding: "20px",
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);