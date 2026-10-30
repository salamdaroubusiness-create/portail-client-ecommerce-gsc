import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowRight, BarChart3, Boxes, Building2, CalendarDays,
  CheckCircle2, ChevronRight, CircleHelp, ClipboardList, CreditCard,
  FileText, LayoutDashboard, LogOut, Menu, Package, Settings, ShieldCheck,
  ShoppingBag, Target, Truck, Users, X
} from "lucide-react";
import { supabase, supabaseConfigured } from "./lib/supabase";
import { loadClientProfile, loadClientRecord } from "./lib/data";

const NAV = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "objective", label: "Mon objectif", icon: Target },
  { id: "supply", label: "Approvisionnement", icon: Truck },
  { id: "stock", label: "Stock produits", icon: Boxes },
  { id: "kpi", label: "KPI publicitaires", icon: BarChart3 },
  { id: "reference", label: "Référence KPI", icon: FileText }
];

const TITLES = {
  dashboard: ["Tableau de bord", "Votre activité e-commerce en un coup d'œil."],
  objective: ["Mon objectif", "Définissez et suivez vos objectifs commerciaux."],
  supply: ["Approvisionnement", "Préparez vos listes et suivez vos commandes."],
  stock: ["Stock produits", "Suivez les quantités, les coûts et les marges."],
  kpi: ["KPI publicitaires", "Analysez les performances de vos campagnes."],
  reference: ["Référence KPI", "Comprenez les indicateurs et leurs seuils."]
};

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setError(""); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
    if (!error) onLogin();
  }

  return <main className="login-shell">
    <section className="login-card">
      <div className="brand-mark">GSC<span>.</span></div>
      <p className="eyebrow">GLOBAL SERVICE CONSULTING</p>
      <h1>Votre espace<br/><em>e-commerce</em></h1>
      <p className="muted">Connectez-vous pour retrouver vos objectifs, produits et indicateurs.</p>
      <form onSubmit={submit} className="login-form">
        <label>Adresse e-mail<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.com"/></label>
        <label>Mot de passe<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Votre mot de passe"/></label>
        {error && <p className="error">{error}</p>}
        <button className="primary-btn" disabled={busy}>{busy ? "Connexion..." : "Se connecter"} <ArrowRight size={17}/></button>
      </form>
      <p className="login-foot"><ShieldCheck size={15}/> Accès sécurisé réservé aux clients GSC</p>
    </section>
    <aside className="login-aside">
      <div className="aside-orb orb-one"/><div className="aside-orb orb-two"/>
      <span className="aside-label">GSC BUSINESS CENTER</span>
      <h2>Pilotez votre<br/>business avec<br/><strong>clarté.</strong></h2>
      <p>De l'approvisionnement à la rentabilité, retrouvez vos données essentielles dans un seul espace.</p>
      <div className="aside-motto">Former aujourd'hui les entrepreneurs qui réussiront demain.</div>
    </aside>
  </main>;
}

function Metric({ label, value, note, icon: Icon }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={18}/></span></div><strong>{value}</strong><small>{note}</small></article>;
}

function EmptyPanel({ icon: Icon, title, text }) {
  return <div className="empty-panel"><span className="empty-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p><span className="coming">Module prêt à connecter à vos données Supabase</span></div>;
}

function Dashboard({ clientName }) {
  return <>
    <div className="welcome-row"><div><p className="eyebrow">VOTRE ESPACE DE PILOTAGE</p><h2>Bonjour{clientName ? `, ${clientName}` : ""} 👋</h2><p className="muted">Voici le résumé de votre activité e-commerce.</p></div><div className="date-chip"><CalendarDays size={16}/> Espace client</div></div>
    <div className="metrics-grid">
      <Metric label="Produits en stock" value="—" note="Données à synchroniser" icon={Package}/>
      <Metric label="Commandes en cours" value="—" note="Suivi approvisionnement" icon={ShoppingBag}/>
      <Metric label="Marge prévisionnelle" value="—" note="Calcul sécurisé côté serveur" icon={Activity}/>
      <Metric label="ROAS campagnes" value="—" note="Performances publicitaires" icon={BarChart3}/>
    </div>
    <div className="dashboard-grid">
      <section className="content-card"><div className="section-heading"><div><h3>Vue d'ensemble</h3><p>Vos indicateurs principaux</p></div><span className="subtle-pill">En attente des données</span></div><div className="chart-placeholder"><BarChart3 size={30}/><strong>Votre tableau de bord prendra vie ici</strong><span>Les données seront chargées depuis votre espace Supabase sécurisé.</span></div></section>
      <section className="content-card"><div className="section-heading"><div><h3>Accès rapides</h3><p>Vos espaces de travail</p></div></div><div className="quick-list">{NAV.slice(1).map((n,i)=><div className="quick-item" key={n.id}><span className="quick-icon"><n.icon size={17}/></span><span>{n.label}</span><ChevronRight size={16}/></div>)}</div></section>
    </div>
  </>;
}

