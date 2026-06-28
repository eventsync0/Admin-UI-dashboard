// pages/events/EventCreate.tsx
import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Layers, Sparkles, Clock } from "lucide-react";

// === COFFEE BEAN COLORS ===
const COLORS = {
  coffee: {
    50: "#ede1db",
    100: "#f5ded6",
    200: "#ebbdad",
    300: "#e19d84",
    400: "#d77c5b",
    500: "#cd5b32",
    600: "#a44928",
    700: "#7b371e",
    800: "#522414",
    900: "#29120a",
    950: "#1d0d07",
  },
  background: "#0B0B14",
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",
};

// === STYLES ===
const cardStyle = {
  backgroundColor: COLORS.coffee[900],
  border: `1px solid ${COLORS.coffee[800]}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const sectionHeader = (Icon: React.FC<any>, label: string) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      paddingBottom: "16px",
      marginBottom: "24px",
      borderBottom: `1px solid ${COLORS.coffee[800]}`,
    }}
  >
    <div
      style={{
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: `${COLORS.coffee[400]}20`,
        color: COLORS.coffee[400],
        display: "flex",
      }}
    >
      <Icon size={18} />
    </div>
    <h3
      style={{
        fontSize: "16px",
        fontWeight: 700,
        color: COLORS.coffee[50],
        margin: 0,
        fontFamily: "Audiowide, cursive",
      }}
    >
      {label}
    </h3>
  </div>
);

// === MAIN COMPONENT ===
export const EventCreate = () => (
  <div
    style={{
      minHeight: "100vh",
      padding: "24px",
      backgroundColor: COLORS.background,
    }}
  >
    <Create
      component="div"
      actions={false}
      sx={{ "& .RaCreate-main": { marginTop: 0 } }}
    >
      <SimpleForm
        sx={{
          p: 0,
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "transparent",
          
          // === INPUT STYLES ===
          "& .MuiFormControl-root": { width: "100%" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "10px",
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: COLORS.coffee[400],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: COLORS.coffee[400],
              borderWidth: "2px",
              boxShadow: `0 0 0 4px ${COLORS.coffee[400]}15`,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.coffee[800],
            borderWidth: "1.5px",
          },
          "& .MuiInputBase-input": {
            color: COLORS.coffee[50],
            fontFamily: "Quicksand, sans-serif",
            fontSize: "14px",
            padding: "12px 14px",
            "&::placeholder": {
              color: COLORS.coffee[400],
              opacity: 0.5,
            },
          },
          "& .MuiInputLabel-root": {
            color: COLORS.coffee[300],
            fontFamily: "Quicksand, sans-serif",
            fontSize: "13px",
            "&.Mui-focused": {
              color: COLORS.coffee[400],
            },
          },
          "& .MuiSelect-select": {
            color: COLORS.coffee[50],
            padding: "12px 14px",
          },
          "& .MuiSelect-icon": {
            color: COLORS.coffee[400],
          },
          "& .MuiFormHelperText-root": {
            color: COLORS.coffee[400],
            fontFamily: "Quicksand, sans-serif",
            fontSize: "12px",
          },
          "& .MuiInputAdornment-root": {
            color: COLORS.coffee[400],
          },
          "& .MuiAutocomplete-root .MuiOutlinedInput-root": {
            padding: "0",
          },
          "& .MuiAutocomplete-root .MuiInputBase-input": {
            padding: "12px 14px",
          },
          "& .MuiInputBase-multiline": {
            padding: "12px 14px",
          },

          // === TOOLBAR ===
          "& .RaToolbar-root": {
            backgroundColor: "transparent",
            padding: "24px 0 0",
            borderTop: `1px solid ${COLORS.coffee[800]}`,
            marginTop: "8px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          },
          "& .MuiButton-containedPrimary": {
            backgroundColor: COLORS.coffee[400],
            color: "#fff",
            borderRadius: "10px",
            fontWeight: 600,
            fontFamily: "Quicksand, sans-serif",
            padding: "10px 28px",
            boxShadow: `0 2px 12px ${COLORS.coffee[400]}40`,
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: COLORS.coffee[500],
              boxShadow: `0 6px 24px ${COLORS.coffee[400]}50`,
              transform: "translateY(-2px) scale(1.01)",
            },
          },
          "& .MuiButton-text": {
            color: COLORS.coffee[300],
            fontFamily: "Quicksand, sans-serif",
            padding: "10px 20px",
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              color: COLORS.coffee[50],
              backgroundColor: `${COLORS.coffee[800]}40`,
            },
          },

          // === ARRAY INPUT (SESSIONS) ===
          "& .RaSimpleFormIterator-form": {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            padding: "20px",
            marginBottom: "14px",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "14px",
            border: `1px solid ${COLORS.coffee[800]}`,
            transition: "all 0.3s ease",
            position: "relative",
            "&:hover": {
              borderColor: COLORS.coffee[400],
              boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
            },
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${COLORS.coffee[400]}, ${COLORS.coffee[600]})`,
              borderRadius: "14px 14px 0 0",
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&:hover:before": {
              opacity: 1,
            },
          },
          "& .RaSimpleFormIterator-add button": {
            backgroundColor: `${COLORS.coffee[400]}12`,
            color: COLORS.coffee[400],
            borderRadius: "10px",
            fontWeight: 600,
            fontFamily: "Quicksand, sans-serif",
            padding: "12px 20px",
            border: `2px dashed ${COLORS.coffee[400]}30`,
            transition: "all 0.3s ease",
            textTransform: "none",
            fontSize: "14px",
            width: "100%",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: `${COLORS.coffee[400]}20`,
              borderColor: COLORS.coffee[400],
              transform: "translateY(-2px)",
            },
          },
          "& .RaSimpleFormIterator-remove button": {
            color: COLORS.coffee[400],
            padding: "6px 12px",
            borderRadius: "8px",
            transition: "all 0.2s ease",
            "&:hover": {
              color: COLORS.error,
              backgroundColor: `${COLORS.error}15`,
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
            borderBottom: `1px solid ${COLORS.coffee[800]}`,
            width: "100%",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Sparkles size={24} color={COLORS.coffee[400]} />
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 400,
                  color: COLORS.coffee[50],
                  letterSpacing: "-0.02em",
                  margin: 0,
                  fontFamily: "Audiowide, cursive",
                }}
              >
                Create Event
              </h1>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: COLORS.coffee[300],
                margin: "4px 0 0 34px",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              Enter the basic information and configure the associated sessions
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
              color: COLORS.coffee[300],
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "10px",
              border: `1.5px solid ${COLORS.coffee[800]}`,
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              fontFamily: "Quicksand, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COLORS.coffee[50];
              e.currentTarget.style.borderColor = COLORS.coffee[400];
              e.currentTarget.style.backgroundColor = `${COLORS.coffee[400]}10`;
              e.currentTarget.style.transform = "translateX(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = COLORS.coffee[300];
              e.currentTarget.style.borderColor = COLORS.coffee[800];
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {/* === FORM GRID (2 columns) === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "24px",
            width: "100%",
            alignItems: "start",
          }}
        >
          {/* === LEFT COLUMN - General Information === */}
          <div style={cardStyle}>
            {sectionHeader(FileText, "General Information")}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
          </div>

          {/* === RIGHT COLUMN - Sessions === */}
          <div style={cardStyle}>
            {sectionHeader(Layers, "Event Sessions")}
            <p
              style={{
                fontSize: "13px",
                color: COLORS.coffee[300],
                marginBottom: "20px",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              Configure one or more sessions or workshops for this event.
            </p>

            <ArrayInput source="sessions" label=" ">
              <SimpleFormIterator
                inline
                sx={{
                  width: "100%",
                  "& .RaSimpleFormIterator-form": {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    padding: "20px",
                    marginBottom: "14px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "14px",
                    border: `1px solid ${COLORS.coffee[800]}`,
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&:hover": {
                      borderColor: COLORS.coffee[400],
                      boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
                    },
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, ${COLORS.coffee[400]}, ${COLORS.coffee[600]})`,
                      borderRadius: "14px 14px 0 0",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover:before": {
                      opacity: 1,
                    },
                  },
                  "& .RaSimpleFormIterator-add button": {
                    backgroundColor: `${COLORS.coffee[400]}12`,
                    color: COLORS.coffee[400],
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontFamily: "Quicksand, sans-serif",
                    padding: "12px 20px",
                    border: `2px dashed ${COLORS.coffee[400]}30`,
                    transition: "all 0.3s ease",
                    textTransform: "none",
                    fontSize: "14px",
                    width: "100%",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: `${COLORS.coffee[400]}20`,
                      borderColor: COLORS.coffee[400],
                      transform: "translateY(-2px)",
                    },
                  },
                  "& .RaSimpleFormIterator-remove button": {
                    color: COLORS.coffee[400],
                    padding: "6px 12px",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: COLORS.error,
                      backgroundColor: `${COLORS.error}15`,
                    },
                  },
                }}
              >
                <TextInput
                  source="title"
                  label="Session Title"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                  placeholder="Ex: React Workshop"
                />
                <TextInput
                  source="description"
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                  variant="outlined"
                  placeholder="Session description..."
                />
                <ReferenceInput source="roomId" reference="rooms" label="Room" fullWidth>
                  <AutocompleteInput
                    optionText="name"
                    validate={required()}
                    variant="outlined"
                    placeholder="Choose a room"
                  />
                </ReferenceInput>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  <DateTimeInput
                    source="startTime"
                    label="Start Time"
                    validate={required()}
                    fullWidth
                    variant="outlined"
                  />
                  <DateTimeInput
                    source="endTime"
                    label="End Time"
                    validate={required()}
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <NumberInput
                  source="capacity"
                  label="Capacity"
                  validate={required()}
                  fullWidth
                  variant="outlined"
                  placeholder="Number of seats"
                />
              </SimpleFormIterator>
            </ArrayInput>

            {/* Footer */}
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: `1px solid ${COLORS.coffee[800]}`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Clock size={14} color={COLORS.coffee[400]} />
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.coffee[400],
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                Add one or more sessions to your event
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </SimpleForm>
    </Create>
  </div>
);