import { Edit, SimpleForm, TextInput, DateTimeInput, NumberInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Edit2 } from 'lucide-react';

const COLORS = {
  primary: "#ea580c",
  background: "#0B0B14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)", muted: "rgba(255,255,255,0.5)" },
};

export const SessionEdit = () => (
  <Box sx={{ p: 3, minHeight: "100vh", bgcolor: COLORS.background }}>
    <Card sx={{ 
      maxWidth: 700, 
      mx: "auto", 
      bgcolor: "transparent",
      boxShadow: "none",
      border: "none",
    }}>
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" gap={2} m={5}>
          <Edit2 size={28} color={COLORS.primary} />
          <Box>
            <Typography variant="h5" fontWeight={600} color={COLORS.text.primary}>
              Modifier la session
            </Typography>
            <Typography variant="body2" color={COLORS.text.muted}>
              Modifiez les champs ci-dessous
            </Typography>
          </Box>
        </Box>

        <Edit>
          <SimpleForm 
            sx={{ 
              "& .MuiInputLabel-root": { color: COLORS.text.muted, fontSize: 14 },
              "& .MuiInputBase-root": { 
                bgcolor: COLORS.card, 
                borderRadius: 2,
                color: COLORS.text.primary,
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.primary },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.primary },
              },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.border },
              "& .MuiFormControl-root": { width: "100%" },
              "& .MuiButton-root": { borderRadius: 2, textTransform: "none" },
            }}
          >
            <TextInput source="title" label="Titre" required fullWidth />
            <TextInput source="description" label="Description" multiline rows={3} fullWidth />

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2} my={1}>
              <ReferenceInput source="roomId" reference="rooms" label="Salle" fullWidth>
                <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput source="capacity" label="Capacité" min={1} fullWidth />
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
              <DateTimeInput source="startTime" label="Début" fullWidth />
              <DateTimeInput source="endTime" label="Fin" fullWidth />
            </Box>

            <ReferenceArrayInput source="speakerIds" reference="speakers" label="Intervenants" fullWidth>
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
                Mettre à jour
              </Box>
            </Box>
          </SimpleForm>
        </Edit>
      </CardContent>
    </Card>
  </Box>
);