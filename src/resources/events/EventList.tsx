// pages/events/EventList.tsx
import { useState, useEffect } from "react";
import {
  useListContext,
  List,
  useDelete,
  useNotify,
  useRefresh,
} from "react-admin";
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

// === CATEGORIES ===
const CATEGORIES: Record<string, { label: string; color: string }> = {
  CONFERENCE: { label: "Conférence", color: "#7c3aed" },
  WORKSHOP: { label: "Atelier", color: "#2563eb" },
  SEMINAR: { label: "Séminaire", color: "#4338ca" },
  MEETUP: { label: "Meetup", color: "#059669" },
  WEBINAR: { label: "Webinaire", color: "#0d9488" },
  SOCIAL: { label: "Social", color: "#db2777" },
  FUNDRAISER: { label: "Collecte", color: "#e11d48" },
  SPORTS: { label: "Sports", color: "#dc2626" },
  ARTS: { label: "Arts", color: "#c026d3" },
  TECHNOLOGY: { label: "Technologie", color: "#0891b2" },
  BUSINESS: { label: "Affaires", color: "#d97706" },
  EDUCATION: { label: "Éducation", color: "#65a30d" },
  OTHER: { label: "Autre", color: "#6b7280" },
};

// === COULEURS COFFEE BEAN ===
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

