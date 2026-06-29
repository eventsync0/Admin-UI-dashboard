// src/sessions/SessionShow.tsx
import { Show, SimpleShowLayout, TextField, NumberField, DateField, ReferenceField, ArrayField, SingleFieldList, ChipField } from 'react-admin';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { Eye, Calendar, Clock, MapPin, Users, User } from 'lucide-react';

const COLORS = {
  primary: "#d77c5b",
  primaryLight: "#ebbdad",
  background: "#0B0B14",
  card: "#29120a",
  cardHover: "#522414",
  border: "#522414",
  text: { 
    primary: "#f5ded6", 
    secondary: "#e19d84", 
    muted: "#7b371e" 
  },
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <Box display="flex" alignItems="center" gap={2} py={1.5} m={2}>
    <Box sx={{ color: COLORS.primary, width: 20 }}>{icon}</Box>
    <Box sx={{ minWidth: 100 }}>
      <Typography variant="body2" color={COLORS.text.secondary} fontWeight={500}>
        {label}
      </Typography>
    </Box>
    <Box>
      <Typography variant="body2" color={COLORS.text.primary}>
        {value || "-"}
      </Typography>
    </Box>
  </Box>
);

export const SessionShow = () => (
  <Box sx={{ p: 3, minHeight: "100vh", bgcolor: COLORS.background }}>
    <Card sx={{ 
      maxWidth: 700, 
      mx: "auto", 
      bgcolor: "transparent",
      boxShadow: "none",
      border: "none",
    }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} m={4}>
          <Eye size={28} color={COLORS.primary} />
          <Box>
            <Typography variant="h5" fontWeight={600} color={COLORS.text.primary}>
              Détails de la session
            </Typography>
            <Typography variant="body2" color={COLORS.text.secondary}>
              Consultez les informations ci-dessous
            </Typography>
          </Box>
        </Box>

        <Show>
          <SimpleShowLayout 
            sx={{ 
              "& .MuiPaper-root": { 
                bgcolor: "transparent", 
                boxShadow: "none",
                border: "none",
              },
              "& .RaSimpleShowLayout-content": { gap: 0 },
            }}
          >
            <Card sx={{ 
              bgcolor: COLORS.card, 
              border: `1px solid ${COLORS.border}`,
              borderRadius: 2,
              p: 3,
            }}>
              {/* Titre */}
              <Box mb={3}>
                <Typography variant="h6" fontWeight={600} color={COLORS.text.primary}>
                  <TextField source="title" label="Titre" />
                </Typography>
              </Box>

              {/* Description */}
              <Box mb={3}>
                <Typography variant="body2" color={COLORS.text.secondary}>
                  <TextField source="description" label="Description" />
                </Typography>
              </Box>

              <Divider sx={{ borderColor: COLORS.border, my: 2 }} />

              {/* Informations */}
              <InfoRow 
                icon={<Calendar size={18} />} 
                label="Date" 
                value={<DateField source="startTime" showTime locales="fr-FR" />} 
              />
              <InfoRow 
                icon={<Clock size={18} />} 
                label="Horaire" 
                value={
                  <Box display="flex" alignItems="center" gap={1}>
                    <DateField source="startTime" showTime locales="fr-FR" />
                    <span style={{ color: COLORS.text.muted }}>→</span>
                    <DateField source="endTime" showTime locales="fr-FR" />
                  </Box>
                } 
              />
              <InfoRow 
                icon={<MapPin size={18} />} 
                label="Salle" 
                value={
                  <ReferenceField source="roomId" reference="rooms" label="Salle">
                    <TextField source="name" />
                  </ReferenceField>
                } 
              />
              <InfoRow 
                icon={<Users size={18} />} 
                label="Capacité" 
                value={<NumberField source="capacity" label="Capacité" />} 
              />

              <Divider sx={{ borderColor: COLORS.border, my: 2 }} />

              {/* Intervenants */}
              <Box display="flex" alignItems="center" gap={2} py={1}>
                <User size={18} color={COLORS.primary} />
                <Box sx={{ minWidth: 100 }}>
                  <Typography variant="body2" color={COLORS.text.secondary} fontWeight={500}>
                    Intervenants
                  </Typography>
                </Box>
                <Box>
                  <ArrayField source="speakers" label="Intervenants">
                    <SingleFieldList>
                      <ChipField source="fullName" sx={{ 
                        bgcolor: "rgba(255,255,255,0.05)", 
                        color: COLORS.text.secondary,
                        borderRadius: 2,
                      }} />
                    </SingleFieldList>
                  </ArrayField>
                </Box>
              </Box>
            </Card>
          </SimpleShowLayout>
        </Show>
      </CardContent>
    </Card>
  </Box>
);