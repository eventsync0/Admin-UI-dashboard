import { useState, useEffect } from "react";
import { useListContext, List } from "react-admin";
import { Link } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Layers,
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useDelete, useNotify, useRefresh } from "react-admin";

// === TYPE MAP ===
const typeMap: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  MEETING: { label: "Meeting", color: "#2563eb", bg: "#eff6ff" },
  CONFERENCE: { label: "Conférence", color: "#7c3aed", bg: "#f5f3ff" },
  WORKSHOP: { label: "Atelier", color: "#059669", bg: "#ecfdf5" },
  OTHER: { label: "Autre", color: "#6b7280", bg: "#f9fafb" },
};

// === COLORS ===
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

const RoomListGrid = () => {
  const { data, total, isLoading, filterValues, setFilters, page, setPage } =
    useListContext();

  const [search, setSearch] = useState(filterValues.q || "");
  const [type, setType] = useState(filterValues.type || "");

  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  const ITEMS_PER_PAGE = 12;

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Supprimer la salle "${name}" ?`)) {
      deleteOne(
        "rooms",
        { id },
        {
          onSuccess: () => {
            notify("Salle supprimée", { type: "info" });
            refresh();
          },
          onError: (err: any) => {
            notify(`Erreur: ${err.message}`, { type: "error" });
          },
        }
      );
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters({
        ...filterValues,
        q: search || undefined,
        type: type || undefined,
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [search, type]);

  const totalRooms = total || 0;
  const totalCapacity =
    data?.reduce((acc: number, r: any) => acc + (r.capacity || 0), 0) || 0;

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
      {/* BACKGROUND */}
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
            background:
              "radial-gradient(circle, rgba(234,88,12,0.25), transparent 60%)",
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
              Gestion des Salles
            </h1>
            <p style={{ color: COLORS.text.secondary, fontSize: "14px" }}>
              Gérez vos rooms et leurs capacités.
            </p>
          </div>

          <Link
            to="/rooms/create"
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
            }}
          >
            <Plus size={16} /> Créer une salle
          </Link>
        </div>

        {/* KPI */}
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
              label: "Total salles",
              value: totalRooms,
              icon: <Home size={20} />,
              color: COLORS.primary,
            },
            {
              label: "Capacité totale",
              value: totalCapacity,
              icon: <Users size={20} />,
              color: "#38bdf8",
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
              }}
            >
              <div>
                <div style={{ fontSize: "11px", color: COLORS.text.muted }}>
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: COLORS.text.primary,
                  }}
                >
                  {kpi.value}
                </div>
              </div>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: `${kpi.color}20`,
                  color: kpi.color,
                }}
              >
                {kpi.icon}
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une salle..."
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: `1px solid ${COLORS.darkBorder}`,
                color: "#fff",
              }}
            />
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "#fff",
              border: `1px solid ${COLORS.darkBorder}`,
            }}
          >
            <option value="">Tous les types</option>
            {Object.entries(typeMap).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        {/* GRID */}
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
                  height: "140px",
                  backgroundColor: COLORS.darkCard,
                  border: `1px solid ${COLORS.darkBorder}`,
                  borderRadius: "16px",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {data?.slice(0, 12).map((room: any) => {
              const t = typeMap[room.type] || typeMap.OTHER;

              return (
                <div
                  key={room.id}
                  style={{
                    backgroundColor: COLORS.darkCard,
                    border: `1px solid ${COLORS.darkBorder}`,
                    borderRadius: "18px",
                    padding: "18px",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      height: "4px",
                      backgroundColor: t.color,
                      marginBottom: "12px",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor: t.bg,
                      color: t.color,
                    }}
                  >
                    {t.label}
                  </span>

                  <h3 style={{ color: "#fff", marginTop: "10px" }}>
                    {room.name}
                  </h3>

                  <p style={{ color: COLORS.text.secondary, fontSize: "13px" }}>
                    📍 {room.location}
                  </p>

                  <p style={{ color: COLORS.text.secondary, fontSize: "13px" }}>
                    👥 Capacité: {room.capacity}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link to={`/rooms/${room.id}`}>
                        <Eye size={16} />
                      </Link>
                      <Link to={`/rooms/${room.id}`}>
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(room.id, room.name)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <Link to={`/rooms/${room.id}`}>Détails →</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const RoomList = () => (
  <List actions={false} pagination={false} perPage={12}>
    <RoomListGrid />
  </List>
);