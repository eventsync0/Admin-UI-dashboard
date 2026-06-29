// pages/events/EventEdit.tsx
import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
  SelectInput,
  Toolbar,
  SaveButton,
  DeleteButton,
} from "react-admin";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Save,
  Trash2,
} from "lucide-react";

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
  errorDark: "#dc2626",
  info: "#60a5fa",
};

// === STYLES ===
const sectionCard = {
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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          padding: "8px",
          borderRadius: "10px",
          backgroundColor: `${COLORS.primary}20`,
          color: COLORS.primary,
          display: "flex",
        }}
      >
        <Icon size={16} />
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

// === CUSTOM TOOLBAR : Save + Delete avec design dédié ===
const EventEditToolbar = () => (
  <Toolbar
    sx={{
      backgroundColor: "transparent",
      padding: "24px 0 0",
      borderTop: `1px solid ${COLORS.darkBorder}`,
      marginTop: "8px",
      display: "flex",
      gap: "12px",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }}
  >
    {/* DELETE — bouton rouge, bien distinct, à gauche */}
    <DeleteButton
      label="Delete event"
      icon={<Trash2 size={16} />}
      sx={{
        backgroundColor: "transparent",
        color: COLORS.error,
        border: `1.5px solid ${COLORS.error}40`,
        borderRadius: "10px",
        fontWeight: 600,
        padding: "10px 22px",
        textTransform: "none",
        fontSize: "14px",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: `${COLORS.error}15`,
          borderColor: COLORS.error,
          color: "#fff",
          boxShadow: `0 4px 16px ${COLORS.error}30`,
        },
      }}
    />

    {/* SAVE — bouton orange premium, à droite */}
    <SaveButton
      label="Save changes"
      icon={<Save size={16} />}
      sx={{
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
        "&.Mui-disabled": {
          backgroundColor: `${COLORS.primary}30`,
          color: COLORS.text.muted,
          boxShadow: "none",
        },
      }}
    />
  </Toolbar>
);

// === MAIN COMPONENT ===
export const EventEdit = () => (
  <Edit
    component="div"
    actions={false}
    sx={{
      backgroundColor: COLORS.background,
      minHeight: "100vh",
      padding: { xs: "16px", md: "24px" },
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

    <SimpleForm
      className="bg-transparent"
      toolbar={<EventEditToolbar />}
      sx={{
        p: 0,
        maxWidth: "900px",
        margin: "0 auto",
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
          marginBottom: "8px",
          borderBottom: `1px solid ${COLORS.darkBorder}`,
          width: "100%",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              Edit Event
            </h1>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: COLORS.text.secondary,
              margin: "4px 0 0 34px",
            }}
          >
            Update this event's information
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
          Back to Events
        </Link>
      </div>

      {/* === GENERAL INFORMATION === */}
      <div style={sectionCard}>
        {sectionHeader(
          FileText,
          "General Information",
          "Title, description, category, dates, and location",
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
          className="event-edit-subgrid"
        >
          {/* Title - Full Width */}
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

          {/* Description - Full Width */}
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

          {/* Category */}
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

          {/* Location */}
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

          {/* Start Date */}
          <div>
            <DateTimeInput
              source="startDate"
              label="Start Date & Time"
              validate={required()}
              fullWidth
              variant="outlined"
            />
          </div>

          {/* End Date */}
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
      </div>

      {/* Media query pour la responsivité de la grille générale */}
      <style>{`
        @media (max-width: 600px) {
          .event-edit-subgrid {
            grid-template-columns: 1fr !important;
          }
          .event-edit-subgrid > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </SimpleForm>
  </Edit>
);