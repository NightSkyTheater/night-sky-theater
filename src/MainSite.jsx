import React from "react";
import MainSite from "./MainSite";
import MaintenancePage from "./components/MaintenancePage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const isPreview = path === "/nst-preview-2026";

  return isPreview ? <MainSite /> : <MaintenancePage />;
}
