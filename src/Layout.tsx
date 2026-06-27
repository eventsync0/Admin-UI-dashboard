import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, AppBar, UserMenu, Menu, Sidebar } from "react-admin";
import { Coffee, Calendar, Users, Settings, Bell, LogOut } from "lucide-react";

// Custom AppBar
const CustomAppBar = (props: any) => (
  <AppBar
    {...props}
    className="border-b border-border shadow-lg bg-bg-card"
    style={{
      backgroundColor: "var(--bg-card)",
      color: "var(--txt-body)",
    }}
  >
    <div className="flex justify-between items-center w-full px-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-bg-subtle">
          <Coffee className="w-5 h-5 text-coffee-600" />
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight text-txt-title">
            EventSync
          </span>
          <span className="ml-2 text-xs font-medium text-txt-secondary bg-bg-subtle px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl hover:bg-bg-subtle transition-colors relative">
          <Bell className="w-5 h-5 text-txt-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        <button className="p-2 rounded-xl hover:bg-bg-subtle transition-colors">
          <Settings className="w-5 h-5 text-txt-secondary" />
        </button>
        <UserMenu />
      </div>
    </div>
  </AppBar>
);

// Custom Menu
const CustomMenu = (props: any) => (
  <Menu {...props}>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="events" />
    <Menu.ResourceItem name="sessions" />
    <Menu.ResourceItem name="speakers" />
    <Menu.ResourceItem name="rooms" />
    <Menu.ResourceItem name="questions" />
    <Menu.ResourceItem name="admins" />
  </Menu>
);

// Custom Sidebar
const CustomSidebar = (props: any) => (
  <Sidebar
    {...props}
    className="bg-bg-card border-r border-border"
    style={{
      backgroundColor: "var(--bg-card)",
    }}
  />
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={CustomAppBar}
    sidebar={CustomSidebar}
    menu={CustomMenu}
    className="bg-background"
    style={{
      backgroundColor: "var(--background)",
    }}
  >
    {/* Décoration de fond */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] rounded-full border-4 border-coffee-400/10 dark:border-coffee-500/5 animate-spin-slow" />
      <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] rounded-full border-4 border-coffee-500/10 dark:border-coffee-400/5 animate-spin-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-radial from-coffee-400/5 via-coffee-500/5 to-transparent blur-2xl" />
    </div>

    {/* Contenu principal */}
    <div className="relative z-10">
      <div className="m-4 p-6 min-h-[calc(100vh-120px)] bg-bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300">
        {children}
        <CheckForApplicationUpdate />
      </div>
    </div>
  </RALayout>
);