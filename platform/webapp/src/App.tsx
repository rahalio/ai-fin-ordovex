import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, Shell } from './shell';
import {
  CertificationsPage,
  ConcentrationPage,
  DeskHomePage,
  HealthPage,
  HomeRedirect,
  IncidentsPage,
  KillsPage,
  LimitsPage,
  LoginPage,
  PreTradePage,
  StrategiesPage,
  TelemetryPage,
} from './pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Shell />}>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/home" element={<DeskHomePage />} />
            <Route path="/strategies" element={<StrategiesPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/limits" element={<LimitsPage />} />
            <Route path="/pretrade" element={<PreTradePage />} />
            <Route path="/telemetry" element={<TelemetryPage />} />
            <Route path="/kills" element={<KillsPage />} />
            <Route path="/concentration" element={<ConcentrationPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/health" element={<HealthPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