function ModulePage({ id }) {
  const details = {
    objective: ["Votre objectif entrepreneurial", "Renseignez votre vision, votre objectif de chiffre d'affaires, vos charges et votre budget publicitaire.", Target],
    supply: ["Vos listes d'approvisionnement", "Centralisez les produits à commander, les fournisseurs, les quantités et les étapes de livraison.", ClipboardList],
    stock: ["Votre inventaire produits", "Retrouvez le coût d'achat, le transport, les frais annexes, le prix de vente et la marge par produit.", Boxes],
    kpi: ["Suivi de vos campagnes", "Saisissez les résultats publicitaires et consultez les indicateurs calculés et les recommandations.", BarChart3],
    reference: ["Comprendre vos KPI", "Consultez les définitions, repères de performance et règles de décision définis par GSC.", CircleHelp]
  };
  const [title, desc, Icon] = details[id];
  return <div className="module-layout"><div className="module-intro"><span className="module-icon"><Icon size={28}/></span><div><p className="eyebrow">ESPACE DE GESTION</p><h2>{title}</h2><p className="muted">{desc}</p></div></div><EmptyPanel icon={Icon} title="Votre espace est préparé" text="La prochaine étape consiste à raccorder ce module aux tables et aux règles de calcul de votre base GSC." /></div>;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [client, setClient] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) { setLoading(false); return; }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) { setSession(data.session); setLoading(false); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next); setProfile(null); setClient(null);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session?.user?.id) { setProfile(null); setClient(null); return; }
    let active = true;
    (async () => {
      try {
        const p = await loadClientProfile(session.user.id);
        const c = await loadClientRecord(session.user.id);
        if (active) { setProfile(p); setClient(c); setError(""); }
      } catch (e) { if (active) setError(e.message || "Impossible de charger le profil."); }
    })();
    return () => { active = false; };
  }, [session]);

  async function logout() { await supabase.auth.signOut(); setPage("dashboard"); }
  const displayName = client?.company_name || client?.name || profile?.full_name || session?.user?.email?.split("@")[0] || "";
  const pageTitle = TITLES[page];

  if (!supabaseConfigured) return <div className="setup-screen"><div className="setup-card"><div className="brand-mark">GSC<span>.</span></div><h1>Configuration requise</h1><p>Le portail est prêt. Ajoutez les paramètres Supabase dans le fichier <code>.env.local</code> pour activer la connexion.</p><code>VITE_SUPABASE_URL</code><code>VITE_SUPABASE_ANON_KEY</code><p className="warning-note">N'ajoutez jamais la clé service_role dans le frontend.</p></div></div>;
  if (loading) return <div className="loading-screen"><div className="spinner"/><span>Chargement de votre espace...</span></div>;
  if (!session) return <Login onLogin={()=>{}}/>;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="sidebar-brand"><div className="brand-mark">GSC<span>.</span></div><div><strong>BUSINESS CENTER</strong><small>ESPACE E-COMMERCE</small></div><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={19}/></button></div>
      <div className="workspace-label">MENU PRINCIPAL</div>
      <nav>{NAV.map(item=><button key={item.id} className={`nav-item ${page===item.id?"active":""}`} onClick={()=>{setPage(item.id);setMobileOpen(false);}}><item.icon size={18}/><span>{item.label}</span>{page===item.id&&<span className="active-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-box"><ShieldCheck size={18}/><div><strong>Espace sécurisé</strong><small>Vos données sont privées</small></div></div><button className="nav-item logout" onClick={logout}><LogOut size={18}/><span>Déconnexion</span></button><div className="sidebar-version">GSC Business Center · 1.0</div></div>
    </aside>
    {mobileOpen && <button aria-label="Fermer le menu" className="mobile-overlay" onClick={()=>setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Portail client <ChevronRight size={14}/><strong>{pageTitle[0]}</strong></div><div className="user-menu"><span className="avatar">{(displayName || "C").slice(0,1).toUpperCase()}</span><div><strong>{displayName || "Mon compte"}</strong><small>Client GSC</small></div></div></header>
      <div className="page-content">
        {error && <div className="notice-error">{error} — vérifiez les colonnes de liaison du profil client dans Supabase.</div>}
        {page==="dashboard" ? <Dashboard clientName={displayName}/> : <><div className="page-heading"><p className="eyebrow">GSC BUSINESS CENTER</p><h1>{pageTitle[0]}</h1><p>{pageTitle[1]}</p></div><ModulePage id={page}/></>}
        <footer className="page-footer">© {new Date().getFullYear()} GSC Business Center <span>Former aujourd'hui les entrepreneurs qui réussiront demain.</span></footer>
      </div>
    </main>
  </div>;
}