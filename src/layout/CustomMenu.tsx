import { Menu } from "react-admin";

export const CustomMenu = (props: any) => (
  <Menu
    {...props}
    sx={{
      "& .RaMenu-menu": {
        backgroundColor: "var(--background)",
        borderRight: "1px solid var(--border)",
        width: 300,
      },

      "& .RaMenuItemLink-root": {
        color: "var(--txt-body)",
        borderRadius: "10px",
        margin: "6px 10px",
        padding: "10px 12px",
        transition: "0.2s ease",
      },

      "& .RaMenuItemLink-root:hover": {
        backgroundColor: "var(--btn-ghost-hover)",
        color: "var(--txt-title)",
        transform: "translateX(3px)",
      },

      "& .RaMenuItemLink-active": {
        background: "var(--btn-primary-hover)",
        color: "var(--coffee-50)",
        borderLeft: "3px solid var(--btn-primary)",
      },

      "& .RaMenuItemIcon-root": {
        color: "inherit",
      },
    }}
  />
);