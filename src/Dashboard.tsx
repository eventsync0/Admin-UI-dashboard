
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

const PIE_COLORS = [
  "#cd5b32",
  "#d77c5b",
  "#ebbdad",
  "#a44928",
  "#7b371e",
  "#e19d84",
  "#522414",
];

// === STATS CARD ===
const StatsCard = React.memo(
  ({ title, value, icon: Icon, color, change, trend, loading }: any) => (
    <Card
      sx={{
        backgroundColor: COLORS.coffee[900],
        borderRadius: "1.25rem",
        border: `1px solid ${COLORS.coffee[800]}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        height: "100%",
        "&:hover": {
          borderColor: COLORS.coffee[500],
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(205, 91, 50, 0.15)",
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
                color: COLORS.coffee[300],
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
                    bgcolor: COLORS.coffee[800],
                    height: 6,
                    borderRadius: 3,
                  }}
                />
                <LinearProgress
                  sx={{
                    bgcolor: COLORS.coffee[800],
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
                  sx={{ color: COLORS.coffee[50], fontWeight: 700, mt: 0.5 }}
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
                      sx={{ color: COLORS.coffee[400] }}
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
      }}
    >
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
              fontFamily: "Audiowide, cursive",
              color: COLORS.coffee[50],
              fontWeight: 400,
              letterSpacing: "0.03em",
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.coffee[300],
              fontFamily: "Quicksand, sans-serif",
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
              bgcolor: COLORS.coffee[800],
              color: COLORS.coffee[200],
              border: `1px solid ${COLORS.coffee[700]}`,
            }}
          />
          <IconButton
            onClick={refresh}
            disabled={refreshing}
            sx={{
              bgcolor: COLORS.coffee[800],
              color: COLORS.coffee[200],
              "&:hover": { bgcolor: COLORS.coffee[700] },
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
          color={COLORS.coffee[400]}
          loading={loading}
        />
        <StatsCard
          title="Speakers"
          value={formatNumber(stats.totalSpeakers)}
          icon={People}
          color={COLORS.coffee[500]}
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
          color={COLORS.coffee[300]}
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
            bgcolor: COLORS.coffee[900],
            border: `1px solid ${COLORS.coffee[800]}`,
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
                fontFamily: "Audiowide, cursive",
                color: COLORS.coffee[50],
              }}
            >
              Recent Events
            </Typography>
            <Chip
              label="View All"
              size="small"
              sx={{
                bgcolor: COLORS.coffee[800],
                color: COLORS.coffee[200],
                cursor: "pointer",
                "&:hover": { bgcolor: COLORS.coffee[700] },
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
                      bgcolor: COLORS.coffee[800],
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
                      bgcolor: `${COLORS.coffee[800]}40`,
                      borderRadius: 2,
                      px: 1,
                      mx: -1,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: COLORS.coffee[800],
                      color: COLORS.coffee[400],
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
                      sx={{ fontWeight: 500, color: COLORS.coffee[50] }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.coffee[400], fontSize: "0.75rem" }}
                    >
                      {event.location} •{" "}
                      {new Date(event.startDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip
                    label={event.category || "OTHER"}
                    size="small"
                    sx={{
                      bgcolor: `${COLORS.coffee[500]}20`,
                      color: COLORS.coffee[400],
                      fontSize: "0.6rem",
                      height: 20,
                      flexShrink: 0,
                    }}
                  />
                </Box>
                {index < recentEvents.length - 1 && (
                  <Divider sx={{ borderColor: COLORS.coffee[800] }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <Typography
              sx={{ color: COLORS.coffee[400], textAlign: "center", py: 4 }}
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
              bgcolor: COLORS.coffee[900],
              border: `1px solid ${COLORS.coffee[800]}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Audiowide, cursive",
                color: COLORS.coffee[50],
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
                      backgroundColor: COLORS.coffee[900],
                      border: `1px solid ${COLORS.coffee[800]}`,
                      borderRadius: 8,
                      color: COLORS.coffee[50],
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
                <Typography sx={{ color: COLORS.coffee[400] }}>
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
              bgcolor: COLORS.coffee[900],
              border: `1px solid ${COLORS.coffee[800]}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Audiowide, cursive",
                color: COLORS.coffee[50],
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
                  bgcolor: `${COLORS.coffee[800]}40`,
                  border: `1px solid ${COLORS.coffee[800]}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.coffee[400], textTransform: "uppercase" }}
                >
                  Upcoming
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: COLORS.coffee[50], fontWeight: 700 }}
                >
                  {loading ? "..." : stats.upcomingEvents}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "1rem",
                  bgcolor: `${COLORS.coffee[800]}40`,
                  border: `1px solid ${COLORS.coffee[800]}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.coffee[400], textTransform: "uppercase" }}
                >
                  Past Events
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: COLORS.coffee[50], fontWeight: 700 }}
                >
                  {loading ? "..." : pastEvents}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "1rem",
                  bgcolor: `${COLORS.coffee[800]}40`,
                  border: `1px solid ${COLORS.coffee[800]}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.coffee[400], textTransform: "uppercase" }}
                >
                  Questions
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: COLORS.coffee[50], fontWeight: 700 }}
                >
                  {loading ? "..." : formatNumber(stats.totalQuestions)}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "1rem",
                  bgcolor: `${COLORS.coffee[800]}40`,
                  border: `1px solid ${COLORS.coffee[800]}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.coffee[400], textTransform: "uppercase" }}
                >
                  Capacity
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: COLORS.coffee[50], fontWeight: 700 }}
                >
                  {loading ? "..." : formatNumber(stats.totalCapacity)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
