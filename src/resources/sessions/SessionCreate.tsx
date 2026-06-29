import { SimpleForm, TextInput, DateTimeInput, NumberInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { Calendar, Clock, User, Sparkles } from 'lucide-react';

const COLORS = {
  primary: "#ea580c",
  primaryGlow: "rgba(234, 88, 12, 0.15)",
  background: "#0B0B14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)", muted: "rgba(255,255,255,0.5)" },
};

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box display="flex" alignItems="center" gap={1.5} mb={2}>
    <Box color={COLORS.primary}>{icon}</Box>
    <Typography variant="subtitle1" fontWeight={600} color={COLORS.text.primary}>
      {title}
    </Typography>
    <Divider sx={{ flex: 1, borderColor: COLORS.border }} />
  </Box>
);

const FormField = ({ children }: { children: React.ReactNode }) => (
  <Box mb={2.5}>{children}</Box>
);

export const SessionCreate = () => (
  <Box p={3} minHeight="100vh" bgcolor={COLORS.background}>
    <Card sx={{ 
      maxWidth: 800, 
      mx: "auto", 
      bgcolor: COLORS.card, 
      border: `1px solid ${COLORS.border}`,
      borderRadius: 3,
      boxShadow: "none",
    }}>
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: COLORS.primaryGlow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={24} color={COLORS.primary} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700} color={COLORS.text.primary}>
              Créer une session
            </Typography>
            <Typography variant="body2" color={COLORS.text.muted}>
              Remplissez les informations ci-dessous
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: COLORS.border, mb: 4 }} />

        <SimpleForm 
          sx={{ 
            "& .RaSimpleForm-content": { gap: 0 },
            "& .MuiInputLabel-root": { color: COLORS.text.secondary },
            "& .MuiInputBase-root": { 
              bgcolor: "rgba(0,0,0,0.2)", 
              borderRadius: 2,
              color: COLORS.text.primary,
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.primary },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.primary },
            },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.border },
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiTextField-root": { width: "100%" },
          }}
        >
          <SectionTitle icon={<Calendar size={18} />} title="Informations générales" />
          
          <FormField>
            <TextInput 
              source="title" 
              label="Titre" 
              required 
              sx={{ width: "100%" }}
            />
          </FormField>

          <FormField>
            <TextInput 
              source="description" 
              label="Description" 
              multiline 
              rows={4}
              sx={{ width: "100%" }}
            />
          </FormField>

          <Divider sx={{ borderColor: COLORS.border, my: 3 }} />

          <SectionTitle icon={<Clock size={18} />} title="Lieu et horaires" />

          <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
            <FormField>
              <ReferenceInput source="roomId" reference="rooms" label="Salle">
                <SelectInput optionText="name" sx={{ width: "100%" }} />
              </ReferenceInput>
            </FormField>
            <FormField>
              <NumberInput source="capacity" label="Capacité" min={1} sx={{ width: "100%" }} />
            </FormField>
          </Box>

          <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
            <FormField>
              <DateTimeInput source="startTime" label="Début" sx={{ width: "100%" }} />
            </FormField>
            <FormField>
              <DateTimeInput source="endTime" label="Fin" sx={{ width: "100%" }} />
            </FormField>
          </Box>

          <Divider sx={{ borderColor: COLORS.border, my: 3 }} />

          <SectionTitle icon={<User size={18} />} title="Intervenants" />
          
          <FormField>
            <ReferenceArrayInput source="speakerIds" reference="speakers" label="Intervenants">
              <SelectArrayInput optionText="fullName" sx={{ width: "100%" }} />
            </ReferenceArrayInput>
          </FormField>

          <Divider sx={{ borderColor: COLORS.border, my: 3 }} />

          <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
            <Box 
              component="button" 
              type="button"
              onClick={() => window.history.back()}
              sx={{
                px: 3,
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
                px: 4,
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
              Créer la session
            </Box>
          </Box>
        </SimpleForm>
      </CardContent>
    </Card>
  </Box>
);