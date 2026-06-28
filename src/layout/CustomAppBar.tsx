import { AppBar } from "react-admin";

export const CustomAppBar = (props: any) => (
  <AppBar
    {...props}
    sx={{
      background: "var(--background)",
      borderBottom: "1px solid var(--border)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",

      "& .MuiToolbar-root": {
        minHeight: "64px",
        paddingLeft: "20px",
        paddingRight: "20px",
      },

      "& .RaAppBar-title": {
        display: "flex",
        alignItems: "center",
        gap: "16px",
      },
    }}
  >
    <div className="flex items-center gap-3 w-full">

      {/* titre */}
      <div className="text-[16px] font-semibold tracking-[0.05em] bg-gradient-to-r from-[var(--coffee-50)] to-[var(--coffee-400)] text-transparent bg-clip-text">
        EventSync Admin
      </div>

      {/* séparateur */}
      <div className="h-4 w-px bg-[var(--border)] mx-2" />

      {/* version */}
      <div className="text-[11px] text-[var(--txt-secondary)] tracking-[0.08em] font-mono">
        V2.0
      </div>

    </div>
  </AppBar>
);