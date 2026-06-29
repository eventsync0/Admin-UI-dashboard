import { useState, useEffect } from "react";
import { useListContext, List } from "react-admin";
import { Link } from "react-router-dom";
import { Home, Plus, Eye, Edit2, Trash2, Sparkles } from "lucide-react";
import { useDelete, useNotify, useRefresh } from "react-admin";

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
      setFilters({ ...filterValues, q: search || undefined });
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const totalRooms = total || 0;
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
              Room Management
            </h1>
            <p style={{ color: COLORS.text.secondary, fontSize: "14px" }}>
              Manage your rooms.
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
            <Plus size={16} /> Create a room
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
          <div
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
                Total salles
              </div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: COLORS.text.primary,
                }}
              >
                {totalRooms}
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: `${COLORS.primary}20`,
                color: COLORS.primary,
              }}
            >
              <Home size={20} />
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div style={{ marginBottom: "24px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une salle..."
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 14px",
              borderRadius: "10px",
              backgroundColor: "rgba(0,0,0,0.2)",
              border: `1px solid ${COLORS.darkBorder}`,
              color: "#fff",
              boxSizing: "border-box",
            }}
          />
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
                  height: "100px",
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
            {data?.slice(0, ITEMS_PER_PAGE).map((room: any) => (
              <div
                key={room.id}
                style={{
                  backgroundColor: COLORS.darkCard,
                  border: `1px solid ${COLORS.darkBorder}`,
                  borderRadius: "18px",
                  padding: "18px",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    height: "3px",
                    borderRadius: "2px",
                    backgroundColor: COLORS.primary,
                  }}
                />

                <h3
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  {room.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <Link
                      to={`/rooms/${room.id}/show`}
                      title="Voir"
                      style={{ color: COLORS.text.secondary, display: "flex" }}
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/rooms/${room.id}`}
                      title="Modifier"
                      style={{ color: COLORS.text.secondary, display: "flex" }}
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(room.id, room.name)}
                      title="Supprimer"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#ef4444",
                        display: "flex",
                        padding: 0,
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Link
                    to={`/rooms/${room.id}/show`}
                    style={{
                      color: COLORS.primary,
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Détails →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${p === currentPage ? COLORS.primary : COLORS.darkBorder}`,
                  backgroundColor:
                    p === currentPage ? `${COLORS.primary}20` : "transparent",
                  color: p === currentPage ? COLORS.primary : COLORS.text.secondary,
                  cursor: "pointer",
                  fontWeight: p === currentPage ? 700 : 400,
                }}
              >
                {p}
              </button>
            ))}
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