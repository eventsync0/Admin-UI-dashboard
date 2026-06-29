import { useState, useEffect } from "react";
import { List, useListContext, useDelete, useNotify, useRefresh } from "react-admin";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Edit2, Trash2, Calendar, Users, MapPin, Clock, Sparkles } from "lucide-react";

const COLORS = {
  primary: "#ea580c",
  primaryGlow: "rgba(234, 88, 12, 0.25)",
  background: "#0B0B14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)", muted: "rgba(255,255,255,0.5)" },
  error: "#ef4444",
  success: "#4ade80",
  kpiColors: ["#ea580c"],
};

const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { 
  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" 
});

const SessionGrid = () => {
  const { data, total, isLoading, filterValues, setFilters, page, setPage } = useListContext();
  const [search, setSearch] = useState(filterValues.q || "");
  const [searchFocused, setSearchFocused] = useState(false);
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      setFilters({ q: search || undefined }, {});
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Supprimer la session "${title}" ?`)) {
      deleteOne("sessions", { id }, {
        onSuccess: () => { notify("Session supprimée", { type: "success" }); refresh(); },
        onError: () => notify("Erreur", { type: "error" }),
      });
    }
  };

  const items = data || [];

  // Filtre côté client en filet de sécurité : si le dataProvider ignore le
  // filtre "q" envoyé au serveur, on filtre quand même ce qui est affiché.
  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((s: any) =>
        s.title?.toLowerCase().includes(normalizedSearch) ||
        s.description?.toLowerCase().includes(normalizedSearch) ||
        s.room?.name?.toLowerCase().includes(normalizedSearch)
      )
    : items;

  const totalSessions = total || 0;
  const roomsCount = new Set(items.map((s: any) => s.roomId)).size;
  const speakersCount = items.reduce((acc: number, s: any) => acc + (s.speakers?.length || 0), 0);

  const effectiveTotal = normalizedSearch ? filteredItems.length : (total || 0);
  const totalPages = Math.ceil(effectiveTotal / 12);
  const currentPage = page || 1;
  const start = (currentPage - 1) * 12;
  const currentData = filteredItems.slice(start, start + 12);

  const kpis = [
    { label: "Total", value: totalSessions, icon: <Sparkles size={18} />, color: COLORS.kpiColors[0] },
    { label: "Salles", value: roomsCount, icon: <MapPin size={18} />, color: COLORS.kpiColors[0] },
    { label: "Intervenants", value: speakersCount, icon: <Users size={18} />, color: COLORS.kpiColors[0] },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh", backgroundColor: COLORS.background }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: COLORS.text.primary }}>Sessions</h1>
          <p style={{ fontSize: 14, color: COLORS.text.secondary }}>Gérez toutes les sessions</p>
        </div>
        <Link to="/sessions/create" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
          borderRadius: 10, background: COLORS.primary, color: "#fff",
          fontWeight: 600, textDecoration: "none"
        }}>
          <Plus size={18} /> Nouvelle session
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ 
            backgroundColor: COLORS.card, 
            borderRadius: 12, 
            padding: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: COLORS.text.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text.primary }}>
                  {kpi.value}
                </div>
              </div>
              <div style={{ 
                padding: 10, 
                borderRadius: 10, 
                background: `${kpi.color}25`,
                color: kpi.color,
              }}>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? COLORS.primary : COLORS.text.muted, transition: "color 0.2s" }} />
          <input
            type="text" placeholder="Rechercher une session..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: "100%", padding: "10px 16px 10px 40px", borderRadius: 10,
              background: COLORS.card,
              border: `1px solid ${searchFocused ? COLORS.primary : "transparent"}`,
              boxShadow: searchFocused ? `0 0 0 3px ${COLORS.primaryGlow}` : "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              color: COLORS.text.primary, fontSize: 14, outline: "none"
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ backgroundColor: COLORS.card, borderRadius: 12, padding: 20, height: 120 }} />
          ))}
        </div>
      ) : currentData.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: COLORS.text.muted }}>Aucune session</div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {currentData.map((session: any, index: number) => {
              const colors = ["#ea580c"];
              const color = colors[index % colors.length];
              
              return (
                <div key={session.id} style={{
                  backgroundColor: COLORS.card, 
                  borderRadius: 12, 
                  padding: 16, 
                  transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text.primary, margin: 0 }}>
                      {session.title}
                    </h3>
                    <span style={{ 
                      fontSize: 11, 
                      color: COLORS.text.muted, 
                      background: `${color}25`,
                      padding: "2px 10px", 
                      borderRadius: 12,
                    }}>
                      {session.room?.name || "Salle"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: COLORS.text.secondary, margin: "4px 0 12px" }}>
                    {session.description?.slice(0, 80) || "Aucune description"}
                  </p>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.text.muted, marginBottom: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} color={color} /> {formatDate(session.startTime)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={14} color={color} /> {session.capacity || 0}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, paddingTop: 12 }}>
                    <Link to={`/sessions/${session.id}/show`} style={{ padding: "4px 8px", color: COLORS.text.muted }}><Eye size={16} /></Link>
                    <Link to={`/sessions/${session.id}`} style={{ padding: "4px 8px", color: COLORS.text.muted }}><Edit2 size={16} /></Link>
                    <button onClick={() => handleDelete(session.id, session.title)} style={{ padding: "4px 8px", background: "none", border: "none", color: COLORS.text.muted, cursor: "pointer" }}><Trash2 size={16} /></button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, padding: "12px 0" }}>
              <span style={{ fontSize: 13, color: COLORS.text.muted }}>{start + 1} – {Math.min(start + 12, effectiveTotal)} sur {effectiveTotal}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} style={{ padding: "6px 14px", borderRadius: 6, background: "transparent", color: currentPage <= 1 ? COLORS.text.muted : COLORS.text.secondary, cursor: "pointer" }}>←</button>
                <span style={{ padding: "6px 14px", color: COLORS.text.primary }}>{currentPage} / {totalPages}</span>
                <button onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages} style={{ padding: "6px 14px", borderRadius: 6, background: "transparent", color: currentPage >= totalPages ? COLORS.text.muted : COLORS.text.secondary, cursor: "pointer" }}>→</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const SessionList = () => (
  <List actions={false} pagination={false} component="div" perPage={12}>
    <SessionGrid />
  </List>
);