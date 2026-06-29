import { useState } from "react";
import { useListContext, List } from "react-admin";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit2, Trash2, Sparkles } from "lucide-react";
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

  const [searchInput, setSearchInput] = useState(filterValues?.q || "");

  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  // ======================
  // PAGINATION
  // ======================
  const totalPages = Math.ceil((total || 0) / perPage);
  const currentPage = page || 1;

  // ======================
  // DELETE
  // ======================
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete room "${name}"?`)) {
      deleteOne(
        "rooms",
        { id },
        {
          onSuccess: () => {
            notify("Room deleted", { type: "info" });
            refresh();
          },
          onError: (err: any) => {
            notify(`Error: ${err.message}`, { type: "error" });
          },
        }
      );
    }
  };

  // ======================
  // SEARCH
  // ======================
  const handleSearch = () => {
    const value = searchInput.trim();
    setFilters(value ? { q: value } : {}, undefined, false);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      style={{ padding: 24, background: COLORS.background, minHeight: "100vh" }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <h1
          style={{
            color: "#fff",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Sparkles color={COLORS.primary} size={24} />
          Room Management
        </h1>

        <Link
          to="/rooms/create"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: COLORS.primary,
            padding: "10px 16px",
            borderRadius: 10,
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <Plus size={16} />
          Create
        </Link>
      </div>

      {/* TOTAL COUNT */}
      <p style={{ color: COLORS.text.muted, marginBottom: 20, marginTop: 4 }}>
        {total ?? 0} room{(total ?? 0) > 1 ? "s" : ""} total
      </p>

      {/* SEARCH */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search a room..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            background: "rgba(0,0,0,0.3)",
            border: "1px solid #333",
            color: "#fff",
            outline: "none",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 14px",
            background: COLORS.primary,
            borderRadius: 10,
            border: "none",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* GRID */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            color: COLORS.text.muted,
          }}
        >
          Loading...
        </div>
      ) : !data || data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: COLORS.text.muted,
          }}
        >
          <p style={{ fontSize: 16 }}>No rooms found.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {data.map((room: any) => (
            <div
              key={room.id}
              style={{
                background: COLORS.darkCard,
                border: `1px solid ${COLORS.darkBorder}`,
                padding: 20,
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Icon + Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    padding: 8,
                    borderRadius: 10,
                    backgroundColor: "rgba(234, 88, 12, 0.12)",
                    border: "1px solid rgba(234, 88, 12, 0.25)",
                    display: "flex",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {room.name}
                </h3>
              </div>

              {/* Subtle ID */}
              <p style={{ color: COLORS.text.muted, fontSize: 12, margin: 0 }}>
                ID: {room.id}
              </p>

              {/* ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  borderTop: `1px solid ${COLORS.darkBorder}`,
                  paddingTop: 12,
                }}
              >
                <Link
                  to={`/rooms/${room.id}/show`}
                  title="View"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  <Eye size={14} />
                  View
                </Link>

                <Link
                  to={`/rooms/${room.id}`}
                  title="Edit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: "rgba(234, 88, 12, 0.1)",
                    border: "1px solid rgba(234, 88, 12, 0.2)",
                    color: COLORS.primary,
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  <Edit2 size={14} />
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(room.id, room.name)}
                  title="Delete"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Prev button */}
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: currentPage === 1 ? COLORS.text.muted : "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: `1px solid ${p === currentPage ? COLORS.primary : "#333"}`,
                background: p === currentPage ? COLORS.primary : "transparent",
                color: "#fff",
                fontWeight: p === currentPage ? 700 : 400,
                cursor: "pointer",
                minWidth: 36,
              }}
            >
              {p}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: currentPage === totalPages ? COLORS.text.muted : "#fff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p
          style={{
            textAlign: "center",
            color: COLORS.text.muted,
            fontSize: 13,
            marginTop: 12,
          }}
        >
          Page {currentPage} of {totalPages} — {total} rooms
        </p>
      )}
    </div>
  );
};

export const RoomList = () => (
  <List actions={false} pagination={false} perPage={12}>
    <RoomListGrid />
  </List>
);