import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Clock, Users } from "lucide-react";

const COLORS = {
  primary: "#ea580c",
  primaryDark: "#d94a00",
  background: "#0B0B14",

  darkCard: "rgba(255, 255, 255, 0.03)",
  darkBorder: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
};

const cardStyle = {
  backgroundColor: COLORS.darkCard,
  border: `1px solid ${COLORS.darkBorder}`,
  borderRadius: "1.25rem",
  padding: "24px",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const SectionHeader = ({
  icon: Icon,
  label,
  description,
}: {
  icon: React.FC<any>;
  label: string;
  description?: string;
}) => (
  <div style={{ marginBottom: "24px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        paddingBottom: "16px",
        borderBottom: `1px solid ${COLORS.darkBorder}`,
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
          margin: "10px 0 0 42px",
        }}
      >
        {description}
      </p>
    )}
  </div>
);

export const SessionCreate = () => (
  <Box sx={{ p: 3, minHeight: "100vh", bgcolor: COLORS.background }}>
    <Card
      sx={{
        maxWidth: 700,
        mx: "auto",
        bgcolor: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" gap={2} m={5}>
          <Sparkles size={28} color={COLORS.primary} />
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
              color={COLORS.text.primary}
            >
              Nouvelle session
            </Typography>
            <Typography variant="body2" color={COLORS.text.muted}>
              Remplissez les champs ci-dessous
            </Typography>
          </Box>
        </Box>

        <SimpleForm
          sx={{
            "& .MuiInputLabel-root": { color: COLORS.text.muted, fontSize: 14 },
            "& .MuiInputBase-root": {
              bgcolor: COLORS.card,
              borderRadius: 2,
              color: COLORS.text.primary,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: COLORS.primary,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: COLORS.primary,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: COLORS.border,
            },
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiButton-root": { borderRadius: 2, textTransform: "none" },
          }}
        >
          <TextInput source="title" label="Titre" required fullWidth />
          <TextInput
            source="description"
            label="Description"
            multiline
            rows={3}
            fullWidth
          />

          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={2}
            my={1}
          >
            <ReferenceInput
              source="roomId"
              reference="rooms"
              label="Salle"
              fullWidth
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="capacity" label="Capacité" min={1} fullWidth />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={2}
          >
            <DateTimeInput source="startTime" label="Début" fullWidth />
            <DateTimeInput source="endTime" label="Fin" fullWidth />
          </Box>

          <ReferenceArrayInput
            source="speakerIds"
            reference="speakers"
            label="Intervenants"
            fullWidth
          >
            <SelectArrayInput optionText="fullName" />
          </ReferenceArrayInput>

          <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
            <Box
              component="button"
              type="button"
              onClick={() => window.history.back()}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                border: `1px solid ${COLORS.border}`,
                bgcolor: "transparent",
                color: COLORS.text.secondary,
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { bgcolor: COLORS.card },
              }}
            >
              Annuler
            </Box>
            <Box
              component="button"
              type="submit"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                border: "none",
                bgcolor: COLORS.primary,
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": { opacity: 0.85 },
              }}
            >
              Créer
            </Box>
          </Box>
        </SimpleForm>
      </CardContent>
    </Card>
  </Box>
);
