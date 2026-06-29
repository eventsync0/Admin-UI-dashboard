// src/layout/Layout.tsx
import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { styled } from "@mui/material/styles";

import { CustomAppBar } from "./CustomAppBar";
import { CustomMenu } from "./CustomMenu";

// === STYLES ===
const StyledLayout = styled(RALayout)(({ theme }) => ({
  // Fond global
  backgroundColor: "#0B0B14",

  "& .RaLayout-appFrame": {
    backgroundColor: "#0B0B14",
    minHeight: "100vh",
  },

  "& .RaLayout-body": {
    backgroundColor: "#0B0B14",
  },

  "& .RaLayout-content": {
    backgroundColor: "#0B0B14",
    padding: "24px",
    minHeight: "calc(100vh - 64px)",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  },

  "& .RaLayout-contentWithSidebar": {
    backgroundColor: "transparent",
    width: "100%",
  },
}));

// === LAYOUT ===
export const Layout = ({ children }: { children: ReactNode }) => (
  <StyledLayout appBar={CustomAppBar} menu={CustomMenu}>
    {children}
    <CheckForApplicationUpdate />
  </StyledLayout>
);
