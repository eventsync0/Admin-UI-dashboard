// pages/Dashboard.tsx
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import {
  CalendarToday,
  People,
  LocationOn,
  ArrowUpward,
  ArrowDownward,
  Refresh,
  EventNote,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useStats } from "./hooks/useStats";

// === COULEURS ORANGE ===
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

const PIE_COLORS = [
  "#ea580c",
  "#f97316",
  "#d94a00",
  "#fdba74",
  "#c2410c",
  "#f59e0b",
  "#9a3412",
];

// === STATS CARD ===
const StatsCard = React.memo(
  ({ title, value, icon: Icon, color, change, trend, loading }: any) => (
    <Card
      sx={{
        backgroundColor: COLORS.darkCard,
        borderRadius: "1.25rem",
        border: `1px solid ${COLORS.darkBorder}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        height: "100%",
        "&:hover": {
          borderColor: COLORS.primary,
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(234, 88, 12, 0.15)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.text.muted,
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.08em",
                fontSize: "0.65rem",
              }}
            >
              {title}
            </Typography>
            {loading ? (
              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  sx={{
                    bgcolor: COLORS.darkBorder,
                    height: 6,
                    borderRadius: 3,
                  }}
                />
                <LinearProgress
                  sx={{
                    bgcolor: COLORS.darkBorder,
                    height: 6,
                    borderRadius: 3,
                    mt: 1,
                  }}
                />
              </Box>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{ color: COLORS.text.primary, fontWeight: 700, mt: 0.5 }}
                >
                  {value}
                </Typography>
                {change && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    {trend === "up" ? (
                      <ArrowUpward
                        sx={{ fontSize: 14, color: COLORS.success }}
                      />
                    ) : (
                      <ArrowDownward
                        sx={{ fontSize: 14, color: COLORS.error }}
                      />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        color: trend === "up" ? COLORS.success : COLORS.error,
                        fontWeight: 600,
                      }}
                    >
                      {change}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: COLORS.text.muted }}
                    >
                      vs last month
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}15`,
              color: color,
              width: 48,
              height: 48,
              flexShrink: 0,
            }}
          >
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  ),
);

StatsCard.displayName = "StatsCard";

