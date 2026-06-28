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
      <div className="font-audiowide text-xs sm:text-sm md:text-base lg:text-lg tracking-tight">
        <span className="text-foreground">Event</span>
        <span className="bg-gradient-to-r from-coffee-500 to-coffee-600 bg-clip-text text-transparent">
          Sync
        </span>
      </div>
    </div>
  </AppBar>
);
