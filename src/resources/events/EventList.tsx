// pages/events/EventList.tsx
import { useState, useEffect } from "react";
import { useListContext, List } from "react-admin";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Layers,
  Clock,
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Info,
  Sparkles,
} from "lucide-react";
import { useDelete, useNotify, useRefresh } from "react-admin";

// === CATEGORY MAP ===
const categoryMap: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  CONFERENCE: { label: "Conférence", color: "#7c3aed", bg: "#f5f3ff" },
  WORKSHOP: { label: "Atelier", color: "#2563eb", bg: "#eff6ff" },
  SEMINAR: { label: "Séminaire", color: "#4338ca", bg: "#eef2ff" },
  MEETUP: { label: "Meetup", color: "#059669", bg: "#ecfdf5" },
  WEBINAR: { label: "Webinaire", color: "#0d9488", bg: "#f0fdfa" },
  SOCIAL: { label: "Social", color: "#db2777", bg: "#fdf2f8" },
  FUNDRAISER: { label: "Collecte", color: "#e11d48", bg: "#fff1f2" },
  SPORTS: { label: "Sports", color: "#dc2626", bg: "#fef2f2" },
  ARTS: { label: "Arts", color: "#c026d3", bg: "#fdf4ff" },
  TECHNOLOGY: { label: "Technologie", color: "#0891b2", bg: "#ecfeff" },
  BUSINESS: { label: "Affaires", color: "#d97706", bg: "#fffbeb" },
  EDUCATION: { label: "Éducation", color: "#65a30d", bg: "#f7fee7" },
  OTHER: { label: "Autre", color: "#6b7280", bg: "#f9fafb" },
};

// === COULEURS ===
const COLORS = {
  primary: "#ea580c",
  primaryLight: "#f97316",
  primaryDark: "#d94a00",
  primaryGlow: "rgba(234, 88, 12, 0.3)",
  primaryBorder: "rgba(234, 88, 12, 0.2)",
  background: "#0B0B14",
  darkCard: "rgba(255, 255, 255, 0.03)",
  darkBorder: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
};

