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
} from "lucide-react";
import { useDelete, useNotify, useRefresh } from "react-admin";

const categoryMap: Record<string, { label: string; color: string; bg: string }> = {
  CONFERENCE: { label: "Conférence",    color: "#7c3aed", bg: "#f5f3ff" },
  WORKSHOP:   { label: "Atelier",       color: "#2563eb", bg: "#eff6ff" },
  SEMINAR:    { label: "Séminaire",     color: "#4338ca", bg: "#eef2ff" },
  MEETUP:     { label: "Meetup",        color: "#059669", bg: "#ecfdf5" },
  WEBINAR:    { label: "Webinaire",     color: "#0d9488", bg: "#f0fdfa" },
  SOCIAL:     { label: "Social",        color: "#db2777", bg: "#fdf2f8" },
  FUNDRAISER: { label: "Collecte",      color: "#e11d48", bg: "#fff1f2" },
  SPORTS:     { label: "Sports",        color: "#dc2626", bg: "#fef2f2" },
  ARTS:       { label: "Arts",          color: "#c026d3", bg: "#fdf4ff" },
  TECHNOLOGY: { label: "Technologie",   color: "#0891b2", bg: "#ecfeff" },
  BUSINESS:   { label: "Affaires",      color: "#d97706", bg: "#fffbeb" },
  EDUCATION:  { label: "Éducation",     color: "#65a30d", bg: "#f7fee7" },
  OTHER:      { label: "Autre",         color: "#6b7280", bg: "#f9fafb" },
};

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

const SkeletonCard = () => (
  <div
    style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  >
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style={{
          height: i === 1 ? "16px" : i === 2 ? "22px" : "14px",
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "6px",
          marginBottom: "12px",
          width: i === 2 ? "75%" : i === 3 ? "100%" : "40%",
        }}
      />
    ))}
  </div>
);

