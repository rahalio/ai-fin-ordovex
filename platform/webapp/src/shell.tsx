import { Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { clearSession, getDisplayName, getRole, getToken } from './api';

const NAV: Array<{ to: string; label: string; roles?: string[] }> = [
  { to: '/home', label: 'Desk risk', roles: ['desk_head', 'admin', 'market_risk'] },
  { to: '/strategies', label: 'Strategies', roles: ['quant', 'desk_head', 'admin', 'market_risk'] },
  { to: '/certifications', label: 'Certification', roles: ['quant', 'market_risk', 'admin', 'desk_head'] },
  { to: '/limits', label: 'Limits', roles: ['market_risk', 'admin', 'desk_head'] },
  { to: '/pretrade', label: 'Pre-trade', roles: ['desk_head', 'market_risk', 'sre', 'admin'] },
  { to: '/telemetry', label: 'Telemetry', roles: ['market_risk', 'desk_head', 'admin'] },
  { to: '/kills', label: 'Kill switches', roles: ['desk_head', 'market_risk', 'conduct', 'sre', 'admin'] },
  { to: '/concentration', label: 'Crowded signals', roles: ['market_risk', 'admin'] },
  { to: '/incidents', label: 'Incidents', roles: ['conduct', 'admin', 'market_risk'] },
  { to: '/health', label: 'Control plane', roles: ['sre', 'admin', 'desk_head'] },
];

export function roleHome(role: string) {
  switch (role) {
    case 'quant':
      return '/strategies';
    case 'market_risk':
      return '/limits';
    case 'conduct':
      return '/incidents';
    case 'sre':
      return '/health';
    case 'admin':
      return '/home';
    default:
      return '/home';
  }
}

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function Shell() {
  const role = getRole();
  const loc = useLocation();
  const links = NAV.filter((n) => !n.roles || n.roles.includes(role) || role === 'admin');
  return (
    <div className="shell">
      <nav className="nav">
        <div className="brand">Ordovex</div>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={loc.pathname.startsWith(l.to) ? 'active' : ''}>
            {l.label}
          </NavLink>
        ))}
        <div className="nav-meta">
          {getDisplayName()} · {role}
        </div>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            clearSession();
            window.location.href = '/login';
          }}
        >
          Sign out
        </button>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