// === DASHBOARD ===
const Dashboard: React.FC = () => {
  const {
    loading,
    refreshing,
    stats,
    recentEvents,
    categoryData,
    formatNumber,
    pastEvents,
    refresh,
  } = useStats();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      {/* GLOW EFFECT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: COLORS.text.primary,
                fontWeight: 700,
                letterSpacing: "0.03em",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.text.secondary,
              }}
            >
              Welcome back! Here's what's happening with your events.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label="Last 30 days"
              size="small"
              sx={{
                bgcolor: COLORS.darkCard,
                color: COLORS.text.secondary,
                border: `1px solid ${COLORS.darkBorder}`,
              }}
            />
            <IconButton
              onClick={refresh}
              disabled={refreshing}
              sx={{
                bgcolor: COLORS.darkCard,
                color: COLORS.text.secondary,
                "&:hover": { bgcolor: COLORS.primaryGlow, color: COLORS.primary },
              }}
            >
              <Refresh className={refreshing ? "animate-spin" : ""} />
            </IconButton>
          </Box>
        </Box>

        {/* STATS CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
            width: "100%",
          }}
        >
          <StatsCard
            title="Total Events"
            value={formatNumber(stats.totalEvents)}
            icon={CalendarToday}
            color={COLORS.primary}
            loading={loading}
          />
          <StatsCard
            title="Speakers"
            value={formatNumber(stats.totalSpeakers)}
            icon={People}
            color={COLORS.primary}
            loading={loading}
          />
          <StatsCard
            title="Live Events"
            value={stats.liveEvents}
            icon={EventNote}
            color={COLORS.success}
            change={stats.liveEvents > 0 ? `${stats.liveEvents} now` : undefined}
            trend="up"
            loading={loading}
          />
          <StatsCard
            title="Cities"
            value={stats.totalCities}
            icon={LocationOn}
            color={COLORS.primary}
            loading={loading}
          />
        </Box>

        {/* RECENT EVENTS & CATEGORIES */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            gap: 3,
            width: "100%",
          }}
        >
          {/* RECENT EVENTS */}
          <Paper
            sx={{
              p: 3,
              borderRadius: "1.25rem",
              bgcolor: COLORS.darkCard,
              border: `1px solid ${COLORS.darkBorder}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                }}
              >
                Recent Events
              </Typography>
              <Chip
                label="View All"
                size="small"
                sx={{
                  bgcolor: COLORS.darkCard,
                  color: COLORS.text.secondary,
                  cursor: "pointer",
                  border: `1px solid ${COLORS.darkBorder}`,
                  "&:hover": { bgcolor: COLORS.primaryGlow, color: COLORS.primary },
                }}
                onClick={() => (window.location.href = "/#/events")}
              />
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2, 3, 4].map((_, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", gap: 2, alignItems: "center" }}
                  >
                    <LinearProgress
                      sx={{
                        bgcolor: COLORS.darkBorder,
                        height: 6,
                        borderRadius: 3,
                        flex: 1,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            ) : recentEvents.length > 0 ? (
              recentEvents.map((event: any, index: number) => (
                <React.Fragment key={event.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: `${COLORS.darkBorder}40`,
                        borderRadius: 2,
                        px: 1,
                        mx: -1,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: COLORS.darkBorder,
                        color: COLORS.primary,
                        width: 40,
                        height: 40,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {event.title?.charAt(0) || "E"}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: COLORS.text.primary }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: COLORS.text.muted, fontSize: "0.75rem" }}
                      >
                        {event.location} •{" "}
                        {new Date(event.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={event.category || "OTHER"}
                      size="small"
                      sx={{
                        bgcolor: `${COLORS.primary}20`,
                        color: COLORS.primary,
                        fontSize: "0.6rem",
                        height: 20,
                        flexShrink: 0,
                      }}
                    />
                  </Box>
                  {index < recentEvents.length - 1 && (
                    <Divider sx={{ borderColor: COLORS.darkBorder }} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography
                sx={{ color: COLORS.text.muted, textAlign: "center", py: 4 }}
              >
                No recent events found
              </Typography>
            )}
          </Paper>

          {/* RIGHT COLUMN */}
          <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 3 }}>
            {/* CATEGORY PIE CHART */}
            <Paper
              sx={{
                p: 3,
                borderRadius: "1.25rem",
                bgcolor: COLORS.darkCard,
                border: `1px solid ${COLORS.darkBorder}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Events by Category
              </Typography>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: COLORS.darkCard,
                        border: `1px solid ${COLORS.darkBorder}`,
                        borderRadius: 8,
                        color: COLORS.text.primary,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 220,
                  }}
                >
                  <Typography sx={{ color: COLORS.text.muted }}>
                    No data available
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* QUICK STATS */}
            <Paper
              sx={{
                p: 3,
                borderRadius: "1.25rem",
                bgcolor: COLORS.darkCard,
                border: `1px solid ${COLORS.darkBorder}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Quick Stats
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "1rem",
                    bgcolor: `${COLORS.darkBorder}40`,
                    border: `1px solid ${COLORS.darkBorder}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.text.muted, textTransform: "uppercase" }}
                  >
                    Upcoming
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: COLORS.text.primary, fontWeight: 700 }}
                  >
                    {loading ? "..." : stats.upcomingEvents}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "1rem",
                    bgcolor: `${COLORS.darkBorder}40`,
                    border: `1px solid ${COLORS.darkBorder}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.text.muted, textTransform: "uppercase" }}
                  >
                    Past Events
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: COLORS.text.primary, fontWeight: 700 }}
                  >
                    {loading ? "..." : pastEvents}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "1rem",
                    bgcolor: `${COLORS.darkBorder}40`,
                    border: `1px solid ${COLORS.darkBorder}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.text.muted, textTransform: "uppercase" }}
                  >
                    Questions
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: COLORS.text.primary, fontWeight: 700 }}
                  >
                    {loading ? "..." : formatNumber(stats.totalQuestions)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "1rem",
                    bgcolor: `${COLORS.darkBorder}40`,
                    border: `1px solid ${COLORS.darkBorder}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.text.muted, textTransform: "uppercase" }}
                  >
                    Capacity
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: COLORS.text.primary, fontWeight: 700 }}
                  >
                    {loading ? "..." : formatNumber(stats.totalCapacity)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;