const EventListGrid = () => {
  const {
    data,
    total,
    isLoading,
    filterValues,
    setFilters,
    page,
    setPage,
    perPage,
  } = useListContext();

  const [search, setSearch] = useState(filterValues.q || "");
  const [category, setCategory] = useState(filterValues.category || "");
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  const totalEvents = total || 0;
  const sessionCount =
    data?.reduce(
      (acc: number, item: any) => acc + (item.sessions?.length || 0),
      0,
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
            notify(`Erreur lors de la suppression: ${error.message}`, {
              type: "error",
            });
          },
        },
      );
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters(
        {
          ...filterValues,
          q: search || undefined,
          category: category || undefined,
        },
        null,
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, category]);

  const totalPages = Math.ceil((total || 0) / perPage);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--txt-title)",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Gestion des Événements
          </h1>
          <p style={{ fontSize: "14px", color: "var(--txt-secondary)", margin: "4px 0 0" }}>
            Planifiez, modifiez et suivez vos sessions d'événements.
          </p>
        </div>
        <Link
          to="/events/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            backgroundColor: "var(--btn-primary)",
            color: "var(--btn-primary-txt)",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(205, 91, 50, 0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--btn-primary-hover)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(205, 91, 50, 0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--btn-primary)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(205, 91, 50, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Plus size={16} />
          Créer un événement
        </Link>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {[
          { label: "Total Événements", value: totalEvents, icon: <Layers size={20} />, iconBg: "rgba(205, 91, 50, 0.1)", iconColor: "var(--btn-primary)" },
          { label: "Total Sessions",   value: sessionCount,   icon: <Clock size={20} />,   iconBg: "rgba(37, 99, 235, 0.1)",   iconColor: "#2563eb" },
          { label: "Catégories Actives", value: categoriesCount, icon: <Info size={20} />, iconBg: "rgba(124, 58, 237, 0.1)", iconColor: "#7c3aed" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--txt-secondary)",
                  marginBottom: "6px",
                }}
              >
                {kpi.label}
              </span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--txt-title)",
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </span>
            </div>
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: kpi.iconBg,
                color: kpi.iconColor,
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
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
              color: "var(--txt-disabled)",
            }}
          />
          <input
            type="text"
            placeholder="Rechercher par titre, description ou lieu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "38px",
              paddingRight: "16px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--bg-subtle)",
              color: "var(--txt-title)",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--btn-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(205, 91, 50, 0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
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
            border: "1.5px solid var(--border)",
            backgroundColor: "var(--bg-subtle)",
            color: "var(--txt-title)",
            fontSize: "14px",
            outline: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            minWidth: "200px",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--btn-primary)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
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

      {/* Event Cards Grid */}
      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !data || data.length === 0 ? (
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px dashed var(--border)",
            borderRadius: "20px",
            padding: "64px 24px",
            textAlign: "center",
          }}
        >
          <Layers
            size={48}
            style={{ margin: "0 auto 16px", color: "var(--txt-disabled)" }}
          />
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--txt-title)", margin: "0 0 8px" }}>
            Aucun événement trouvé
          </h3>
          <p style={{ fontSize: "14px", color: "var(--txt-secondary)", maxWidth: "380px", margin: "0 auto 24px" }}>
            Essayez de modifier votre recherche ou créez un nouvel événement dès maintenant.
          </p>
          <Link
            to="/events/create"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              backgroundColor: "var(--btn-primary)",
              color: "var(--btn-primary-txt)",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Plus size={16} />
            Créer un événement
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {data.map((event: any) => {
            const cat = categoryMap[event.category] || categoryMap.OTHER;
            return (
              <div
                key={event.id}
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "var(--btn-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {/* Top color bar based on category */}
                <div
                  style={{
                    height: "4px",
                    backgroundColor: cat.color,
                    opacity: 0.7,
                  }}
                />
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Badge + ID */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backgroundColor: cat.bg,
                        color: cat.color,
                        border: `1px solid ${cat.color}22`,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {cat.label}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--txt-disabled)", fontWeight: 500 }}>
                      #{event.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--txt-title)",
                      marginBottom: "6px",
                      lineHeight: "1.3",
                    }}
                  >
                    {event.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--txt-secondary)",
                      marginBottom: "16px",
                      lineHeight: "1.55",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {event.description || "Aucune description fournie."}
                  </p>

                  {/* Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                    {[
                      { icon: <MapPin size={13} />, text: event.location },
                      { icon: <Calendar size={13} />, text: formatDate(event.startDate) },
                      {
                        icon: <Clock size={13} />,
                        text: `${event.sessions?.length || 0} session${(event.sessions?.length || 0) > 1 ? "s" : ""}`,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--txt-secondary)" }}
                      >
                        <span style={{ color: "var(--txt-disabled)", flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--border)",
                      marginTop: "auto",
                    }}
                  >
                    <div style={{ display: "flex", gap: "4px" }}>
                      {[
                        {
                          to: `/events/${event.id}/show`,
                          icon: <Eye size={15} />,
                          title: "Consulter",
                          hoverBg: "var(--bg-subtle)",
                          hoverColor: "var(--txt-title)",
                        },
                        {
                          to: `/events/${event.id}`,
                          icon: <Edit2 size={15} />,
                          title: "Modifier",
                          hoverBg: "var(--bg-subtle)",
                          hoverColor: "var(--txt-title)",
                        },
                      ].map((action) => (
                        <Link
                          key={action.to}
                          to={action.to}
                          title={action.title}
                          style={{
                            padding: "7px",
                            borderRadius: "8px",
                            color: "var(--txt-disabled)",
                            display: "flex",
                            transition: "all 0.2s",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = action.hoverBg;
                            e.currentTarget.style.color = action.hoverColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "var(--txt-disabled)";
                          }}
                        >
                          {action.icon}
                        </Link>
                      ))}
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        title="Supprimer"
                        style={{
                          padding: "7px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "transparent",
                          color: "var(--txt-disabled)",
                          cursor: "pointer",
                          display: "flex",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.08)";
                          e.currentTarget.style.color = "#dc2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--txt-disabled)";
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
                        color: "var(--btn-primary)",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Détails →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "12px 20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--txt-secondary)", margin: 0 }}>
            Affichage de{" "}
            <strong style={{ color: "var(--txt-title)" }}>
              {Math.min((page - 1) * perPage + 1, total || 0)}
            </strong>{" "}
            à{" "}
            <strong style={{ color: "var(--txt-title)" }}>
              {Math.min(page * perPage, total || 0)}
            </strong>{" "}
            sur{" "}
            <strong style={{ color: "var(--txt-title)" }}>{total}</strong>{" "}
            événements
          </p>
          <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
                border: "1.5px solid var(--border)",
                backgroundColor: "var(--bg-card)",
                color: page <= 1 ? "var(--txt-disabled)" : "var(--txt-secondary)",
                cursor: page <= 1 ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: "7px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid",
                  borderColor: p === page ? "var(--btn-primary)" : "var(--border)",
                  backgroundColor: p === page ? "var(--btn-primary)" : "var(--bg-card)",
                  color: p === page ? "var(--btn-primary-txt)" : "var(--txt-secondary)",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  minWidth: "36px",
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
                border: "1.5px solid var(--border)",
                backgroundColor: "var(--bg-card)",
                color: page >= totalPages ? "var(--txt-disabled)" : "var(--txt-secondary)",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              →
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export const EventList = () => (
  <List actions={false} pagination={false} component="div">
    <EventListGrid />
  </List>
);
