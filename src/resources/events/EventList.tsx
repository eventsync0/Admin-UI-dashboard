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
  CONFERENCE: { label: "Conference", color: "#7c3aed" },
  WORKSHOP: { label: "Workshop", color: "#2563eb" },
  SEMINAR: { label: "Seminar", color: "#4338ca" },
  MEETUP: { label: "Meetup", color: "#059669" },
  WEBINAR: { label: "Webinar", color: "#0d9488" },
  SOCIAL: { label: "Social", color: "#db2777" },
  FUNDRAISER: { label: "Fundraiser", color: "#e11d48" },
  SPORTS: { label: "Sports", color: "#dc2626" },
  ARTS: { label: "Arts", color: "#c026d3" },
  TECHNOLOGY: { label: "Technology", color: "#0891b2" },
  BUSINESS: { label: "Business", color: "#d97706" },
  EDUCATION: { label: "Education", color: "#65a30d" },
  OTHER: { label: "Other", color: "#6b7280" },
};

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

// === DATE FORMAT ===
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// === MAIN COMPONENT ===
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
    if (!confirm(`Delete "${title}"?`)) return;
    deleteOne(
      "events",
      { id },
      {
        onSuccess: () => {
          notify("Event deleted", { type: "info" });
          refresh();
        },
        onError: (e: any) => notify(`Error: ${e.message}`, { type: "error" }),
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
        backgroundColor: COLORS.background,
        position: "relative",
      }}
    >
      {/* BACKGROUND GLOW */}
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
                fontWeight: 800,
                color: COLORS.text.primary,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Sparkles size={22} color={COLORS.primary} />
              Event Management
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: COLORS.text.secondary,
              }}
            >
              Manage all your events
            </p>
          </div>
          <Link
            to="/events/create"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "12px",
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Plus size={16} /> Create Event
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
              label: "Total Events",
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
              label: "Categories",
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
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.darkBorder;
                e.currentTarget.style.boxShadow = "none";
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
                    letterSpacing: "0.08em",
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

        {/* FILTER BAR */}
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
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px 10px 38px",
                borderRadius: "10px",
                border: `1px solid ${COLORS.darkBorder}`,
                backgroundColor: "rgba(0,0,0,0.2)",
                color: COLORS.text.primary,
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}25`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.darkBorder;
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
              border: `1px solid ${COLORS.darkBorder}`,
              backgroundColor: "rgba(0,0,0,0.2)",
              color: COLORS.text.primary,
              fontSize: "14px",
              outline: "none",
              minWidth: "200px",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.primary;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.darkBorder;
            }}
          >
            <option value="">All Categories</option>
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
              backgroundColor: COLORS.darkCard,
              border: `2px dashed ${COLORS.darkBorder}`,
              borderRadius: "16px",
              padding: "64px",
              textAlign: "center",
            }}
          >
            <Layers size={48} style={{ color: COLORS.text.muted }} />
            <h3
              style={{
                color: COLORS.text.primary,
                marginTop: "16px",
              }}
            >
              No Events
            </h3>
            <p
              style={{
                color: COLORS.text.secondary,
              }}
            >
              Create your first event now.
            </p>
          </div>
        ) : (
          <>
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
                      backgroundColor: COLORS.darkCard,
                      border: `1px solid ${COLORS.darkBorder}`,
                      borderRadius: "16px",
                      padding: "20px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = COLORS.primary;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = COLORS.darkBorder;
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
                          color: COLORS.text.muted,
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
                        lineHeight: 1.5,
                      }}
                    >
                      {event.description || "No description."}
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
                          <span style={{ color: COLORS.text.muted, opacity: 0.8 }}>
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
                            padding: "6px 10px",
                            borderRadius: "8px",
                            color: COLORS.text.muted,
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
                            e.currentTarget.style.color = COLORS.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = COLORS.text.muted;
                          }}
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          to={`/events/${event.id}`}
                          style={{
                            padding: "6px 10px",
                            borderRadius: "8px",
                            color: COLORS.text.muted,
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
                            e.currentTarget.style.color = COLORS.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = COLORS.text.muted;
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
                            color: COLORS.text.muted,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = COLORS.error;
                            e.currentTarget.style.backgroundColor = "rgba(248, 113, 113, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = COLORS.text.muted;
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
                          color: COLORS.primary,
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = COLORS.primary;
                          e.currentTarget.style.transform = "translateX(2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = COLORS.primary;
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
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
                <p
                  style={{
                    fontSize: "13px",
                    color: COLORS.text.secondary,
                  }}
                >
                  Showing{" "}
                  <strong style={{ color: COLORS.text.primary }}>
                    {startIndex + 1}
                  </strong>{" "}
                  to{" "}
                  <strong style={{ color: COLORS.text.primary }}>
                    {Math.min(endIndex, total || 0)}
                  </strong>{" "}
                  of <strong style={{ color: COLORS.text.primary }}>{total}</strong>{" "}
                  events
                </p>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${COLORS.darkBorder}`,
                      backgroundColor: "transparent",
                      color: currentPage <= 1 ? COLORS.text.muted : COLORS.text.secondary,
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
                          border: `1px solid ${p === currentPage ? COLORS.primary : COLORS.darkBorder}`,
                          backgroundColor: p === currentPage ? COLORS.primary : "transparent",
                          color: p === currentPage ? "#fff" : COLORS.text.secondary,
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
                      border: `1px solid ${COLORS.darkBorder}`,
                      backgroundColor: "transparent",
                      color: currentPage >= totalPages ? COLORS.text.muted : COLORS.text.secondary,
                      cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
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