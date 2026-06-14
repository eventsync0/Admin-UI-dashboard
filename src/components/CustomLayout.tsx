import { Layout, AppBar } from "react-admin";
import { ReactNode } from "react";

const CustomAppBar = () => (
  <AppBar
    style={{
      backgroundColor: "var(--coffee-800)",
      color: "var(--txt-on-dark)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>📅</span>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          EventSync Administration
        </span>
      </div>
    </div>
  </AppBar>
);

export const CustomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
      }}
    >
      <Layout appBar={CustomAppBar}>
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            color: "var(--txt-body)",
            borderRadius: "12px",
            margin: "1rem",
            padding: "1rem",
            minHeight: "calc(100vh - 120px)",
            border: `1px solid var(--border)`,
            transition: "all 0.3s ease",
          }}
        >
          {children}
        </div>
      </Layout>
    </div>
  );
};
