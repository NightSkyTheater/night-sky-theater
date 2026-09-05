$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path ".\src\App.jsx")) {
    Write-Host "src\App.jsx 파일을 찾을 수 없습니다." -ForegroundColor Red
    exit 1
}

if (Test-Path ".\src\MainSite.jsx") {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Copy-Item ".\src\MainSite.jsx" ".\src\MainSite.backup-$stamp.jsx"
}

Copy-Item ".\src\App.jsx" ".\src\MainSite.jsx" -Force

@'
import React from "react";
import MainSite from "./MainSite";
import MaintenancePage from "./components/MaintenancePage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const isPreview = path === "/nst-preview-2026";

  return isPreview ? <MainSite /> : <MaintenancePage />;
}
'@ | Set-Content ".\src\App.jsx" -Encoding UTF8

New-Item -ItemType Directory -Force ".\src\components" | Out-Null

Copy-Item ".\maintenance-files\MaintenancePage.jsx" ".\src\components\MaintenancePage.jsx" -Force

Write-Host ""
Write-Host "공사중 모드 적용 완료" -ForegroundColor Green
Write-Host "메인: /  -> 공사중 페이지"
Write-Host "프리뷰: /nst-preview-2026 -> 실제 홈페이지"
Write-Host ""
Write-Host "다음 명령으로 확인하세요:"
Write-Host "npm run build"