// === FORMAT DATE ===
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// === COMPOSANT PRINCIPAL ===
const EventListGrid = () => {
  const {
    data,
    total,
    isLoading,
    filterValues,
    setFilters,
    page,
    setPage,
  } = useListContext();

  const [search, setSearch] = useState(filterValues.q || "");
  const [category, setCategory] = useState(filterValues.category || "");
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  const ITEMS_PER_PAGE = 12; // ✅ 12 cartes par page

  const totalEvents = total || 0;
  const sessionCount =
    data?.reduce(
      (acc: number, item: any) => acc + (item.sessions?.length || 0),
      0
    ) || 0;
  const categoriesCount = new Set(data?.map((item: any) => item.category)).size;

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer "${title}" ?`)) {
      deleteOne(
        "events",
        { id },
        {
          onSuccess: () => {
            notify("Événement supprimé avec succès", { type: "info" });
            refresh();
          },
          onError: (error: any) => {
            notify(`Erreur: ${error.message}`, { type: "error" });
          },
        }
      );
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters(
        {
          ...filterValues,
          q: search || undefined,
          category: category || undefined,
        },
        null
      );
    }, 400);
    return () => clearTimeout(delay);
  }, [search, category]);

  const totalPages = Math.ceil((total || 0) / ITEMS_PER_PAGE);
  const currentPage = page || 1;

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        backgroundColor: COLORS.background,
        position: "relative",
      }}
    >
      {/* Effets de fond */}
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

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: COLORS.text.primary,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Sparkles size={24} color={COLORS.primary} />
              Gestion des Événements
            </h1>
            <p style={{ fontSize: "14px", color: COLORS.text.secondary }}>
              Planifiez, modifiez et suivez vos événements.
            </p>
          </div>
          <Link
            to="/events/create"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: `0 2px 12px ${COLORS.primaryGlow}`,
            }}
          >
            <Plus size={16} /> Créer un événement
          </Link>
        </div>

        {/* KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              label: "Total Événements",
              value: totalEvents,
              icon: <Layers size={20} />,
              color: COLORS.primary,
            },
            {
              label: "Total Sessions",
              value: sessionCount,
              icon: <Clock size={20} />,
              color: "#38bdf8",
            },
            {
              label: "Catégories",
              value: categoriesCount,
              icon: <Info size={20} />,
              color: "#8b5cf6",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                backgroundColor: COLORS.darkCard,
                border: `1px solid ${COLORS.darkBorder}`,
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: COLORS.text.muted,
                    marginBottom: "6px",
                  }}
                >
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: COLORS.text.primary,
                  }}
                >
                  {kpi.value}
                </div>
              </div>
              <div
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: `${kpi.color}20`,
                  color: kpi.color,
                }}
              >
                {kpi.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div
          style={{
            backgroundColor: COLORS.darkCard,
            border: `1px solid ${COLORS.darkBorder}`,
            borderRadius: "16px",
            padding: "16px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: COLORS.text.muted,
              }}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px 10px 38px",
                borderRadius: "10px",
                border: `1.5px solid ${COLORS.darkBorder}`,
                backgroundColor: "rgba(0,0,0,0.2)",
                color: COLORS.text.primary,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: `1.5px solid ${COLORS.darkBorder}`,
              backgroundColor: "rgba(0,0,0,0.2)",
              color: COLORS.text.primary,
              fontSize: "14px",
              outline: "none",
              minWidth: "200px",
            }}
          >
            <option value="">Toutes les catégories</option>
            {Object.entries(categoryMap).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ GRILLE 3x4 = 12 CARTES PAR PAGE */}
        {isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: COLORS.darkCard,
                  border: `1px solid ${COLORS.darkBorder}`,
                  borderRadius: "16px",
                  padding: "20px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    height: "16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    width: "40%",
                  }}
                />
                <div
                  style={{
                    height: "22px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    width: "75%",
                  }}
                />
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    width: "100%",
                  }}
                />
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "6px",
                    width: "60%",
                  }}
                />
              </div>
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div
            style={{
              backgroundColor: COLORS.darkCard,
              border: `2px dashed ${COLORS.darkBorder}`,
              borderRadius: "20px",
              padding: "64px",
              textAlign: "center",
            }}
          >
            <Layers size={48} style={{ color: COLORS.text.muted }} />
            <h3 style={{ color: COLORS.text.primary, marginTop: "16px" }}>
              Aucun événement
            </h3>
            <p style={{ color: COLORS.text.secondary }}>
              Créez votre premier événement dès maintenant.
            </p>
          </div>
        ) : (
          <>
            {/* ✅ Affiche uniquement les 12 premiers événements de la page */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {data.slice(0, 12).map((event: any) => {
                const cat = categoryMap[event.category] || categoryMap.OTHER;
                return (
                  <div
                    key={event.id}
                    style={{
                      backgroundColor: COLORS.darkCard,
                      border: `1px solid ${COLORS.darkBorder}`,
                      borderRadius: "20px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = COLORS.primaryBorder;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = COLORS.darkBorder;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        height: "4px",
                        backgroundColor: cat.color,
                        opacity: 0.7,
                      }}
                    />
                    <div style={{ padding: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: "999px",
                            backgroundColor: cat.bg,
                            color: cat.color,
                          }}
                        >
                          {cat.label}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: COLORS.text.muted,
                          }}
                        >
                          #{event.id}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: COLORS.text.primary,
                          marginBottom: "6px",
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: COLORS.text.secondary,
                          marginBottom: "16px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {event.description || "Aucune description."}
                      </p>

                      <div style={{ marginBottom: "16px" }}>
                        {[
                          { icon: <MapPin size={13} />, text: event.location },
                          {
                            icon: <Calendar size={13} />,
                            text: formatDate(event.startDate),
                          },
                          {
                            icon: <Clock size={13} />,
                            text: `${event.sessions?.length || 0} sessions`,
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "13px",
                              color: COLORS.text.secondary,
                              marginBottom: "4px",
                            }}
                          >
                            <span style={{ color: COLORS.text.muted }}>
                              {item.icon}
                            </span>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "14px",
                          borderTop: `1px solid ${COLORS.darkBorder}`,
                        }}
                      >
                        <div style={{ display: "flex", gap: "4px" }}>
                          <Link
                            to={`/events/${event.id}/show`}
                            style={{
                              padding: "7px",
                              borderRadius: "8px",
                              color: COLORS.text.muted,
                              textDecoration: "none",
                            }}
                          >
                            <Eye size={15} />
                          </Link>
                          <Link
                            to={`/events/${event.id}`}
                            style={{
                              padding: "7px",
                              borderRadius: "8px",
                              color: COLORS.text.muted,
                              textDecoration: "none",
                            }}
                          >
                            <Edit2 size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.title)}
                            style={{
                              padding: "7px",
                              borderRadius: "8px",
                              border: "none",
                              background: "transparent",
                              color: COLORS.text.muted,
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <Link
                          to={`/events/${event.id}/show`}
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: COLORS.primary,
                            textDecoration: "none",
                          }}
                        >
                          Détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ✅ PAGINATION */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: COLORS.darkCard,
                  border: `1px solid ${COLORS.darkBorder}`,
                  borderRadius: "16px",
                  padding: "12px 20px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <p style={{ fontSize: "13px", color: COLORS.text.secondary }}>
                  Page <strong style={{ color: COLORS.text.primary }}>{currentPage}</strong>{" "}
                  sur <strong style={{ color: COLORS.text.primary }}>{totalPages}</strong>
                </p>
                <div style={{ display: "flex", gap: "4px" }}>
                  {/* Bouton Précédent */}
                  <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "8px",
                      border: `1.5px solid ${COLORS.darkBorder}`,
                      backgroundColor: COLORS.darkCard,
                      color:
                        currentPage <= 1 ? COLORS.text.muted : COLORS.text.secondary,
                      cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    ←
                  </button>

                  {/* Numéros de pages */}
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let p;
                    if (totalPages <= 7) p = i + 1;
                    else if (currentPage <= 4) p = i + 1;
                    else if (currentPage >= totalPages - 3)
                      p = totalPages - 6 + i;
                    else p = currentPage - 3 + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          padding: "7px 12px",
                          borderRadius: "8px",
                          border: "1.5px solid",
                          borderColor:
                            p === currentPage ? COLORS.primary : COLORS.darkBorder,
                          backgroundColor:
                            p === currentPage ? COLORS.primary : COLORS.darkCard,
                          color:
                            p === currentPage ? "#fff" : COLORS.text.secondary,
                          fontWeight: p === currentPage ? 700 : 400,
                          cursor: "pointer",
                          minWidth: "36px",
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}

                  {/* Bouton Suivant */}
                  <button
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "8px",
                      border: `1.5px solid ${COLORS.darkBorder}`,
                      backgroundColor: COLORS.darkCard,
                      color:
                        currentPage >= totalPages
                          ? COLORS.text.muted
                          : COLORS.text.secondary,
                      cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export const EventList = () => (
  <List actions={false} pagination={false} component="div" perPage={12}>
    <EventListGrid />
  </List>
);