import { Layout, AppBar, UserMenu } from "react-admin";
import { ReactNode } from "react";
import { Coffee, Settings, Bell } from "lucide-react";

const CustomAppBar = () => (
  <AppBar
    userMenu={<UserMenu />}
    style={{
      backgroundColor: "var(--coffee-800, #522414)",
      color: "var(--txt-on-dark)",
      boxShadow: "0 1px 0 rgba(0,0,0,0.15)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "0 8px",
      }}
    >
      {/* Logo et titre */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            padding: "8px",
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(4px)",
            display: "flex",
          }}
        >
          <Coffee size={20} color="var(--coffee-200, #ebbdad)" />
        </div>
        <div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "18px",
              letterSpacing: "-0.03em",
              color: "#fff",
              fontFamily: "Inter, Roboto, sans-serif",
            }}
          >
            EventSync
          </span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(235, 189, 173, 0.85)",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "2px 8px",
              borderRadius: "999px",
            }}
          >
            Admin
          </span>
        </div>
      </div>

      {/* Actions à droite */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {/* Notifications */}
        <button
          style={{
            padding: "8px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            position: "relative",
            color: "var(--coffee-200, #ebbdad)",
            transition: "background-color 0.2s",
          }}
          title="Notifications"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <Bell size={20} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
            }}
          />
        </button>

        {/* Settings */}
        <button
          style={{
            padding: "8px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "var(--coffee-200, #ebbdad)",
            transition: "background-color 0.2s",
          }}
          title="Paramètres"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  </AppBar>
);

export const CustomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout
      appBar={CustomAppBar}
      sx={{
        "& .RaLayout-content": {
          backgroundColor: "var(--background)",
          padding: "16px",
        },
        "& .MuiDrawer-root .MuiPaper-root": {
          backgroundColor: "var(--bg-card)",
          borderRight: "1px solid var(--border)",
        },
        "& .RaMenuItemLink-root": {
          borderRadius: "10px",
          margin: "2px 8px",
          color: "var(--txt-secondary)",
          fontFamily: "Inter, Roboto, sans-serif",
        },
        "& .RaMenuItemLink-active": {
          backgroundColor: "var(--btn-primary)",
          color: "#fff",
        },
        "& .RaMenuItemLink-root:hover": {
          backgroundColor: "var(--bg-subtle)",
          color: "var(--txt-title)",
        },
      }}
    >
      {/* Contenu principal avec carte */}
      <div
        style={{
          margin: "0",
          padding: "24px",
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "var(--background)",
          position: "relative",
        }}
      >
        {/* Decoration background */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            border: "4px solid rgba(205, 91, 50, 0.06)",
            transform: "translate(40%, -40%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          className="animate-spin-slow"
        />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "4px solid rgba(205, 91, 50, 0.06)",
            transform: "translate(-40%, 40%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          className="animate-spin-slower"
        />

        {/* Card wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "var(--bg-card)",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            padding: "24px",
            minHeight: "calc(100vh - 120px)",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
          }}
        >
          {children}
        </div>
      </div>
    </Layout>
  );
};
