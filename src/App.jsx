import React from "react";

import MainSite from "./MainSite";
import MaintenancePage from "./components/MaintenancePage";
import DemoPage from "./components/DemoPage";


export default function App() {
  const MAINTENANCE_MODE = false;

  const path = window.location.pathname;

  // 데모 전용 페이지
  if (path === "/demo") {
    return <DemoPage />;
  }

  // 유지보수 모드
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  // 기존 메인 홈페이지
  return <MainSite />;
}