import React from "react";

import MainSite from "./MainSite";
import MaintenancePage from "./components/MaintenancePage";

export default function App() {
  const MAINTENANCE_MODE = false;

  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return <MainSite />;
}