// === FORMAT DATE ===
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// === COMPOSANT PRINCIPAL ===
const EventListGrid = () => {
  const { data, total, isLoading, filterValues, setFilters, page, setPage } =
    useListContext();

  const [search, setSearch] = useState(filterValues.q || "");
  const [category, setCategory] = useState(filterValues.category || "");
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  const ITEMS_PER_PAGE = 12;

  const totalEvents = total || 0;
  const sessionCount =
    data?.reduce(
      (acc: number, item: any) => acc + (item.sessions?.length || 0),
      0,
    ) || 0;
  const categoriesCount = new Set(data?.map((item: any) => item.category)).size;

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ?`)) return;
    deleteOne(
      "events",
      { id },
      {
        onSuccess: () => {
          notify("Événement supprimé", { type: "info" });
          refresh();
        },
        onError: (e: any) => notify(`Erreur: ${e.message}`, { type: "error" }),
      },
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(
        {
          ...filterValues,
          q: search || undefined,
          category: category || undefined,
        },
        null,
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [search, category]);

  const totalPages = Math.ceil((total || 0) / ITEMS_PER_PAGE);
  const currentPage = page || 1;

  // ✅ Calcul des indices pour la pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex) || [];

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#0B0B14",
      }}
    >
      {/* HEADER */}
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
              fontWeight: 400,
              color: "#ede1db",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Audiowide, cursive",
              letterSpacing: "0.03em",
            }}
          >
            <Sparkles size={24} color="#d77c5b" />
            Événements
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#e19d84",
              fontFamily: "Quicksand, sans-serif",
            }}
          >
            Gérez tous vos événements
          </p>
        </div>
        <Link
          to="/events/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            background: "linear-gradient(90deg, #d77c5b, #a44928)",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 12px rgba(205, 91, 50, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(205, 91, 50, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 12px rgba(205, 91, 50, 0.3)";
          }}
        >
          <Plus size={16} /> Créer
        </Link>
      </div>

      {/* KPI CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "Total Événements",
            value: totalEvents,
            icon: <Layers size={20} />,
            color: "#d77c5b",
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
              backgroundColor: "#29120a",
              border: "1px solid #522414",
              borderRadius: "1.25rem",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#cd5b32";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#522414";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#e19d84",
                  marginBottom: "6px",
                  letterSpacing: "0.08em",
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#ede1db",
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

      {/* FILTER BAR */}
      <div
        style={{
          backgroundColor: "#29120a",
          border: "1px solid #522414",
          borderRadius: "1.25rem",
          padding: "16px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
          backdropFilter: "blur(12px)",
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
              color: "#d77c5b",
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
              border: "1.5px solid #522414",
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "#ede1db",
              fontSize: "14px",
              outline: "none",
              fontFamily: "Quicksand, sans-serif",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#d77c5b";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(205, 91, 50, 0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#522414";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1.5px solid #522414",
            backgroundColor: "rgba(0,0,0,0.2)",
            color: "#ede1db",
            fontSize: "14px",
            outline: "none",
            minWidth: "200px",
            fontFamily: "Quicksand, sans-serif",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#d77c5b";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#522414";
          }}
        >
          <option value="">Toutes les catégories</option>
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <option key={key} value={key}>
              {val.label}
            </option>
          ))}
        </select>
      </div>

      {/* CARDS GRID */}
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
                backgroundColor: "#29120a",
                border: "1px solid #522414",
                borderRadius: "1.25rem",
                padding: "20px",
                animation: "pulse 1.5s ease-in-out infinite",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  height: "16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  marginBottom: "12px",
                  width: "40%",
                }}
              />
              <div
                style={{
                  height: "22px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  marginBottom: "12px",
                  width: "75%",
                }}
              />
              <div
                style={{
                  height: "14px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  marginBottom: "12px",
                  width: "100%",
                }}
              />
              <div
                style={{
                  height: "14px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  width: "60%",
                }}
              />
            </div>
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <div
          style={{
            backgroundColor: "#29120a",
            border: "2px dashed #522414",
            borderRadius: "1.25rem",
            padding: "64px",
            textAlign: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          <Layers size={48} style={{ color: "#d77c5b" }} />
          <h3
            style={{
              color: "#ede1db",
              marginTop: "16px",
              fontFamily: "Audiowide, cursive",
            }}
          >
            Aucun événement
          </h3>
          <p
            style={{
              color: "#e19d84",
              fontFamily: "Quicksand, sans-serif",
            }}
          >
            Créez votre premier événement dès maintenant.
          </p>
        </div>
      ) : (
        <>
          {/* ✅ CARTES PAGINÉES - Utilisation de currentData */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {currentData.map((event: any) => {
              const cat = CATEGORIES[event.category] || CATEGORIES.OTHER;
              return (
                <div
                  key={event.id}
                  style={{
                    backgroundColor: "#29120a",
                    border: "1px solid #522414",
                    borderRadius: "1.25rem",
                    padding: "20px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#cd5b32";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#522414";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
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
                        backgroundColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#d77c5b",
                        fontFamily: "monospace",
                      }}
                    >
                      #{event.id.slice(0, 6)}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#ede1db",
                      marginBottom: "6px",
                      fontFamily: "Quicksand, sans-serif",
                    }}
                  >
                    {event.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#e19d84",
                      marginBottom: "16px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.5,
                      fontFamily: "Quicksand, sans-serif",
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
                          color: "#e19d84",
                          marginBottom: "4px",
                          fontFamily: "Quicksand, sans-serif",
                        }}
                      >
                        <span style={{ color: "#d77c5b", opacity: 0.6 }}>
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
                      borderTop: "1px solid #522414",
                    }}
                  >
                    <div style={{ display: "flex", gap: "4px" }}>
                      <Link
                        to={`/events/${event.id}/show`}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          color: "#d77c5b",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(215, 124, 91, 0.2)";
                          e.currentTarget.style.color = "#e19d84";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#d77c5b";
                        }}
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        to={`/events/${event.id}`}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          color: "#d77c5b",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(215, 124, 91, 0.2)";
                          e.currentTarget.style.color = "#e19d84";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#d77c5b";
                        }}
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          border: "none",
                          background: "transparent",
                          color: "#d77c5b",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#dc2626";
                          e.currentTarget.style.backgroundColor =
                            "rgba(220,38,38,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#d77c5b";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <Link
                      to={`/events/${event.id}/show`}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#d77c5b",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#e19d84";
                        e.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#d77c5b";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      Détails →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ PAGINATION CORRIGÉE */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#29120a",
                border: "1px solid #522414",
                borderRadius: "1.25rem",
                padding: "12px 20px",
                marginTop: "24px",
                flexWrap: "wrap",
                gap: "12px",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#e19d84",
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                Affichage de{" "}
                <strong style={{ color: "#ede1db" }}>
                  {startIndex + 1}
                </strong>{" "}
                à{" "}
                <strong style={{ color: "#ede1db" }}>
                  {Math.min(endIndex, total || 0)}
                </strong>{" "}
                sur <strong style={{ color: "#ede1db" }}>{total}</strong>{" "}
                événements
              </p>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #522414",
                    backgroundColor: "transparent",
                    color: currentPage <= 1 ? "#d77c5b" : "#e19d84",
                    cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  ←
                </button>

                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p =
                    totalPages <= 7
                      ? i + 1
                      : currentPage <= 4
                        ? i + 1
                        : currentPage >= totalPages - 3
                          ? totalPages - 6 + i
                          : currentPage - 3 + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        padding: "7px 12px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: p === currentPage ? "#d77c5b" : "#522414",
                        backgroundColor:
                          p === currentPage ? "#d77c5b" : "transparent",
                        color: p === currentPage ? "#fff" : "#e19d84",
                        fontWeight: p === currentPage ? 700 : 400,
                        cursor: "pointer",
                        minWidth: "36px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #522414",
                    backgroundColor: "transparent",
                    color: currentPage >= totalPages ? "#d77c5b" : "#e19d84",
                    cursor:
                      currentPage >= totalPages ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </>
      )}

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