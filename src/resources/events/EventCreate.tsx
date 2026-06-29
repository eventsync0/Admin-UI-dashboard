// pages/events/EventCreate.tsx
import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
  SelectInput,
} from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Info } from "lucide-react";

// === ORANGE COLORS ===
const COLORS = {
  primary: "#ea580c",
  primaryDark: "#d94a00",
  primaryGlow: "rgba(234, 88, 12, 0.25)",
  background: "#0B0B14",
  darkCard: "rgba(255, 255, 255, 0.03)",
  darkBorder: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",
};

// === STYLES ===
const cardStyle = {
  backgroundColor: COLORS.darkCard,
  border: `1px solid ${COLORS.darkBorder}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const sectionHeader = (
  Icon: React.FC<any>,
  label: string,
  description?: string,
) => (
  <div style={{ marginBottom: "20px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: description ? "4px" : "0",
      }}
    >
      <div
        style={{
          padding: "8px",
          borderRadius: "10px",
          backgroundColor: `${COLORS.primary}20`,
          color: COLORS.primary,
          display: "flex",
        }}
      >
        <Icon size={18} />
      </div>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: COLORS.text.primary,
          margin: 0,
        }}
      >
        {label}
      </h3>
    </div>
    {description && (
      <p
        style={{
          fontSize: "13px",
          color: COLORS.text.secondary,
          margin: "4px 0 0 42px",
        }}
      >
        {description}
      </p>
    )}
  </div>
);

// === MAIN COMPONENT ===
export const EventCreate = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        backgroundColor: COLORS.background,
        position: "relative",
      }}
    >
      {/* GLOW EFFECT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      <Create
        component="div"
        actions={false}
        sx={{ "& .RaCreate-main": { marginTop: 0 } }}
      >
        <SimpleForm
          sx={{
            p: 0,
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "transparent",
            position: "relative",
            zIndex: 1,

            // === INPUT STYLES ===
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
              transition: "all 0.2s ease",
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
              fontSize: "13px",
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
            "& .MuiFormHelperText-root": {
              color: COLORS.text.muted,
              fontSize: "12px",
            },
            "& .MuiInputAdornment-root": {
              color: COLORS.primary,
            },
            "& .MuiInputBase-multiline": {
              padding: "12px 14px",
            },

            // === TOOLBAR ===
            "& .RaToolbar-root": {
              backgroundColor: "transparent",
              padding: "24px 0 0",
              borderTop: `1px solid ${COLORS.darkBorder}`,
              marginTop: "8px",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            },
            "& .MuiButton-containedPrimary": {
              backgroundColor: COLORS.primary,
              color: "#fff",
              borderRadius: "10px",
              fontWeight: 600,
              padding: "10px 28px",
              boxShadow: `0 2px 12px ${COLORS.primary}40`,
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: COLORS.primaryDark,
                boxShadow: `0 6px 24px ${COLORS.primary}50`,
                transform: "translateY(-2px) scale(1.01)",
              },
            },
            "& .MuiButton-text": {
              color: COLORS.text.secondary,
              padding: "10px 20px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                color: COLORS.text.primary,
                backgroundColor: `${COLORS.darkBorder}40`,
              },
            },
          }}
        >
          {/* === HEADER === */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              paddingBottom: "20px",
              marginBottom: "24px",
              borderBottom: `1px solid ${COLORS.darkBorder}`,
              width: "100%",
            }}
          >
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Sparkles size={24} color={COLORS.primary} />
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    color: COLORS.text.primary,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Create Event
                </h1>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: COLORS.text.secondary,
                  margin: "4px 0 0 34px",
                }}
              >
                Enter the basic information for this event
              </p>
            </div>

            <Link
              to="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: COLORS.text.secondary,
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                border: `1.5px solid ${COLORS.darkBorder}`,
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.text.primary;
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.backgroundColor = `${COLORS.primary}10`;
                e.currentTarget.style.transform = "translateX(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.text.secondary;
                e.currentTarget.style.borderColor = COLORS.darkBorder;
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>

          {/* === GENERAL INFORMATION === */}
          <div style={cardStyle}>
            {sectionHeader(FileText, "General Information", "Event details")}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div style={{ gridColumn: "span 2" }}>
                <TextInput
                  source="title"
                  label="Event Title"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                  placeholder="Ex: Tech Conference 2024"
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <TextInput
                  source="description"
                  label="Detailed Description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder="Describe the event in a few sentences..."
                />
              </div>
              <div>
                <SelectInput
                  source="category"
                  label="Category"
                  choices={[
                    { id: "CONFERENCE", name: "Conference" },
                    { id: "WORKSHOP", name: "Workshop" },
                    { id: "SEMINAR", name: "Seminar" },
                    { id: "MEETUP", name: "Meetup" },
                    { id: "WEBINAR", name: "Webinar" },
                    { id: "SOCIAL", name: "Social" },
                    { id: "FUNDRAISER", name: "Fundraiser" },
                    { id: "SPORTS", name: "Sports" },
                    { id: "ARTS", name: "Arts" },
                    { id: "TECHNOLOGY", name: "Technology" },
                    { id: "BUSINESS", name: "Business" },
                    { id: "EDUCATION", name: "Education" },
                    { id: "OTHER", name: "Other" },
                  ]}
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <TextInput
                  source="location"
                  label="Location"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                  placeholder="Address or online link"
                />
              </div>
              <div>
                <DateTimeInput
                  source="startDate"
                  label="Start Date & Time"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div>
                <DateTimeInput
                  source="endDate"
                  label="End Date & Time"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                />
              </div>
            </div>

            {/* Info: sessions are managed independently */}
            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: `1px solid ${COLORS.darkBorder}`,
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <Info
                size={14}
                color={COLORS.info}
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.text.muted,
                  lineHeight: 1.5,
                }}
              >
                Sessions are created separately, once this event exists. Save
                this event first, then add sessions to it from the Sessions
                section.
              </span>
            </div>
          </div>
        </SimpleForm>
      </Create>
    </div>
  );
};
