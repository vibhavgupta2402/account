import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/dashboard.css";
import "../styles/style.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} />
      <Topbar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
      />
      <Outlet context={{ collapsed }} />
    </>
  );
}
