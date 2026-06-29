import { CSSProperties } from "react";

export const COLORS = {
  primary: "#ea580c",
  primaryDark: "#d94a00",
  primaryGlow: "rgba(234,88,12,0.25)",

  background: "#0B0B14",

  darkCard: "rgba(255,255,255,0.03)",
  darkBorder: "rgba(255,255,255,0.08)",

  text: {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.7)",
    muted: "rgba(255,255,255,0.5)",
  },
};

export const cardStyle: CSSProperties = {
  backgroundColor: COLORS.darkCard,
  border: `1px solid ${COLORS.darkBorder}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

export const pageStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "24px",
  backgroundColor: COLORS.background,
  position: "relative",
};

export const formSx = {
  p: 0,
  maxWidth: "1400px",
  margin: "0 auto",

  "& .MuiFormControl-root": {
    width: "100%",
  },

  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "10px",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.primary,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.primary,
      borderWidth: "2px",
      boxShadow: `0 0 0 4px ${COLORS.primary}25`,
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: COLORS.darkBorder,
    borderWidth: "1.5px",
  },

  "& .MuiInputBase-input": {
    color: COLORS.text.primary,
    fontSize: "14px",
    padding: "12px 14px",

    "&::placeholder": {
      color: COLORS.text.muted,
      opacity: 0.5,
    },
  },

  "& .MuiInputLabel-root": {
    color: COLORS.text.secondary,

    "&.Mui-focused": {
      color: COLORS.primary,
    },
  },

  "& .MuiSelect-select": {
    color: COLORS.text.primary,
    padding: "12px 14px",
  },

  "& .MuiSelect-icon": {
    color: COLORS.primary,
  },

  "& .MuiAutocomplete-root .MuiOutlinedInput-root": {
    padding: 0,
  },

  "& .MuiAutocomplete-root .MuiInputBase-input": {
    padding: "12px 14px",
  },

  "& .RaToolbar-root": {
    backgroundColor: "transparent",
    padding: "24px 0 0",
    borderTop: `1px solid ${COLORS.darkBorder}`,
    marginTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    flexWrap: "wrap",
  },

  "& .MuiButton-containedPrimary": {
    backgroundColor: COLORS.primary,
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 28px",
    fontWeight: 600,
    textTransform: "none",

    "&:hover": {
      backgroundColor: COLORS.primaryDark,
    },
  },

  "& .MuiButton-text": {
    color: COLORS.text.secondary,
    textTransform: "none",

    "&:hover": {
      color: COLORS.text.primary,
      backgroundColor: `${COLORS.darkBorder}40`,
    },
  },
};