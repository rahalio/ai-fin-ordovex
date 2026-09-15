import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, Envelope, ListEnvelope, setSession } from './api';
import { roleHome } from './shell';

function pct(n: number) {
  return `${Math.round(n * 1000) / 10}%`;
}

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('desk@demo.local');
  const [password, setPassword] = useState('sandbox-desk-8x');
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await api<Envelope<{ accessToken: string; operator: { role: string; displayName: string } }>>(
        '/v0/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) },
      );
      setSession(res.data.accessToken, res.data.operator.role, res.data.operator.displayName);
      nav(roleHome(res.data.operator.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }
  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="brand-hero">Ordovex</div>
      <h1>Certified limits. Seconds to kill.</h1>
      <p className="lede">Algo circuit breaker for the AI trading desk.</p>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="primary" type="submit">
        Sign in
      </button>
    </form>
  );
}

export function HomeRedirect() {
  const nav = useNavigate();
  useEffect(() => {
    nav(roleHome(localStorage.getItem('ordovex.role') ?? 'desk_head'), { replace: true });
  }, [nav]);
  return null;
}

export function DeskHomePage() {
  const [strategies, setStrategies] = useState<Array<{ strategyId: string; name: string; status: string; kind: string }>>([]);
  const [health, setHealth] = useState<{ status?: string; decisionLatencyP99Ms?: number; killSuccessRate?: number } | null>(null);
  const [breaches, setBreaches] = useState<Array<{ breachActionId: string; strategyId: string; kind: string; action: string }>>([]);
  const [error, setError] = useState('');
  const [killMsg, setKillMsg] = useState('');

  useEffect(() => {
    Promise.all([
      api<ListEnvelope<{ strategyId: string; name: string; status: string; kind: string }>>('/v1/strategies').catch(() => ({ data: { items: [] } })),
      api<Envelope<{ status: string; decisionLatencyP99Ms: number; killSuccessRate: number }>>('/v1/health/control-plane').catch(() => ({ data: null as never })),
      api<ListEnvelope<{ breachActionId: string; strategyId: string; kind: string; action: string }>>('/v1/telemetry/breaches').catch(() => ({ data: { items: [] } })),
    ])
      .then(([s, h, b]) => {
        setStrategies(s.data.items);
        setHealth(h.data);
        setBreaches(b.data.items);
      })
      .catch((e) => setError(String(e.message)));
  }, []);

  const certified = strategies.filter((s) => s.status === 'certified' || s.status === 'live').length;
  const certifiedPct = strategies.length ? certified / strategies.length : 0;

  async function deskKill() {
    setKillMsg('');
    try {
      await api('/v1/kills', {
        method: 'POST',
        body: JSON.stringify({ scope: 'desk', targetId: 'desk_demo', reason: 'Desk panic from Ordovex home', cancelWorking: true }),
      });
      setKillMsg('Desk kill issued — timeline immutable.');
    } catch (e) {
      setKillMsg(e instanceof Error ? e.message : 'Kill failed — page SRE');
    }
  }

  return (
    <div>
      <h1 className="page-title">Desk risk home</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {health?.status === 'degraded' || health?.status === 'critical' ? (
        <div className="banner amber">Control plane {health.status} — p99 {health.decisionLatencyP99Ms ?? '—'}ms</div>
      ) : null}
      <div className="kpi-strip">
        <CertifiedNotionalStrip value={certifiedPct} total={strategies.length} />
        <div className="kpi">
          <span className="kpi-label">Open breaches</span>
          <span className="kpi-value amber">{breaches.length}</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Kill success</span>
          <span className="kpi-value">{health?.killSuccessRate != null ? pct(health.killSuccessRate) : '—'}</span>
        </div>
        <ControlPlaneLatency ms={health?.decisionLatencyP99Ms} />
      </div>
      <div className="panel row-between">
        <div>
          <h2>Desk kill</h2>
          <p className="muted">Halt new orders and cancel working — no dual-control delay.</p>
        </div>
        <KillSwitchButton onClick={deskKill} label="Kill desk now" />
      </div>
      {killMsg ? <div className="banner phosphor">{killMsg}</div> : null}
      <div className="panel">
        <h2>Strategy heat</h2>
        {strategies.length === 0 ? <p className="muted">Empty — enroll first strategy.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {strategies.map((s) => (
              <tr key={s.strategyId}>
                <td className="mono">{s.name}</td>
                <td>{s.kind}</td>
                <td>
                  <span className={`chip ${s.status}`}>{s.status}</span>
                </td>
                <td>
                  <Link to={`/strategies`}>Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CertifiedNotionalStrip({ value, total }: { value: number; total: number }) {
  return (
    <div className="kpi">
      <span className="kpi-label">Certified notional proxy</span>
      <span className="kpi-value phosphor">{pct(value)}</span>
      <span className="muted">{total} strategies enrolled</span>
    </div>
  );
}

function ControlPlaneLatency({ ms }: { ms?: number }) {
  return (
    <div className="kpi">
      <span className="kpi-label">Decision p99</span>
      <span className="kpi-value">{ms != null ? `${ms}ms` : '—'}</span>
    </div>
  );
}

function KillSwitchButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" className="kill-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export function StrategiesPage() {
  const [rows, setRows] = useState<Array<{ strategyId: string; name: string; deskId: string; kind: string; status: string; liveModelVersionId?: string }>>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  function load() {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/strategies')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await api('/v1/strategies', {
        method: 'POST',
        body: JSON.stringify({ name, deskId: 'desk_demo', kind: 'ai_overlay', markets: ['EQ'] }),
      });
      setName('');
      setMsg('Strategy submitted.');
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  }

  async function rollback(strategyId: string, liveModelVersionId?: string) {
    if (!liveModelVersionId) {
      setError('No prior certified version — kill-only path.');
      return;
    }
    try {
      await api(`/v1/strategies/${strategyId}/live-binding`, {
        method: 'POST',
        body: JSON.stringify({ targetModelVersionId: liveModelVersionId, reason: 'Operator rollback' }),
      });
      setMsg('Live binding rolled back.');
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rollback failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Strategy registry</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner phosphor">{msg}</div> : null}
      <form className="panel inline-form" onSubmit={create}>
        <input placeholder="Strategy name" value={name} onChange={(e) => setName(e.target.value)} required />
        <button className="primary" type="submit">
          Submit version shell
        </button>
      </form>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Desk</th>
              <th>Status</th>
              <th>Live binding</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.strategyId}>
                <td className="mono">{r.strategyId}</td>
                <td>{r.name}</td>
                <td className="mono">{r.deskId}</td>
                <td>
                  <span className={`chip ${r.status}`}>{r.status}</span>
                </td>
                <td className="mono">{r.liveModelVersionId ?? '—'}</td>
                <td>
                  <button type="button" className="ghost" onClick={() => rollback(r.strategyId, r.liveModelVersionId)}>
                    Rollback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CertificationsPage() {
  const [rows, setRows] = useState<Array<{ certificationId: string; strategyId: string; status: string; riskClass: string; rejectReasons?: string[] }>>([]);
  const [error, setError] = useState('');

  function load() {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/certifications')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function decide(id: string, decision: 'approve' | 'reject') {
    try {
      await api(`/v1/certifications/${id}/decide`, {
        method: 'POST',
        body: JSON.stringify({
          decision,
          rejectReasons: decision === 'reject' ? ['Evidence incomplete'] : undefined,
        }),
      });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Decide failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Certification workflow</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <div className="panel">
        {rows.length === 0 ? <p className="muted">No pending certifications — submit from strategy versions.</p> : null}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Strategy</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Reject reasons</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.certificationId}>
                <td className="mono">{r.certificationId}</td>
                <td className="mono">{r.strategyId}</td>
                <td>{r.riskClass}</td>
                <td>
                  <span className={`chip ${r.status}`}>{r.status}</span>
                </td>
                <td>{(r.rejectReasons ?? []).join(', ') || '—'}</td>
                <td className="actions">
                  <button type="button" className="primary" onClick={() => decide(r.certificationId, 'approve')}>
                    Approve
                  </button>
                  <button type="button" className="ghost" onClick={() => decide(r.certificationId, 'reject')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LimitsPage() {
  const [rows, setRows] = useState<Array<{ limitPackageId: string; hierarchyLevel: string; maxLoss: number; strategyId?: string; inventorySkewLimit?: number }>>([]);
  const [sim, setSim] = useState<{ effectiveMaxLoss?: number; winningLevel?: string } | null>(null);
  const [error, setError] = useState('');
  const [maxLoss, setMaxLoss] = useState('100000');

  function load() {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/limits')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function tighten(e: FormEvent) {
    e.preventDefault();
    try {
      await api('/v1/limits', {
        method: 'PUT',
        body: JSON.stringify({ hierarchyLevel: 'desk', maxLoss: Number(maxLoss), deskId: 'desk_demo' }),
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upsert failed');
    }
  }

  async function proposeRaise() {
    if (!rows[0]) return;
    try {
      await api('/v1/limits/raises', {
        method: 'POST',
        body: JSON.stringify({ limitPackageId: rows[0].limitPackageId, proposedMaxLoss: Number(maxLoss) * 2, reason: 'Desk request' }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Raise propose failed');
    }
  }

  async function simulate() {
    try {
      const r = await api<Envelope<{ effectiveMaxLoss: number; winningLevel: string }>>('/v1/limits/simulate-tightest?strategyId=str_00000000000000000000000000');
      setSim(r.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulate failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Limit hierarchy</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <LimitRingStack levels={['firm', 'desk', 'strategy', 'symbol']} active={rows.map((r) => r.hierarchyLevel)} />
      <form className="panel inline-form" onSubmit={tighten}>
        <input type="number" value={maxLoss} onChange={(e) => setMaxLoss(e.target.value)} />
        <button className="primary" type="submit">
          Tighten now
        </button>
        <button className="ghost" type="button" onClick={proposeRaise}>
          Propose raise (dual)
        </button>
        <button className="ghost" type="button" onClick={simulate}>
          Simulate tightest-wins
        </button>
      </form>
      {sim ? (
        <div className="banner phosphor">
          Effective max loss {sim.effectiveMaxLoss} at {sim.winningLevel}
        </div>
      ) : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Max loss</th>
              <th>MM skew</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.limitPackageId}>
                <td>{r.hierarchyLevel}</td>
                <td className="mono">{r.maxLoss}</td>
                <td className="mono">{r.inventorySkewLimit ?? '—'}</td>
                <td className="mono">{r.strategyId ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LimitRingStack({ levels, active }: { levels: string[]; active: string[] }) {
  return (
    <div className="limit-rings panel">
      {levels.map((l) => (
        <div key={l} className={`ring ${active.includes(l) ? 'on' : ''}`}>
          {l}
        </div>
      ))}
      <p className="muted">Tightest applicable limit wins.</p>
    </div>
  );
}

export function PreTradePage() {
  const [rows, setRows] = useState<Array<{ orderIntentCheckId: string; strategyId: string; symbol: string; result: string; reasons?: string[]; modelVersionId?: string }>>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/pretrade/checks')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }, []);
  return (
    <div>
      <h1 className="page-title">Pre-trade rejects</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <div className="panel">
        {rows.length === 0 ? <p className="muted">Healthy — low reject stream.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Symbol</th>
              <th>Result</th>
              <th>Version</th>
              <th>Reasons</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.orderIntentCheckId} className={r.result === 'reject' ? 'row-reject' : ''}>
                <td className="mono">{r.strategyId}</td>
                <td>{r.symbol}</td>
                <td>
                  <span className={`chip ${r.result}`}>{r.result}</span>
                </td>
                <td className="mono">{r.modelVersionId ?? '—'}</td>
                <td>{(r.reasons ?? []).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TelemetryPage() {
  const [snaps, setSnaps] = useState<Array<{ telemetrySnapshotId: string; strategyId: string; pnl: number; drawdown: number; messageRate: number }>>([]);
  const [breaches, setBreaches] = useState<Array<{ breachActionId: string; strategyId: string; kind: string; action: string; status: string }>>([]);
  const [error, setError] = useState('');
  function load() {
    Promise.all([
      api<ListEnvelope<(typeof snaps)[0]>>('/v1/telemetry').catch(() => ({ data: { items: [] } })),
      api<ListEnvelope<(typeof breaches)[0]>>('/v1/telemetry/breaches').catch(() => ({ data: { items: [] } })),
    ])
      .then(([s, b]) => {
        setSnaps(s.data.items);
        setBreaches(b.data.items);
      })
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function ack(id: string) {
    try {
      await api(`/v1/telemetry/breaches/${id}/acknowledge`, { method: 'POST', body: JSON.stringify({ notes: 'acked' }) });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ack failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Intraday telemetry</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <div className="panel">
        <h2>Live snapshots</h2>
        <table>
          <thead>
            <tr>
              <th>Strategy</th>
              <th>PnL</th>
              <th>Drawdown</th>
              <th>Msg rate</th>
            </tr>
          </thead>
          <tbody>
            {snaps.map((s) => (
              <tr key={s.telemetrySnapshotId}>
                <td className="mono">{s.strategyId}</td>
                <td className="mono">{s.pnl}</td>
                <td className="mono">{s.drawdown}</td>
                <td className="mono">{s.messageRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h2>Auto-action rail</h2>
        <TelemetryBreachRail items={breaches} onAck={ack} />
      </div>
    </div>
  );
}

function TelemetryBreachRail({
  items,
  onAck,
}: {
  items: Array<{ breachActionId: string; strategyId: string; kind: string; action: string; status: string }>;
  onAck: (id: string) => void;
}) {
  return (
    <ul className="breach-rail">
      {items.map((b) => (
        <li key={b.breachActionId} className={b.action === 'kill' ? 'kill' : 'amber'}>
          <span className="mono">{b.strategyId}</span> · {b.kind} → <strong>{b.action}</strong> · {b.status}
          {b.status === 'triggered' ? (
            <button type="button" className="ghost" onClick={() => onAck(b.breachActionId)}>
              Acknowledge
            </button>
          ) : null}
        </li>
      ))}
      {items.length === 0 ? <li className="muted">No auto-actions — telemetry gap would show amber.</li> : null}
    </ul>
  );
}

export function KillsPage() {
  const [rows, setRows] = useState<Array<{ killOrderId: string; scope: string; targetId: string; status: string; reason: string; cancelWorking?: boolean }>>([]);
  const [scope, setScope] = useState('strategy');
  const [targetId, setTargetId] = useState('');
  const [cancelWorking, setCancelWorking] = useState(true);
  const [error, setError] = useState('');
  const [sla, setSla] = useState(0);

  function load() {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/kills')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function issue(e: FormEvent) {
    e.preventDefault();
    setError('');
    const started = Date.now();
    try {
      await api('/v1/kills', {
        method: 'POST',
        body: JSON.stringify({ scope, targetId, reason: 'Operator kill console', cancelWorking }),
      });
      setSla(Date.now() - started);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kill API fail — page SRE');
    }
  }

  async function restart(killOrderId: string) {
    try {
      await api(`/v1/kills/${killOrderId}/restart`, {
        method: 'POST',
        body: JSON.stringify({ killOrderId, notes: 'Restart auth' }),
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Restart failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Kill-switch console</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <form className="panel inline-form" onSubmit={issue}>
        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="strategy">strategy</option>
          <option value="desk">desk</option>
          <option value="firm">firm</option>
        </select>
        <input placeholder="Target id" value={targetId} onChange={(e) => setTargetId(e.target.value)} required />
        <label className="check">
          <input type="checkbox" checked={cancelWorking} onChange={(e) => setCancelWorking(e.target.checked)} />
          Cancel working
        </label>
        <button className="kill-btn" type="submit">
          Kill now
        </button>
        {sla > 0 ? <span className="muted mono">Last SLA {sla}ms</span> : null}
      </form>
      <div className="panel">
        <h2>Immutable timeline</h2>
        <table>
          <thead>
            <tr>
              <th>When / ID</th>
              <th>Scope</th>
              <th>Target</th>
              <th>Status</th>
              <th>Reason</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.killOrderId}>
                <td className="mono">{r.killOrderId}</td>
                <td>{r.scope}</td>
                <td className="mono">{r.targetId}</td>
                <td>
                  <span className={`chip ${r.status}`}>{r.status}</span>
                </td>
                <td>{r.reason}</td>
                <td>
                  <button type="button" className="ghost" onClick={() => restart(r.killOrderId)}>
                    Authorize restart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ConcentrationPage() {
  const [snap, setSnap] = useState<{ cells?: Array<{ signalFamily: string; notional: number; strategyCount: number }>; coverageGap?: boolean } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    api<Envelope<(typeof snap)>>('/v1/concentration')
      .then((r) => setSnap(r.data))
      .catch((e) => setError(String(e.message)));
  }, []);
  return (
    <div>
      <h1 className="page-title">Crowded-signal concentration</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {snap?.coverageGap ? <div className="banner amber">Unclassified signals — coverage gap</div> : null}
      <CrowdedSignalMatrix cells={snap?.cells ?? []} />
    </div>
  );
}

function CrowdedSignalMatrix({ cells }: { cells: Array<{ signalFamily: string; notional: number; strategyCount: number }> }) {
  return (
    <div className="panel matrix">
      {cells.length === 0 ? <p className="muted">No concentration cells yet.</p> : null}
      {cells.map((c) => (
        <div key={c.signalFamily} className="matrix-cell">
          <div className="mono">{c.signalFamily}</div>
          <div className="kpi-value phosphor">{c.notional}</div>
          <div className="muted">{c.strategyCount} strategies</div>
        </div>
      ))}
    </div>
  );
}

export function IncidentsPage() {
  const [rows, setRows] = useState<Array<{ incidentPackId: string; strategyId: string; status: string; exportHash?: string; missingTelemetrySlices?: string[] }>>([]);
  const [strategyId, setStrategyId] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<(typeof rows)[0] | null>(null);

  function load() {
    api<ListEnvelope<(typeof rows)[0]>>('/v1/incidents/packs')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }
  useEffect(load, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    try {
      const r = await api<Envelope<(typeof rows)[0]>>('/v1/incidents/packs', {
        method: 'POST',
        body: JSON.stringify({ strategyId }),
      });
      setSelected(r.data);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pack failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">Incident reconstruction</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <form className="panel inline-form" onSubmit={create}>
        <input className="mono" placeholder="strategyId" value={strategyId} onChange={(e) => setStrategyId(e.target.value)} required />
        <button className="primary" type="submit">
          Generate pack
        </button>
      </form>
      {selected ? (
        <div className="panel">
          <IncidentTimelinePack pack={selected} />
        </div>
      ) : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Pack</th>
              <th>Strategy</th>
              <th>Status</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.incidentPackId} onClick={() => setSelected(r)} className="clickable">
                <td className="mono">{r.incidentPackId}</td>
                <td className="mono">{r.strategyId}</td>
                <td>{r.status}</td>
                <td className="mono">{r.exportHash ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IncidentTimelinePack({
  pack,
}: {
  pack: { incidentPackId: string; strategyId: string; status: string; exportHash?: string; missingTelemetrySlices?: string[] };
}) {
  return (
    <div>
      <h2>Pack {pack.incidentPackId}</h2>
      <p className="mono">Strategy {pack.strategyId}</p>
      <p>
        Status <span className={`chip ${pack.status}`}>{pack.status}</span> · hash {pack.exportHash ?? '—'}
      </p>
      {(pack.missingTelemetrySlices ?? []).length ? (
        <div className="banner amber">Missing slices: {(pack.missingTelemetrySlices ?? []).join(', ')}</div>
      ) : (
        <p className="muted">Timeline artefacts ready for read-only share.</p>
      )}
    </div>
  );
}

export function HealthPage() {
  const [health, setHealth] = useState<{
    status?: string;
    decisionLatencyP99Ms?: number;
    killSuccessRate?: number;
    gatewayHeartbeatsOk?: number;
    gatewayHeartbeatsTotal?: number;
    degradeMode?: string;
  } | null>(null);
  const [gateways, setGateways] = useState<Array<{ gatewayId: string; ok: boolean; latencyMs?: number; lastSeenAt: string }>>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([
      api<Envelope<NonNullable<typeof health>>>('/v1/health/control-plane'),
      api<ListEnvelope<(typeof gateways)[0]>>('/v1/health/gateways').catch(() => ({ data: { items: [] } })),
    ])
      .then(([h, g]) => {
        setHealth(h.data);
        setGateways(g.data.items);
      })
      .catch((e) => setError(String(e.message)));
  }, []);
  return (
    <div>
      <h1 className="page-title">Control-plane health</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      <div className="kpi-strip">
        <div className="kpi">
          <span className="kpi-label">Status</span>
          <span className={`kpi-value ${health?.status === 'healthy' ? 'phosphor' : 'amber'}`}>{health?.status ?? '—'}</span>
        </div>
        <ControlPlaneLatency ms={health?.decisionLatencyP99Ms} />
        <div className="kpi">
          <span className="kpi-label">Kill success</span>
          <span className="kpi-value">{health?.killSuccessRate != null ? pct(health.killSuccessRate) : '—'}</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Gateways</span>
          <span className="kpi-value">
            {health?.gatewayHeartbeatsOk ?? 0}/{health?.gatewayHeartbeatsTotal ?? gateways.length}
          </span>
        </div>
      </div>
      {health?.degradeMode ? <div className="banner amber">Degrade mode: {health.degradeMode}</div> : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Gateway</th>
              <th>OK</th>
              <th>Latency</th>
              <th>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {gateways.map((g) => (
              <tr key={g.gatewayId}>
                <td className="mono">{g.gatewayId}</td>
                <td>{g.ok ? 'yes' : 'no'}</td>
                <td className="mono">{g.latencyMs ?? '—'}</td>
                <td className="mono">{g.lastSeenAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
