import {
    Edit,
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
import { ArrowLeft, FileText, Sparkles, Clock } from "lucide-react";

const COLORS = {
    primary: "#d77c5b",
    primaryDark: "#cd5b32",
    primaryGlow: "rgba(215, 124, 91, 0.25)",
    background: "#0B0B14",
    darkCard: "rgba(255,255,255,0.03)",
    darkBorder: "rgba(255,255,255,0.08)",
    text: {
        primary: "#f5ded6",
        secondary: "#e19d84",
        muted: "#7b371e",
    },
};

const sectionCard = {
    backgroundColor: COLORS.darkCard,
    border: `1px solid ${COLORS.darkBorder}`,
    borderRadius: "1.25rem",
    padding: "24px",
    backdropFilter: "blur(12px)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const sectionHeader = (Icon: React.FC<any>, label: string, description?: string) => (
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

export const SessionEdit = () => (
    <Edit
        component="div"
        actions={false}
        sx={{
            backgroundColor: COLORS.background,
            minHeight: "100vh",
            padding: "24px",
            position: "relative",
        }}
    >
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
            sx={{
                p: 0,
                maxWidth: "1400px",
                margin: "0 auto",
                position: "relative",
                zIndex: 1,

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
                            Modifier la session
                        </h1>
                    </div>
                    <p
                        style={{
                            fontSize: "14px",
                            color: COLORS.text.secondary,
                            margin: "4px 0 0 34px",
                        }}
                    >
                        Mettez à jour les informations de la session
                    </p>
                </div>

                <Link
                    to="/sessions"
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
                    Retour aux sessions
                </Link>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
                    gap: "24px",
                    width: "100%",
                    alignItems: "start",
                }}
            >
                <div style={sectionCard}>
                    {sectionHeader(FileText, "Informations générales", "Titre, description et détails")}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", height: "20rem" }}>
                        <div style={{ gridColumn: "span 2" }}>
                            <TextInput
                                source="title"
                                label="Titre"
                                validate={required()}
                                fullWidth
                                variant="outlined"
                                placeholder="Ex: Workshop React"
                            />
                        </div>

                        <div style={{ gridColumn: "span 2" }}>
                            <TextInput
                                source="description"
                                label="Description"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                placeholder="Décrivez la session..."
                            />
                        </div>
                    </div>
                </div>

                <div style={sectionCard}>
                    {sectionHeader(Clock, "Lieu et horaires", "Salle, capacité et horaires")}

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "28rem"}}>
                        <ReferenceInput source="roomId" reference="rooms" label="Salle" fullWidth>
                            <AutocompleteInput
                                optionText="name"
                                validate={required()}
                                variant="outlined"
                                label="Choisir une salle"
                            />
                        </ReferenceInput>

                        <NumberInput
                            source="capacity"
                            label="Capacité"
                            validate={required()}
                            fullWidth
                            variant="outlined"
                            placeholder="Nombre de places"
                        />

                        <DateTimeInput
                            source="startTime"
                            label="Début"
                            validate={required()}
                            fullWidth
                            variant="outlined"
                        />

                        <DateTimeInput
                            source="endTime"
                            label="Fin"
                            validate={required()}
                            fullWidth
                            variant="outlined"
                        />

                        <div style={{ marginTop: "8px" }}>
                            <ReferenceArrayInput source="speakerIds" reference="speakers" label="Intervenants" fullWidth>
                                <SelectArrayInput optionText="fullName" />
                            </ReferenceArrayInput>
                        </div>
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
    </Edit>
);