/* Chanda 2026 · v2 — mobile + desktop (auto-detected) */
(() => {
  "use strict";

  const VERSION = "2.0";
  const CFG = window.CHANDA_CONFIG || {};
  const YEAR = CFG.YEAR || 2026;
  const desktopMQ = matchMedia("(min-width: 1024px)");

  // ---------- helpers ----------
  const $ = (s) => document.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
  const has = (n) => n !== null && n !== undefined && n !== "" && Number(n) > 0;
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem("chanda." + k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { v === null || v === undefined ? localStorage.removeItem("chanda." + k) : localStorage.setItem("chanda." + k, v); } catch {} },
    json(k, d) { try { return JSON.parse(this.get(k)) ?? d; } catch { return d; } },
  };

  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11h5v-6h4v6h5V9"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/></svg>',
  };

  // ---------- state ----------
  const S = {
    api: CFG.API_URL || (/^https:\/\/script\.google(usercontent)?\.com\//.test(store.get("api", "")) ? store.get("api") : ""),
    user: store.get("user", ""),
    pass: store.get("pass", ""),
    profiles: store.json("profiles", null) || CFG.COLLECTORS || [],
    admin: store.get("admin", CFG.ADMIN || "TUBAI"),
    isAdmin: store.get("isAdmin") === "1",
    records: store.json("cache", []),
    exp: store.json("expCache", []),
    parties: store.json("parties", ["Misc"]),
    expFilter: "all",
    section: store.get("section", "all"),
    status: "all",
    q: "",
    sort: { k: "sl", dir: 1 },
    busy: 0,
    lastLoad: 0,
    desk: desktopMQ.matches,
  };
  // Netflix-style faces: one look per profile slot
  const FACES = [["pills", "smile"], ["dots", "grin"], ["wink", "smile"], ["glasses", "smile"], ["shades", "smirk"], ["happy", "grin"], ["dots", "o"], ["pills", "tongue"]];
  function faceSvg(i) {
    const [e, m] = FACES[i % FACES.length];
    const ln = (d, w = 6) => `<path d="${d}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
    const eyes = {
      pills: '<rect x="29" y="31" width="9" height="19" rx="4.5" fill="currentColor"/><rect x="62" y="31" width="9" height="19" rx="4.5" fill="currentColor"/>',
      dots: '<circle cx="34" cy="42" r="6.5" fill="currentColor"/><circle cx="66" cy="42" r="6.5" fill="currentColor"/>',
      wink: '<rect x="29" y="31" width="9" height="19" rx="4.5" fill="currentColor"/>' + ln("M59 44 Q66.5 35 74 44"),
      happy: ln("M26 45 Q33.5 35 41 45") + ln("M59 45 Q66.5 35 74 45"),
      glasses: '<circle cx="33" cy="42" r="11" stroke="currentColor" stroke-width="5" fill="none"/><circle cx="67" cy="42" r="11" stroke="currentColor" stroke-width="5" fill="none"/>' + ln("M44 42 H56", 5) + '<circle cx="33" cy="43" r="4" fill="currentColor"/><circle cx="67" cy="43" r="4" fill="currentColor"/>',
      shades: '<path d="M18 33h64v7c0 8-5 13-13 13h-6c-6 0-10-4-13-9-3 5-7 9-13 9h-6c-8 0-13-5-13-13z" fill="currentColor"/>',
    };
    const mouth = {
      smile: ln("M32 63 Q50 80 68 63"),
      grin: '<path d="M30 60 Q50 90 70 60 Z" fill="currentColor"/>',
      smirk: ln("M38 68 Q56 74 68 60"),
      o: '<ellipse cx="50" cy="68" rx="7" ry="8.5" stroke="currentColor" stroke-width="5.5" fill="none"/>',
      tongue: ln("M32 62 Q50 79 68 62") + '<path d="M43 70 q7 14 14 0z" fill="#ff5d7a"/>',
    };
    return `<svg viewBox="0 0 100 100" aria-hidden="true">${eyes[e]}${mouth[m]}</svg>`;
  }
  const slot = (name) => Math.max(0, S.profiles.indexOf(name));
  const CROWN = '<svg class="crown" viewBox="0 0 24 24" aria-label="Admin"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill="#ffc83d" stroke="#7a4b00" stroke-width="1.2" stroke-linejoin="round"/></svg>';
  const tile = (name, extra = "") => `<span class="tile c${slot(name) % 8} ${extra}">${faceSvg(slot(name))}${name === S.admin ? CROWN : ""}</span>`;

  // ---------- API (all POST: text/plain = no CORS preflight; keeps the password out of URLs) ----------
  async function api(action, payload = {}, cred) {
    if (!S.api) { const e = new Error("Server link not set"); e.code = "NO_API"; throw e; }
    const c = cred || { user: S.user, pass: S.pass };
    const res = await fetch(S.api, { method: "POST", redirect: "follow", body: JSON.stringify({ action, user: c.user, pass: c.pass, ...payload }) });
    if (!res.ok) throw new Error("Server error " + res.status);
    let data;
    try { data = await res.json(); } catch { throw new Error("Unexpected reply — check the server link"); }
    if (!data.ok) { const e = new Error(data.error || "Failed"); e.code = data.error; throw e; }
    return data;
  }
  const netMsg = (e) => (e instanceof TypeError ? "No internet / server not reachable" : e.message);

  function busy(on) {
    S.busy += on ? 1 : -1;
    $("#loadingBar").classList.toggle("on", S.busy > 0);
    $("#btnRefresh").classList.toggle("spin", S.busy > 0);
  }

  function takeList(d) {
    S.records = d.records || [];
    if (d.expenses) { S.exp = d.expenses; store.set("expCache", JSON.stringify(S.exp)); }
    if (d.parties) { S.parties = d.parties; store.set("parties", JSON.stringify(S.parties)); }
    if (d.collectors && d.collectors.length) { S.profiles = d.collectors; store.set("profiles", JSON.stringify(d.collectors)); }
    if (d.admin) { S.admin = d.admin; store.set("admin", d.admin); }
    S.isAdmin = !!d.isAdmin; store.set("isAdmin", S.isAdmin ? "1" : "0");
    store.set("cache", JSON.stringify(S.records));
    if (d.rev !== undefined) S.rev = d.rev;
    S.lastLoad = Date.now();
  }

  // quiet = background auto-refresh: no spinner, no toast
  async function load(silent, quiet) {
    if (!quiet) busy(true);
    try {
      takeList(await api("list"));
      reapplyQueue();
      render();
      if (current && !$("#sheetWrap").hidden) current = S.records.find((x) => x.row === current.row) || current;
      runQueue();
      if (!silent) toast("Updated");
    } catch (e) {
      if (e.code === "BAD_LOGIN" || e.code === "MUST_CHANGE") logout("Please log in again");
      else if (!quiet) toast(netMsg(e), true);
    } finally { if (!quiet) busy(false); }
  }

  // every 5 s: tiny "anything changed?" call; full reload only when something changed (or once a minute)
  let autoBusy = false;
  async function autoTick() {
    if (document.hidden || $("#app").hidden || !S.pass || !S.api || autoBusy || qBusy || S.busy > 0) return;
    autoBusy = true;
    try {
      const d = await api("rev");
      if (d.rev !== S.rev || Date.now() - S.lastLoad > 60000) await load(true, true);
    } catch (e) { /* offline — try again next tick */ }
    finally { autoBusy = false; }
  }

  function replaceRecord(rec) {
    const i = S.records.findIndex((r) => r.row === rec.row);
    if (i >= 0) S.records[i] = rec; else S.records.push(rec);
    store.set("cache", JSON.stringify(S.records));
  }

  // ---------- derived ----------
  const sections = () => {
    const seen = [];
    S.records.forEach((r) => { const l = r.loc || ""; if (!seen.includes(l)) seen.push(l); });
    return seen.sort((a, b) => (a === "" ? -1 : b === "" ? 1 : a.localeCompare(b)));
  };
  const isMain = (l) => !l || /^main/i.test(l);
  const secLabel = (l) => (l ? l : "Main");
  const secIndex = (l) => Math.max(0, sections().indexOf(l || "")) % 4;
  const initials = (r) => {
    const w = (r.en || "").replace(/\(.*?\)/g, "").trim().split(/\s+/).filter(Boolean);
    if (!w.length) return esc((r.bn || "?").slice(0, 1));
    return esc(((w[0][0] || "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase());
  };
  const inSection = (r) => S.section === "all" || (r.loc || "") === S.section;
  const isSet = (h) => h.type === "set" || /override/i.test(h.date || "");
  const isToday = (h) => { if (!h.ts) return false; return new Date(h.ts).toDateString() === new Date().toDateString(); };

  function matches(r) {
    if (!inSection(r)) return false;
    if (S.status === "paid" && !has(r.a26)) return false;
    if (S.status === "due" && has(r.a26)) return false;
    if (S.status === "new" && (has(r.a24) || has(r.a25))) return false;
    if (S.q) {
      const q = S.q.toLowerCase();
      if (!((r.en || "").toLowerCase().includes(q) || (r.bn || "").includes(S.q) || String(r.sl) === S.q)) return false;
    }
    return true;
  }

  function sorted(rs) {
    const { k, dir } = S.sort;
    if (k === "sl") return dir === 1 ? rs : rs.slice().reverse();
    return rs.slice().sort((a, b) => {
      if (k === "en") return dir * (a.en || "").localeCompare(b.en || "");
      return dir * ((Number(a[k]) || -1) - (Number(b[k]) || -1));
    });
  }

  // ---------- render ----------
  function render() {
    renderHero();
    renderSections();
    renderStatus();
    renderList();
    renderPuja();
    if (S.tab === "expenses") renderExp();
    if (S.desk) { renderDeskFilters(); renderLeader(); }
    $("#btnMe").innerHTML = tile(S.user);
    measure();
  }

  function renderHero() {
    const rs = S.records.filter(inSection);
    const got = rs.reduce((t, r) => t + (Number(r.a26) || 0), 0);
    const last = rs.reduce((t, r) => t + (Number(r.a25) || 0), 0);
    const paid = rs.filter((r) => has(r.a26)).length;
    let today = 0;
    rs.forEach((r) => (r.hist || []).forEach((h) => {
      if (isSet(h) || !isToday(h)) return;
      today += Number(h.amt) || 0;
    }));
    const pct = last ? Math.min(100, Math.round((got / last) * 100)) : 0;
    $("#hero").classList.toggle("compact", !S.desk);
    if (!S.desk) {
      $("#hero").innerHTML = `
        <div class="hero-label">Collected ${YEAR}${S.section !== "all" ? " · " + esc(secLabel(S.section)) : ""}</div>
        <div class="hero-amt">${inr(got)}</div>
        <div class="hero-bar"><span style="width:${pct}%"></span></div>
        <div class="mini"><b>${paid}</b>/${rs.length} paid · ${pct}% of ${YEAR - 1}</div>
        <div class="mini">Today's collection <b>${inr(today)}</b></div>`;
      return;
    }
    $("#hero").innerHTML = `
      <div class="hero-label">Collected ${YEAR}${S.section !== "all" ? " · " + esc(secLabel(S.section)) : ""}</div>
      <div class="hero-amt">${inr(got)}</div>
      <div class="hero-bar"><span style="width:${pct}%"></span></div>
      <div class="hero-sub"><span>${pct}% of last year</span><span>${YEAR - 1}: ${inr(last)}</span></div>
      <div class="hero-stats two">
        <div class="hero-stat"><b>${paid}<small style="font-size:12px;opacity:.75">/${rs.length}</small></b><span>Houses paid</span></div>
        <div class="hero-stat"><b>${inr(today)}</b><span>Today's collection</span></div>
      </div>`;
  }

  function renderSections() {
    const secs = sections();
    if (S.section !== "all" && !secs.includes(S.section)) S.section = "all";
    $("#sections").innerHTML = [["all", "All"], ...secs.map((l) => [l, secLabel(l)])]
      .map(([v, t]) => `<button role="tab" data-sec="${esc(v)}" class="${S.section === v ? "on" : ""}">${esc(t)}</button>`).join("");
  }

  function statusCounts() {
    const rs = S.records.filter(inSection);
    return {
      all: rs.length,
      due: rs.filter((r) => !has(r.a26)).length,
      paid: rs.filter((r) => has(r.a26)).length,
      new: rs.filter((r) => !has(r.a24) && !has(r.a25)).length,
    };
  }

  function renderStatus() {
    const n = statusCounts();
    $("#status").innerHTML = [["all", "Everyone"], ["due", "Due"], ["paid", "Paid"], ["new", "New names"]]
      .map(([v, t]) => `<button class="chip ${S.status === v ? "on" : ""}" data-st="${v}">${t}<i>${n[v]}</i></button>`).join("");
  }

  function renderDeskFilters() {
    const secs = sections();
    const pick = (l) => S.records.filter((r) => l === "all" || (r.loc || "") === l);
    $("#deskFilters").innerHTML = `<h4>Locations</h4><div class="navlist">${[["all", "All locations"], ...secs.map((l) => [l, secLabel(l)])]
      .map(([v, t]) => { const rs = pick(v); return `<button data-sec="${esc(v)}" class="${S.section === v ? "on" : ""}"><span>${esc(t)}</span><i>${inr(rs.reduce((s, r) => s + (Number(r.a26) || 0), 0))} · ${rs.length}</i></button>`; }).join("")}</div>`;
  }

  function renderLeader() {
    const by = {};
    S.records.forEach((r) => (r.hist || []).forEach((h) => {
      if (isSet(h) || !h.by) return;
      const o = (by[h.by] = by[h.by] || { total: 0, today: 0, n: 0 });
      o.total += Number(h.amt) || 0; o.n++;
      if (isToday(h)) o.today += Number(h.amt) || 0;
    }));
    const rows = Object.entries(by).sort((a, b) => b[1].total - a[1].total);
    const max = rows.length ? rows[0][1].total : 0;
    $("#leader").innerHTML = `<h4>Collectors · ${YEAR}</h4>` + (rows.length
      ? `<div class="lead">${rows.map(([n, o]) => `
        <div class="lead-row">${tile(n)}
          <div class="nm">${esc(n)}<small>${o.n} ${o.n === 1 ? "entry" : "entries"} · ${inr(o.today)} today</small>
            <div class="lead-bar"><span style="width:${max ? Math.round((o.total / max) * 100) : 0}%"></span></div></div>
          <span class="v">${inr(o.total)}</span></div>`).join("")}</div>`
      : `<p class="muted" style="margin:0">No payments entered yet.</p>`);
  }

  const pastText = (r) => [has(r.a25) ? `${YEAR - 1}: ${inr(r.a25)}` : "", has(r.a24) ? `${YEAR - 2}: ${inr(r.a24)}` : ""].filter(Boolean).join(" · ") || "No earlier record";

  function rowHtml(r) {
    const paid = has(r.a26);
    const tag = r.loc && !isMain(r.loc) ? `<span class="tag">${esc(r.loc)}</span>` : "";
    const right = paid
      ? `<span class="amt paid"><b>${inr(r.a26)}</b><small>${(r.hist || []).some((h) => h.pending) ? "⏳ saving" : esc(r.by || "")}</small></span>`
      : `<span class="amt"><span class="pill-due">Due</span></span>`;
    return `<button class="row" data-row="${r.row}">
      <span class="av s${secIndex(r.loc)}">${initials(r)}</span>
      <span class="who"><span class="en">${esc(r.en || "—")}</span>${r.bn ? `<span class="bn">${esc(r.bn)}</span>` : ""}<span class="meta">${tag}${pastText(r)}</span></span>
      ${right}</button>`;
  }

  function tableHtml(rs) {
    const th = (k, t, cls = "") => {
      const on = S.sort.k === k;
      return `<th class="${cls}" data-sort="${k}">${t}<span class="ar">${on ? (S.sort.dir === 1 ? "↑" : "↓") : ""}</span></th>`;
    };
    const sel = current ? current.row : -1;
    return `<table class="tbl"><thead><tr>
        ${th("sl", "#", "sl")}${th("en", "Name")}<th>Location</th>
        ${th("a24", String(YEAR - 2), "n")}${th("a25", String(YEAR - 1), "n")}${th("a26", String(YEAR), "n")}
        <th>By</th><th></th></tr></thead><tbody>
      ${rs.map((r) => {
        const paid = has(r.a26);
        return `<tr data-row="${r.row}" class="${r.row === sel ? "sel" : ""}">
          <td class="sl">${esc(r.sl)}</td>
          <td><div class="nm"><span class="av s${secIndex(r.loc)}">${initials(r)}</span><div><b>${esc(r.en || "—")}</b>${r.bn ? `<span class="bn">${esc(r.bn)}</span>` : ""}</div></div></td>
          <td>${r.loc && !isMain(r.loc) ? `<span class="tag">${esc(r.loc)}</span>` : `<span class="muted">${esc(r.loc || "Main")}</span>`}</td>
          <td class="n">${has(r.a24) ? inr(r.a24) : "—"}</td>
          <td class="n">${has(r.a25) ? inr(r.a25) : "—"}</td>
          <td class="n">${paid ? `<b class="paid-amt">${inr(r.a26)}</b>` : `<span class="pill-due">Due</span>`}</td>
          <td>${paid && r.by ? `<span class="by">${esc(r.by)}</span>` : ""}</td>
          <td class="c"><button class="act" data-row="${r.row}">${paid ? "Add more" : "Collect"}</button></td></tr>`;
      }).join("")}</tbody></table>`;
  }

  function renderList() {
    const rs = sorted(S.records.filter(matches));
    if (!S.records.length) {
      $("#list").innerHTML = `<div class="empty"><b>No data yet</b>Press refresh to load the register.</div>`;
      $("#listEnd").textContent = "";
      return;
    }
    if (!rs.length) $("#list").innerHTML = `<div class="empty"><b>No names found</b>Try another spelling, or add this person with “Add name”.</div>`;
    else $("#list").innerHTML = S.desk ? tableHtml(rs) : rs.map(rowHtml).join("");
    const sum = rs.reduce((t, r) => t + (Number(r.a26) || 0), 0);
    $("#listEnd").innerHTML = (rs.length ? `${rs.length} names · ${inr(sum)} collected · v${VERSION}` : "") + CREDIT;
  }

  // ---------- sheet / drawer ----------
  let sheetLocked = false;
  function openSheet(html, { locked = false } = {}) {
    sheetLocked = locked;
    $("#sheet").innerHTML = html;
    $("#sheet").scrollTop = 0;
    $("#sheetWrap").hidden = false;
    if (!S.desk) document.body.style.overflow = "hidden";
  }
  function closeSheet(force) {
    if (sheetLocked && !force) return;
    $("#sheetWrap").hidden = true;
    $("#sheet").innerHTML = "";
    document.body.style.overflow = "";
    if (current) { current = null; if (S.desk && !$("#app").hidden) renderList(); }
  }
  const closeBtn = () => `<button class="close-btn" data-close aria-label="Close" title="Close (Esc)">${I.x}</button>`;

  // ---- person ----
  let current = null;
  function openPerson(row) {
    const r = S.records.find((x) => x.row === row);
    if (!r) return;
    current = r;
    openSheet(personHtml(r));
    wirePerson();
    if (S.desk) { renderList(); setTimeout(() => $("#payAmt") && $("#payAmt").focus(), 60); }
  }

  function personHtml(r) {
    const paid = has(r.a26);
    const sugg = [r.a25, r.a24].filter(has).map(Number);
    const quick = [...new Set([...sugg, 100, 200, 500, 1000])].slice(0, 6);
    const hist = (r.hist || []).slice().reverse();
    return `
      <div class="sheet-head">
        <span class="av s${secIndex(r.loc)}">${initials(r)}</span>
        <div class="grow">
          <h2>${esc(r.en)}</h2>
          ${r.bn ? `<div class="bn">${esc(r.bn)}</div>` : ""}
          <div class="muted" style="margin-top:2px">${esc(secLabel(r.loc))}${r.sl ? " · No. " + esc(r.sl) : ""}</div>
        </div>
        ${closeBtn()}
      </div>
      <div class="years">
        <div class="year"><span>${YEAR - 2}</span><b>${has(r.a24) ? inr(r.a24) : "—"}</b></div>
        <div class="year"><span>${YEAR - 1}</span><b>${has(r.a25) ? inr(r.a25) : "—"}</b></div>
        <div class="year now ${paid ? "paid" : ""}"><span>${YEAR}${paid && r.by ? " · " + esc(r.by) : ""}</span><b>${paid ? inr(r.a26) : "Due"}</b></div>
      </div>

      <h3>${paid ? "Add more" : "Collect payment"}</h3>
      <div class="quick">${quick.map((a, i) => `<button data-q="${a}" class="${i < sugg.length ? "sug" : ""}">${inr(a)}</button>`).join("")}</div>
      <div class="pay-row">
        <div class="money"><input id="payAmt" type="number" inputmode="numeric" pattern="[0-9]*" min="1" placeholder="Amount"></div>
        <button class="btn" id="payBtn">${I.check} Save</button>
      </div>
      <label class="pay-date"><span>📅 Date</span><input id="payDate" type="date" value="${istDay()}" max="${istDay()}"><em id="payDateNote">Today</em></label>

      ${hist.length ? `<h3>Payments ${YEAR}</h3><div class="hist">${hist.map((h) => `
        <div class="hist-item ${isSet(h) ? "set" : ""}">
          <span class="dot">${isSet(h) ? I.pen : I.check}</span>
          <div class="t"><b>${isSet(h) ? "Total set to " + inr(h.amt) : inr(h.amt)}</b><div>${h.pending ? "⏳ Saving…" : esc(h.date || "")}</div></div>
          ${h.by ? `<span class="by">${esc(h.by)}</span>` : ""}
        </div>`).join("")}</div>` : ""}

      <details class="fold"><summary>Edit details (name · location · ${YEAR - 2} / ${YEAR - 1})</summary><div class="in">
        <label class="lbl" for="edEn">English name</label>
        <input class="field" id="edEn" value="${esc(r.en)}" autocomplete="off">
        <label class="lbl" for="edBn">Bengali name</label>
        <div class="with-btn"><input class="field bn" id="edBn" value="${esc(r.bn)}" autocomplete="off"><button class="btn ghost" id="edTr" type="button">অ Auto</button></div>
        <label class="lbl">Location</label>
        <div class="opts" id="edLoc">${sections().map((l) => `<button type="button" data-l="${esc(l)}" class="${(r.loc || "") === l ? "on" : ""}">${esc(secLabel(l))}</button>`).join("")}</div>
        <div class="years" style="grid-template-columns:1fr 1fr;margin-top:6px">
          <div><label class="lbl" for="edA24">${YEAR - 2} amount</label>
            <div class="money"><input id="edA24" type="number" inputmode="numeric" pattern="[0-9]*" min="0" value="${has(r.a24) ? Number(r.a24) : ""}" placeholder="—"></div></div>
          <div><label class="lbl" for="edA25">${YEAR - 1} amount</label>
            <div class="money"><input id="edA25" type="number" inputmode="numeric" pattern="[0-9]*" min="0" value="${has(r.a25) ? Number(r.a25) : ""}" placeholder="—"></div></div>
        </div>
        <button class="btn block" id="edSave" style="margin-top:6px">Save changes</button>
      </div></details>

      <details class="fold"><summary>Fix a mistake / delete entry</summary><div class="in">
        ${hist.some((h) => !isSet(h)) ? `<p class="muted" style="margin:0">Delete a wrong ${YEAR} entry — its amount comes off the total:</p>
        <div class="hist">${hist.filter((h) => !isSet(h)).map((h) => `
          <div class="hist-item">
            <div class="t"><b>${inr(h.amt)}</b><div>${h.pending ? "⏳ Saving…" : esc(h.date || "")}${h.by ? " · " + esc(h.by) : ""}</div></div>
            ${h.pending ? "" : `<button class="btn danger sm" data-del="${esc(String(h.ts || h.date || ""))}" data-amt="${Number(h.amt)}">🗑 Delete</button>`}
          </div>`).join("")}</div>
        <button class="btn ghost block" id="clearBtn">Clear all ${YEAR} entries (start again)</button>` : ""}
        <p class="muted" style="margin:8px 0 0">Or set the exact ${YEAR} total. Leave empty to mark as not paid.</p>
        <div class="with-btn"><div class="money" style="flex:1"><input id="fixAmt" type="number" inputmode="numeric" pattern="[0-9]*" min="0" value="${has(r.a26) ? Number(r.a26) : ""}"></div>
        <button class="btn danger" id="fixBtn">Set total</button></div>
        <button class="btn ghost block del-name" id="delNameBtn">Delete this name from the register</button>
      </div></details>`;
  }

  function wirePerson() {
    const r = current;
    const amt = $("#payAmt");
    $$("[data-q]", $("#sheet")).forEach((b) => b.onclick = () => { amt.value = b.dataset.q; if (S.desk) amt.focus(); });
    amt.onkeydown = (e) => { if (e.key === "Enter") $("#payBtn").click(); };

    const pd = $("#payDate");
    pd.onchange = () => { $("#payDateNote").textContent = !pd.value || pd.value === istDay() ? "Today" : "Back-dated"; };
    $$("[data-del]", $("#sheet")).forEach((b) => b.onclick = () => withBtn(b, async () => {
      if (!(await ask({ icon: "🗑", danger: true, title: `Delete ${inr(b.dataset.amt)} entry?`, text: `This amount comes off ${B(r.en)}'s ${YEAR} total.`, ok: "Delete" }))) return;
      const d = await api("delpay", { ...ref(r), amt: Number(b.dataset.amt), key: b.dataset.del });
      done(d.record, `${inr(b.dataset.amt)} entry deleted`);
    }));
    if ($("#clearBtn")) $("#clearBtn").onclick = () => withBtn($("#clearBtn"), async () => {
      if (!(await ask({ icon: "🧹", danger: true, title: `Clear all ${YEAR} entries?`, text: `Every ${YEAR} payment of ${B(r.en)} will be removed. You can add the correct amount again right after.`, ok: "Clear all" }))) return;
      const d = await api("clearpay", { ...ref(r) });
      done(d.record, "All entries cleared — add the correct amount now");
    });
    $("#delNameBtn").onclick = () => withBtn($("#delNameBtn"), async () => {
      if (!(await ask({ icon: "⚠️", danger: true, title: "Delete this name?", text: `${B(r.en)} will be removed from the register for every year. A copy of all their details stays in the Payments log.`, ok: "Yes, delete" }))) return;
      if (!(await ask({ icon: "⚠️", danger: true, title: "Are you sure?", text: `Last check — delete ${B(r.en)}?`, ok: "Delete for good" }))) return;
      await api("delname", { ...ref(r) });
      closeSheet(true);
      toast(`${r.en} deleted`);
      await load(true);
    });

    $("#payBtn").onclick = async () => {
      const v = Number(amt.value);
      if (!(v > 0)) { toast("Enter an amount", true); amt.focus(); return; }
      if (v >= 5000 && !(await ask({ icon: "💰", title: `Save ${inr(v)}?`, text: `That's a big amount for ${B(r.en)} — just checking it's right.`, ok: "Yes, save" }))) return;
      const day = pd.value && pd.value !== istDay() ? pd.value : "";
      if (day && day > istDay()) { toast("Date cannot be in the future", true); return; }
      queuePay(r, v, day);
      closeSheet();
      if (navigator.vibrate) navigator.vibrate(30);
      toast(`${inr(v)} for ${r.en} — saving in background`);
    };

    const autoEd = autoBengali($("#edEn"), $("#edBn"), true);
    $$("#edLoc button").forEach((b) => b.onclick = () => $$("#edLoc button").forEach((x) => x.classList.toggle("on", x === b)));
    $("#edTr").onclick = () => withBtn($("#edTr"), () => autoEd.now(true));

    $("#edSave").onclick = () => withBtn($("#edSave"), async () => {
      const en = $("#edEn").value.trim(), bn = $("#edBn").value.trim();
      if (!en) { toast("English name is required", true); return; }
      const raw24 = $("#edA24").value.trim(), raw25 = $("#edA25").value.trim();
      if ([raw24, raw25].some((v) => v !== "" && !(Number(v) >= 0))) { toast("Enter a valid amount", true); return; }
      const loc = ($("#edLoc .on") || {}).dataset ? $("#edLoc .on").dataset.l : (r.loc || "");
      const d = await api("rename", { ...ref(r), en, bn, loc,
        a24: raw24 === "" ? "" : Number(raw24), a25: raw25 === "" ? "" : Number(raw25) });
      done(d.record, "Details updated");
    });

    if ($("#fixBtn")) $("#fixBtn").onclick = () => withBtn($("#fixBtn"), async () => {
      const raw = $("#fixAmt").value.trim();
      if (raw !== "" && !(Number(raw) >= 0)) { toast("Enter a valid amount", true); return; }
      if (!(await ask(raw === ""
        ? { icon: "✏️", danger: true, title: `Mark as not paid?`, text: `${B(r.en)}'s ${YEAR} total will be emptied.`, ok: "Mark not paid" }
        : { icon: "✏️", title: `Set total to ${inr(raw)}?`, text: `${B(r.en)}'s ${YEAR} total becomes exactly ${inr(raw)}.`, ok: "Set total" }))) return;
      const d = await api("override", { ...ref(r), amount: raw === "" ? "" : Number(raw) });
      done(d.record, "Total corrected");
    });
  }

  const ref = (r) => ({ row: r.row, sl: r.sl, en0: r.en });

  // Bengali name fills itself while the English name is typed (stops if you type the Bengali yourself)
  function autoBengali(enEl, bnEl, keepExisting) {
    let manual = !!(keepExisting && bnEl.value.trim()), timer, seq = 0;
    const startEn = enEl.value;
    bnEl.addEventListener("input", () => { manual = !!bnEl.value.trim(); });
    async function now(force) {
      const t = enEl.value.trim();
      if (force) manual = false;
      if (manual) return;
      if (!t) { bnEl.value = ""; return; }
      const my = ++seq;
      bnEl.placeholder = "অনুবাদ হচ্ছে…";
      try {
        const d = await api("translate", { text: t });
        if (my === seq && !manual && enEl.value.trim() === t) bnEl.value = d.text || "";
      } catch (e) { /* keep whatever is there */ }
      finally { bnEl.placeholder = ""; }
    }
    enEl.addEventListener("input", () => {
      if (keepExisting && enEl.value === startEn) return;
      if (keepExisting) manual = false;
      clearTimeout(timer);
      timer = setTimeout(() => now(false), 600);
    });
    return { now };
  }

  function done(rec, msg) {
    replaceRecord(rec);
    if (current && current.row === rec.row) current = rec;
    render();
    if (navigator.vibrate) navigator.vibrate(30);
    toast(msg);
    if (current && current.row === rec.row) { $("#sheet").innerHTML = personHtml(rec); wirePerson(); }
  }

  async function withBtn(btn, fn) {
    if (btn.disabled) return;
    const old = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "…";
    busy(true);
    try { await fn(); }
    catch (e) {
      if (e.code === "BAD_LOGIN" || e.code === "MUST_CHANGE") logout("Please log in again");
      else toast(netMsg(e), true);
    } finally {
      busy(false);
      if (btn.isConnected) { btn.disabled = false; btn.innerHTML = old; }
    }
  }

  // ---- add person ----
  function openAdd() {
    const secs = sections();
    const pre = S.q && !/[ঀ-৿]/.test(S.q) ? S.q : "";
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Add a new name</h2><div class="muted">Saved straight to the Google Sheet</div></div>${closeBtn()}</div>
      <div class="form">
        <label class="lbl" for="adEn">English name *</label>
        <input class="field" id="adEn" autocomplete="off" placeholder="e.g. Rahul Das" value="${esc(pre)}">
        <label class="lbl" for="adBn">Bengali name</label>
        <div class="with-btn"><input class="field bn" id="adBn" autocomplete="off" placeholder="রাহুল দাস"><button class="btn ghost" id="adTr" type="button">অ Auto</button></div>
        <label class="lbl">Location</label>
        <div class="opts" id="adLoc">${secs.map((l, i) => `<button type="button" data-l="${esc(l)}" class="${(S.section !== "all" ? S.section === l : i === 0) ? "on" : ""}">${esc(secLabel(l))}</button>`).join("")}</div>
        <label class="lbl" for="adAmt">${YEAR} amount (optional)</label>
        <div class="money"><input id="adAmt" type="number" inputmode="numeric" pattern="[0-9]*" min="0" placeholder="Collected now"></div>
        <button class="btn block" id="adSave" style="margin-top:14px">${I.plus} Add to register</button>
      </div>`);
    let loc = S.section !== "all" ? S.section : (secs[0] || "");
    $$("button", $("#adLoc")).forEach((b) => b.onclick = () => {
      loc = b.dataset.l;
      $$("button", $("#adLoc")).forEach((x) => x.classList.toggle("on", x === b));
    });
    const auto = autoBengali($("#adEn"), $("#adBn"));
    $("#adTr").onclick = () => withBtn($("#adTr"), () => auto.now(true));
    $("#adSave").onclick = () => withBtn($("#adSave"), async () => {
      const en = $("#adEn").value.trim();
      if (!en) { toast("English name is required", true); $("#adEn").focus(); return; }
      const dup = S.records.find((r) => (r.en || "").toLowerCase() === en.toLowerCase() && (r.loc || "") === loc);
      if (dup && !(await ask({ icon: "👥", title: "Name already exists", text: `${B(dup.en)} is already in ${esc(secLabel(loc))}. Add again anyway?`, ok: "Add anyway" }))) return;
      if (!$("#adBn").value.trim()) await auto.now(true);      // make sure the Bengali name is filled
      const amount = Number($("#adAmt").value) || "";
      const d = await api("add", { en, bn: $("#adBn").value.trim(), loc, amount });
      replaceRecord(d.record);
      render();
      closeSheet();
      toast(`${en} added`);
    });
    if (S.desk) setTimeout(() => $("#adEn") && $("#adEn").focus(), 60);
  }

  // ---- profile / settings ----
  function myStats() {
    let total = 0, today = 0, n = 0;
    const houses = new Set(), recent = [];
    S.records.forEach((r) => (r.hist || []).forEach((h) => {
      if (isSet(h) || h.by !== S.user) return;
      total += Number(h.amt) || 0; n++; houses.add(r.row);
      if (isToday(h)) today += Number(h.amt) || 0;
      recent.push({ r, h, t: h.ts ? new Date(h.ts).getTime() : 0 });
    }));
    recent.sort((a, b) => b.t - a.t);
    return { total, today, n, houses: houses.size, recent: recent.slice(0, 8) };
  }

  function openProfile() {
    const st = myStats();
    openSheet(`
      <div class="sheet-head"><div class="grow me-card">${tile(S.user)}<div><b>${esc(S.user)}</b><span class="muted">${S.isAdmin ? "Admin · " : ""}Collector · ${YEAR}</span></div></div>${closeBtn()}</div>
      <div class="years">
        <div class="year now paid"><span>My total</span><b>${inr(st.total)}</b></div>
        <div class="year"><span>Today</span><b>${inr(st.today)}</b></div>
        <div class="year"><span>Houses</span><b>${st.houses}</b></div>
      </div>
      <h3>My recent entries</h3>
      ${st.recent.length ? `<div class="hist">${st.recent.map(({ r, h }) => `
        <button class="hist-item" data-row="${r.row}" style="text-align:left;width:100%">
          <span class="dot">${I.check}</span>
          <div class="t"><b>${inr(h.amt)}</b> · ${esc(r.en)}<div>${esc(h.date || "")}</div></div>
        </button>`).join("")}</div>` : `<p class="muted">No payments entered by you yet.</p>`}
      <div class="menu-list" style="margin-top:14px">
        <button class="menu-item" id="mPw"><span>Change my password</span>${I.key}</button>
        <button class="menu-item" id="mSwitch"><span>Switch profile / Log out<small>Back to the profile screen</small></span>${I.out}</button>
      </div>`);
    $$("[data-row]", $("#sheet")).forEach((b) => b.onclick = () => openPerson(Number(b.dataset.row)));
    $("#mPw").onclick = openChangePw;
    $("#mSwitch").onclick = () => logout();
  }

  function openSettings() {
    const theme = store.get("theme", "auto");
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Settings</h2><div class="muted">${esc(S.user)}${S.isAdmin ? " · Admin" : ""}</div></div>${closeBtn()}</div>
      <div class="menu-list">
        <div class="menu-item"><span>Theme</span><div class="opts" id="mTheme">${["auto", "light", "dark"].map((t) => `<button data-t="${t}" class="${theme === t ? "on" : ""}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div></div>
        <button class="menu-item" id="mRep"><span>Export · PDF<small>Full register, location-wise or door-to-door due list</small></span>${I.print}</button>
        <button class="menu-item" id="mHist"><span>Transaction history<small>Every payment with date, time and collector</small></span>${I.clock}</button>
        <button class="menu-item" id="mRef"><span>Refresh data<small>${S.lastLoad ? "Updated " + new Date(S.lastLoad).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</small></span>${I.refresh}</button>
        ${S.isAdmin ? `<button class="menu-item" id="mAdmin"><span>Manage collectors<small>Add / remove profiles · reset passwords</small></span><span class="by">ADMIN</span></button>` : ""}
        ${S.isAdmin && CFG.SHEET_URL ? `<a class="menu-item" href="${esc(CFG.SHEET_URL)}" target="_blank" rel="noopener"><span>Open Google Sheet<small>Full database</small></span><span>↗</span></a>` : ""}
        ${CFG.API_URL || !S.isAdmin ? "" : `<button class="menu-item" id="mApi"><span>Server link<small>${esc(S.api ? S.api.slice(0, 46) + "…" : "Not set")}</small></span><span class="by">Change</span></button>`}
      </div>
      <p class="muted" style="text-align:center;margin-top:16px">Chanda ${YEAR} · v${VERSION} · ${S.desk ? "Desktop" : "Mobile"} view</p>${CREDIT}`);
    $$("button", $("#mTheme")).forEach((b) => b.onclick = () => {
      store.set("theme", b.dataset.t); applyTheme();
      $$("button", $("#mTheme")).forEach((x) => x.classList.toggle("on", x === b));
    });
    $("#mRep").onclick = openReport;
    $("#mHist").onclick = () => openHistory();
    $("#mRef").onclick = () => { closeSheet(); load(false); };
    if ($("#mAdmin")) $("#mAdmin").onclick = openAdmin;
    const mApi = $("#mApi");
    if (mApi) mApi.onclick = () => { store.set("api", null); S.api = ""; logout(); };
  }

  // ---------- background saving (payments) ----------
  // Payments are shown at once and sent to the sheet one by one in the background.
  // The queue is kept on the phone, so nothing is lost if the internet drops or the app is closed.
  S.queue = store.json("queue", []);
  let qBusy = false, qTimer = null;
  const saveQueue = () => store.set("queue", JSON.stringify(S.queue));

  function applyPending(rec, item) {
    rec.a26 = (Number(rec.a26) || 0) + item.amount;
    rec.by = item.user;
    rec.hist = (rec.hist || []).concat([{ amt: item.amount, date: "Saving…", ts: new Date(item.at).toISOString(), by: item.user, pending: item.id }]);
  }

  function queuePay(r, amount, day) {
    const item = { id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), row: r.row, sl: r.sl, en0: r.en, amount, day: day || "", user: S.user, pass: S.pass, at: Date.now() };
    S.queue.push(item);
    saveQueue();
    applyPending(r, item);
    store.set("cache", JSON.stringify(S.records));
    render();
    runQueue();
  }

  // after a fresh load from the server, re-apply payments that are still waiting
  function reapplyQueue() {
    S.queue.forEach((it) => { const r = S.records.find((x) => x.row === it.row); if (r) applyPending(r, it); });
  }

  function renderSync() {
    const n = S.queue.length, el = $("#syncPill");
    if (!el) return;
    el.hidden = !n;
    el.textContent = n ? `⏳ Saving ${n}…` : "";
  }

  async function runQueue() {
    renderSync();
    if (qBusy || !S.queue.length) return;
    qBusy = true; clearTimeout(qTimer);
    try {
      while (S.queue.length) {
        const it = S.queue[0];
        try {
          const d = await api("pay", { row: it.row, sl: it.sl, en0: it.en0, amount: it.amount, date: it.day || "" }, { user: it.user, pass: it.pass });
          S.queue.shift(); saveQueue();
          replaceRecord(d.record);
          reapplyQueue();                         // keep later pending payments visible
          if (current && current.row === d.record.row) current = S.records.find((x) => x.row === d.record.row);
          render(); renderSync();
          if (!S.queue.length) toast("All payments saved ✓");
        } catch (e) {
          if (e instanceof TypeError || /Server error 5/.test(e.message)) {   // offline / server busy → retry later
            qTimer = setTimeout(runQueue, 15000);
            toast("No internet — payment kept, will retry", true);
            break;
          }
          // the sheet refused it (wrong row, login changed …) → drop it and reload real data
          S.queue.shift(); saveQueue();
          toast(`Could not save ${inr(it.amount)} for ${it.en0}: ${e.message}`, true);
          await load(true);
        }
      }
    } finally { qBusy = false; renderSync(); }
  }

  // ---------- EXPENSES ----------
  const CATS = [["Pandal", "⛺"], ["Idol", "🛕"], ["Light", "💡"], ["Dhaki", "🥁"], ["Bhog", "🍲"], ["Decoration", "🎀"],
    ["Purohit", "🙏"], ["Transport", "🚚"], ["Misc", "📦"]];
  const catIcon = (c) => (CATS.find(([n]) => n.toLowerCase() === String(c).toLowerCase()) || [0, "🧾"])[1];
  const allCats = () => {
    const base = CATS.map(([n]) => n);
    S.exp.forEach((e) => { if (e.cat && !base.some((b) => b.toLowerCase() === e.cat.toLowerCase())) base.push(e.cat); });
    return base;
  };
  const collected = () => S.records.reduce((t, r) => t + (Number(r.a26) || 0), 0);
  const spent = (list = S.exp) => list.reduce((t, e) => t + (Number(e.amount) || 0), 0);
  // newest first: by date, then by entry order (later rows were added later)
  const expSort = (a, b) => b.date.localeCompare(a.date) || (b.pending ? 1e9 : b.row || 0) - (a.pending ? 1e9 : a.row || 0);
  const fmtDate = (d) => d ? new Date(d + "T12:00:00+05:30").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" }) : "";

  function expMatches(e) {
    const f = S.expFilter;
    if (f === "all") return true;
    if (f === "today") return e.date === istDay();
    if (f === "mine") return e.by === S.user;
    if (f.startsWith("party:")) return e.party === f.slice(6);
    return e.cat.toLowerCase() === f.toLowerCase();
  }

  function groupSum(key) {
    const m = {};
    S.exp.forEach((e) => { const k = e[key] || "Misc"; m[k] = (m[k] || 0) + (Number(e.amount) || 0); });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }

  function renderExp() {
    const el = $("#expView");
    if (!el) return;
    const got = collected(), out = spent(), bal = got - out;
    const list = S.exp.filter(expMatches).sort(expSort);
    const byCat = groupSum("cat"), byParty = groupSum("party");
    const maxCat = byCat.length ? byCat[0][1] : 0;
    const usedCats = byCat.map(([c]) => c);
    const chips = [["all", "All"], ["today", "Today"], ["mine", "Mine"], ...usedCats.map((c) => [c, catIcon(c) + " " + c])];
    let rows = "", lastDay = null;
    list.forEach((e) => {
      if (e.date !== lastDay) {
        const daySum = spent(list.filter((x) => x.date === e.date));
        rows += `<div class="tx-day"><span>${e.date === istDay() ? "Today" : fmtDate(e.date)}</span><b class="neg">${inr(daySum)}</b></div>`;
        lastDay = e.date;
      }
      rows += `<button class="tx" data-exp="${esc(e.id)}">
        <span class="exp-ico">${catIcon(e.cat)}</span>
        <span class="tx-who"><b>${esc(e.cat)}${e.party && e.party !== "Misc" ? " · " + esc(e.party) : ""}</b>
          <small>${e.pending ? "⏳ saving · " : ""}${esc(e.by)}${e.note ? " · " + esc(e.note) : ""}</small></span>
        <span class="tx-amt neg">− ${inr(e.amount)}</span></button>`;
    });
    el.innerHTML = `<div class="exp-left">
      <div class="exp-sum">
        <div><span>Collected</span><b>${inr(got)}</b></div>
        <div><span>Spent</span><b class="neg">${inr(out)}</b></div>
        <div class="bal ${bal < 0 ? "minus" : ""}"><span>Balance in hand${bal < 0 ? " · spent more than collected" : ""}</span><b>${bal < 0 ? "− " + inr(-bal) : inr(bal)}</b></div>
      </div>
      <button class="btn block exp-add" id="expAddBtn">${I.plus} Add expense</button>
      ${byCat.length ? `<div class="exp-box">
        <h4>By category</h4>
        ${byCat.map(([c, v]) => `<button class="cat-row" data-ef="${esc(c)}"><span>${catIcon(c)} ${esc(c)}</span><i><em style="width:${maxCat ? Math.max(4, Math.round(v / maxCat * 100)) : 0}%"></em></i><b>${inr(v)}</b></button>`).join("")}
      </div>
      <div class="exp-box">
        <h4>By party</h4>
        ${byParty.slice(0, 8).map(([pn, v]) => `<button class="cat-row" data-ef="party:${esc(pn)}"><span>${esc(pn)}</span><b>${inr(v)}</b></button>`).join("")}
      </div>` : ""}
      </div><div class="exp-right">
      <div class="chips exp-chips">${chips.map(([v, t]) => `<button class="chip ${S.expFilter === v ? "on" : ""}" data-ef="${esc(v)}">${esc(t)}</button>`).join("")}
        ${S.expFilter.startsWith("party:") ? `<button class="chip on" data-ef="${esc(S.expFilter)}">${esc(S.expFilter.slice(6))}</button>` : ""}</div>
      <div class="exp-list">${rows || `<div class="empty"><b>No expenses yet</b>Tap “Add expense” to record the first one.</div>`}</div>
      ${list.length ? `<p class="list-end">${list.length} expenses · ${inr(spent(list))}</p>` : ""}${CREDIT}</div>`;
    $("#expAddBtn").onclick = () => openExpForm();
    $$("[data-ef]", el).forEach((b) => b.onclick = () => {
      S.expFilter = S.expFilter === b.dataset.ef && b.dataset.ef !== "all" ? "all" : b.dataset.ef;
      renderExp();
      if (b.classList.contains("cat-row")) $(".exp-chips").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $$("[data-exp]", el).forEach((b) => b.onclick = () => {
      const e = S.exp.find((x) => x.id === b.dataset.exp);
      if (e && !e.pending) openExpForm(e);
    });
  }

  function openExpForm(e) {
    const edit = !!e;
    const cats = allCats();
    const curCat = edit ? e.cat : "";
    const isOther = edit && !cats.includes(curCat);
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>${edit ? "Edit expense" : "Add expense"}</h2><div class="muted">${edit ? `Paid by ${esc(e.by)}` : `Paid by ${esc(S.user)}`}</div></div>${closeBtn()}</div>
      <div class="form">
        <label class="lbl" for="exAmt">Amount *</label>
        <div class="money big"><input id="exAmt" type="number" inputmode="numeric" pattern="[0-9]*" min="1" placeholder="0" value="${edit ? Number(e.amount) : ""}"></div>
        <label class="lbl">What for *</label>
        <div class="opts cat-opts" id="exCat">${cats.map((c) => `<button type="button" data-c="${esc(c)}" class="${c === curCat ? "on" : ""}">${catIcon(c)} ${esc(c)}</button>`).join("")}
          <button type="button" data-c="__other" class="${isOther ? "on" : ""}">✏️ Other</button></div>
        <input class="field" id="exOther" placeholder="Type what it was for" value="${isOther ? esc(curCat) : ""}" ${isOther ? "" : "hidden"} style="margin-top:6px">
        <label class="lbl" for="exParty">Party name <span style="font-weight:500">(optional — blank = Misc)</span></label>
        <input class="field" id="exParty" placeholder="e.g. Maa Tara Decorators" autocomplete="off" value="${edit && e.party !== "Misc" ? esc(e.party) : ""}">
        <div class="opts party-sug" id="exSug"></div>
        <div class="years" style="grid-template-columns:1fr 1.4fr;margin-top:4px">
          <div><label class="lbl" for="exDate">📅 Date</label><input class="field" id="exDate" type="date" value="${edit ? esc(e.date) : istDay()}" max="${istDay()}"></div>
          <div><label class="lbl" for="exNote">Note</label><input class="field" id="exNote" placeholder="optional" value="${edit ? esc(e.note) : ""}"></div>
        </div>
        <button class="btn block" id="exSave" style="margin-top:14px">${I.check} ${edit ? "Save changes" : "Save expense"}</button>
        ${edit ? `<button class="btn ghost block del-name" id="exDel" style="margin-top:8px">🗑 Delete this expense</button>
          ${e.hist && e.hist.length > 1 ? `<h3>Changes</h3><div class="hist">${e.hist.slice().reverse().map((h) => `<div class="hist-item"><div class="t"><b>${esc(h.what)}</b><div>${esc(h.at)}</div></div><span class="by">${esc(h.by)}</span></div>`).join("")}</div>` : ""}` : ""}
      </div>`);
    let cat = isOther ? "__other" : curCat;
    $$("button", $("#exCat")).forEach((b) => b.onclick = () => {
      cat = b.dataset.c;
      $$("button", $("#exCat")).forEach((x) => x.classList.toggle("on", x === b));
      $("#exOther").hidden = cat !== "__other";
      if (cat === "__other") $("#exOther").focus();
    });
    const party = $("#exParty");
    const sug = () => {
      const q = party.value.trim().toLowerCase();
      const recent = [...new Set(S.exp.slice().sort(expSort).map((x) => x.party))];
      const pool = [...new Set([...recent, ...S.parties])].filter((x) => x && (!q || x.toLowerCase().includes(q)) && x.toLowerCase() !== q);
      $("#exSug").innerHTML = pool.slice(0, 8).map((x) => `<button type="button" data-p="${esc(x)}">${esc(x)}</button>`).join("");
      $$("button", $("#exSug")).forEach((b) => b.onclick = () => { party.value = b.dataset.p === "Misc" ? "" : b.dataset.p; sug(); });
    };
    party.oninput = sug;
    sug();
    if (!edit && S.desk) setTimeout(() => $("#exAmt").focus(), 60);

    $("#exSave").onclick = async () => {
      const amount = Number($("#exAmt").value);
      const what = cat === "__other" ? $("#exOther").value.trim() : cat;
      const date = $("#exDate").value || istDay();
      if (!(amount > 0)) { toast("Enter the amount", true); $("#exAmt").focus(); return; }
      if (!what) { toast("Choose what it was for", true); return; }
      if (date > istDay()) { toast("Date cannot be in the future", true); return; }
      if (amount >= 10000 && !(await ask({ icon: "💸", title: `Save ${inr(amount)}?`, text: `That's a big expense for ${B(what)} — just checking it's right.`, ok: "Yes, save" }))) return;
      const data = { amount, cat: what, party: party.value.trim() || "Misc", date, note: $("#exNote").value.trim() };
      closeSheet();
      if (navigator.vibrate) navigator.vibrate(30);
      if (edit) saveExpEdit(e, data); else saveExpNew(data);
    };
    if (edit) $("#exDel").onclick = async () => {
      if (!(await ask({ icon: "🗑", danger: true, title: `Delete ${inr(e.amount)} expense?`, text: `${B(e.cat)}${e.party !== "Misc" ? " · " + B(e.party) : ""} on ${esc(fmtDate(e.date))}. A copy stays in the Expense Log tab.`, ok: "Delete" }))) return;
      closeSheet();
      S.exp = S.exp.filter((x) => x.id !== e.id); renderExp();
      try { await api("exp_del", { id: e.id }); toast("Expense deleted"); }
      catch (er) { toast("Could not delete: " + netMsg(er), true); load(true, true); }
    };
  }

  // save in the background — the list updates at once
  async function saveExpNew(data) {
    const tmp = { id: "tmp-" + Date.now(), pending: true, by: S.user, time: "", hist: [], ...data };
    S.exp.push(tmp); renderExp();
    toast(`${inr(data.amount)} expense — saving…`);
    try {
      const d = await api("exp_add", data);
      S.exp = S.exp.map((x) => (x.id === tmp.id ? d.expense : x));
      if (d.parties) S.parties = d.parties;
      store.set("expCache", JSON.stringify(S.exp)); renderExp();
      toast("Expense saved ✓");
    } catch (er) {
      S.exp = S.exp.filter((x) => x.id !== tmp.id); renderExp();
      toast("Expense NOT saved: " + netMsg(er), true);
    }
  }

  async function saveExpEdit(e, data) {
    const before = { ...e };
    Object.assign(e, data, { pending: true }); renderExp();
    try {
      const d = await api("exp_edit", { id: e.id, ...data });
      S.exp = S.exp.map((x) => (x.id === e.id ? d.expense : x));
      if (d.parties) S.parties = d.parties;
      store.set("expCache", JSON.stringify(S.exp)); renderExp();
      toast("Expense updated ✓");
    } catch (er) {
      Object.assign(e, before, { pending: false }); renderExp();
      toast("Change NOT saved: " + netMsg(er), true);
    }
  }

  function printExpenses() {
    const list = S.exp.slice().sort((a, b) => -expSort(a, b));
    const got = collected(), out = spent();
    const now = new Date();
    $("#print").innerHTML = `
      <div class="p-head">
        <div><h1>${esc(CFG.TITLE || "Chanda " + YEAR)} — Expense report</h1><div class="bn">খরচের হিসাব</div></div>
        <div class="r">${now.toLocaleDateString("en-GB")} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${S.user ? "<br>by " + esc(S.user) : ""}</div>
      </div>
      <div class="p-sum"><span>Collected: <b>${inr(got)}</b></span><span>Spent: <b>${inr(out)}</b></span><span>Balance: <b>${inr(got - out)}</b></span><span>Entries: <b>${list.length}</b></span></div>
      <div class="p-sum">${groupSum("cat").map(([c, v]) => `<span>${esc(c)}: <b>${inr(v)}</b></span>`).join("")}</div>
      <table class="p">
        <thead><tr><th class="c">#</th><th>Date</th><th>What for</th><th>Party</th><th>Paid by</th><th>Note</th><th class="n">Amount</th></tr></thead>
        <tbody>${list.map((e, i) => `<tr><td class="c">${i + 1}</td><td>${esc(fmtDate(e.date))}</td><td><b>${esc(e.cat)}</b></td><td>${esc(e.party)}</td><td>${esc(e.by)}</td><td>${esc(e.note)}</td><td class="n">${inr(e.amount)}</td></tr>`).join("")}</tbody>
        <tfoot><tr><td colspan="6" style="text-align:right">Total spent</td><td class="n">${inr(out)}</td></tr></tfoot>
      </table><p class="p-credit">Created by nucant · instagram.com/n4cun1</p>`;
    closeSheet();
    const old = document.title;
    document.title = `Chanda_${YEAR}_Expenses`;
    setTimeout(() => { window.print(); document.title = old; }, 50);
  }

  // ---------- transaction history ----------
  const tsOf = (h) => (h.ts ? new Date(h.ts).getTime() : 0);
  function allTx() {
    const out = [];
    S.records.forEach((r) => (r.hist || []).forEach((h) => out.push({ r, h, t: tsOf(h) })));
    return out.sort((a, b) => b.t - a.t);
  }
  const dayLabel = (t) => {
    if (!t) return "Earlier";
    const d = istDay(t), today = istDay(), yest = istDay(Date.now() - 864e5);
    if (d === today) return "Today";
    if (d === yest) return "Yesterday";
    return new Date(t).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  };
  const timeOf = (t, h) => t ? new Date(t).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) : esc(h.date || "");

  function openHistory(filter = "all") {
    const tx = allTx();
    const who = [...new Set(tx.map((x) => x.h.by).filter(Boolean))];
    const pass = (x) => filter === "all" ? true : filter === "today" ? x.t && istDay(x.t) === istDay()
      : filter === "mine" ? x.h.by === S.user : x.h.by === filter;
    const list = tx.filter(pass);
    const sum = list.reduce((s, x) => s + (isSet(x.h) ? 0 : Number(x.h.amt) || 0), 0);
    let html = "", lastDay = null;
    list.forEach(({ r, h, t }) => {
      const dl = dayLabel(t);
      if (dl !== lastDay) {
        const daySum = list.filter((x) => dayLabel(x.t) === dl && !isSet(x.h)).reduce((s, x) => s + (Number(x.h.amt) || 0), 0);
        html += `<div class="tx-day"><span>${dl}</span><b>${inr(daySum)}</b></div>`;
        lastDay = dl;
      }
      const set = isSet(h);
      html += `<button class="tx" data-row="${r.row}">
        <span class="av s${secIndex(r.loc)}">${initials(r)}</span>
        <span class="tx-who"><b>${esc(r.en)}</b><small>${h.pending ? "⏳ saving · " : ""}${timeOf(t, h)}${h.by ? " · " + esc(h.by) : ""}${set ? " · total corrected" : ""}</small></span>
        <span class="tx-amt ${set ? "set" : ""}">${set ? "= " : "+ "}${inr(h.amt)}</span></button>`;
    });
    const chips = [["all", "All"], ["today", "Today"], ["mine", "Mine"], ...who.filter((w) => w !== S.user).map((w) => [w, w])];
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Transaction history</h2><div class="muted">${list.length} entries · ${inr(sum)}</div></div>${closeBtn()}</div>
      <div class="chips tx-chips">${chips.map(([v, t]) => `<button class="chip ${filter === v ? "on" : ""}" data-f="${esc(v)}">${esc(t)}</button>`).join("")}</div>
      <div class="tx-list">${html || `<p class="muted" style="text-align:center;padding:30px 0">No transactions yet.</p>`}</div>`);
    $$("[data-f]", $("#sheet")).forEach((b) => b.onclick = () => openHistory(b.dataset.f));
    $$(".tx[data-row]", $("#sheet")).forEach((b) => b.onclick = () => openPerson(Number(b.dataset.row)));
  }

  // ---------- bottom tab bar (phones) ----------
  function setTab(t) {
    S.tab = t;
    $(".layout").hidden = t !== "home";
    $("#expView").hidden = t !== "expenses";
    if (t === "expenses") renderExp();
    const ba = $("#btnAdd");
    if (ba) ba.innerHTML = I.plus + `<span>${t === "expenses" ? "Add expense" : "Add name"}</span>`;
    const be = $("#btnExp");
    if (be) { be.classList.toggle("on", t === "expenses"); be.innerHTML = t === "expenses" ? `${I.home}<span>Chanda</span>` : `${I.wallet}<span>Expenses</span>`; }
    $$("[data-tab]", $("#tabbar")).forEach((b) => b.classList.toggle("on", b.dataset.tab === t));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openChangePw() {
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Change my password</h2><div class="muted">${esc(S.user)}</div></div>${closeBtn()}</div>
      <form class="form" id="cpForm" autocomplete="off">
        <label class="lbl" for="cpOld">Current password</label><input class="field" id="cpOld" type="password" autocapitalize="off">
        <label class="lbl" for="cpNew">New password</label><input class="field" id="cpNew" type="password" autocapitalize="off">
        <label class="lbl" for="cpNew2">Type new password again</label><input class="field" id="cpNew2" type="password" autocapitalize="off">
        <button class="btn block" id="cpGo" style="margin-top:14px">Save new password</button>
      </form>`);
    $("#cpForm").onsubmit = (e) => { e.preventDefault(); withBtn($("#cpGo"), async () => {
      const old = $("#cpOld").value.trim(), n1 = $("#cpNew").value.trim(), n2 = $("#cpNew2").value.trim();
      const bad = pwProblem(n1, n2);
      if (bad) { toast(bad, true); return; }
      try { await api("setpw", { newPass: n1 }, { user: S.user, pass: old }); }
      catch (er) { if (er.code === "BAD_LOGIN") { toast("Current password is wrong", true); return; } throw er; }
      S.pass = n1; store.set("pass", n1);
      closeSheet(); toast("Password changed");
    }); };
  }

  const pwProblem = (n1, n2) => n1.length < 4 ? "Use at least 4 characters" : n1 === "1234" ? "Choose something other than 1234" : n1 !== n2 ? "The two passwords don't match" : "";

  function openAdmin() {
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Manage collectors</h2><div class="muted">Reset puts the password back to 1234 — they choose a new one at next login</div></div>${closeBtn()}</div>
      <div class="menu-list">${S.profiles.map((n) => `
        <div class="menu-item adm-row">${tile(n)}<span class="grow"><b>${esc(n)}</b>${n === S.admin ? "<small>Admin</small>" : ""}</span>
          ${n === S.admin ? "" : `<button class="btn ghost sm" data-reset="${esc(n)}">Reset</button><button class="btn danger sm" data-remove="${esc(n)}">Remove</button>`}
        </div>`).join("")}</div>
      <label class="lbl" for="apName" style="margin-top:16px">Add a collector</label>
      <div class="with-btn"><input class="field" id="apName" placeholder="Name, e.g. RAHUL" autocapitalize="characters" autocomplete="off"><button class="btn" id="apGo">${I.plus} Add</button></div>
      <p class="muted">New collectors log in with 1234 and set their own password.</p>`);
    $$("[data-reset]", $("#sheet")).forEach((b) => b.onclick = () => withBtn(b, async () => {
      const n = b.dataset.reset;
      if (!(await ask({ icon: "🔑", title: `Reset ${esc(n)}'s password?`, text: "It goes back to <b>1234</b> and they set a new one at next login.", ok: "Reset" }))) return;
      await api("resetpw", { target: n });
      toast(`${n} reset — password is 1234`);
    }));
    $$("[data-remove]", $("#sheet")).forEach((b) => b.onclick = () => withBtn(b, async () => {
      const n = b.dataset.remove;
      if (!(await ask({ icon: "🗑", danger: true, title: `Remove ${esc(n)}?`, text: "They can no longer log in. Their past payments stay in the sheet.", ok: "Remove" }))) return;
      const d = await api("removeprofile", { name: n });
      S.profiles = d.collectors; store.set("profiles", JSON.stringify(d.collectors));
      openAdmin(); toast(`${n} removed`);
    }));
    $("#apGo").onclick = () => withBtn($("#apGo"), async () => {
      const n = $("#apName").value.trim();
      if (!n) { toast("Enter a name", true); return; }
      const d = await api("addprofile", { name: n });
      S.profiles = d.collectors; store.set("profiles", JSON.stringify(d.collectors));
      openAdmin(); toast(`${n.toUpperCase()} added — password 1234`);
    });
  }

  function applyTheme() {
    const t = store.get("theme", "auto");
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    const dark = t === "dark" || (t === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.querySelector('meta[name="theme-color"]').content = !$("#gate").hidden ? "#141414" : dark ? "#12100e" : "#f6f1ea";
  }

  // ---- report / PDF ----
  function openReport() {
    const shown = sorted(S.records.filter(matches));
    const sec = S.section === "all" ? "" : S.section;
    const secRs = S.records.filter(inSection);
    const dueRs = secRs.filter((r) => !has(r.a26));
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Export · PDF</h2><div class="muted">Opens the print window — choose “Save as PDF”</div></div>${closeBtn()}</div>
      <div class="menu-list">
        <button class="menu-item" data-rep="all"><span>Full register<small>All ${S.records.length} names · every location</small></span>${I.print}</button>
        ${sec ? `<button class="menu-item" data-rep="sec"><span>${esc(secLabel(sec))} only<small>${secRs.length} names</small></span>${I.print}</button>` : ""}
        <button class="menu-item" data-rep="due"><span>Due list for door-to-door<small>${dueRs.length} names${sec ? " in " + esc(secLabel(sec)) : ""} · blank boxes to write in</small></span>${I.print}</button>
        <button class="menu-item" data-rep="exp"><span>Expense report<small>${S.exp.length} expenses · by category, party and date</small></span>${I.print}</button>
        ${shown.length !== S.records.length ? `<button class="menu-item" data-rep="view"><span>Exactly what's on screen<small>${shown.length} names</small></span>${I.print}</button>` : ""}
      </div>`);
    $$("[data-rep]", $("#sheet")).forEach((b) => b.onclick = () => {
      const k = b.dataset.rep;
      if (k === "exp") { printExpenses(); return; }
      const rows = k === "all" ? S.records : k === "sec" ? secRs : k === "due" ? dueRs : shown;
      const title = k === "all" ? "Full register" : k === "sec" ? secLabel(sec) : k === "due" ? "Due list" + (sec ? " · " + secLabel(sec) : "") : "Selected list";
      printReport(rows, title);
    });
  }

  function printReport(rows, title) {
    const t = (k) => rows.reduce((s, r) => s + (Number(r[k]) || 0), 0);
    const paid = rows.filter((r) => has(r.a26)).length;
    const now = new Date();
    $("#print").innerHTML = `
      <div class="p-head">
        <div><h1>${esc(CFG.TITLE || "Chanda " + YEAR)} — ${esc(title)}</h1><div class="bn">${esc(CFG.TITLE_BN || "")}</div></div>
        <div class="r">${now.toLocaleDateString("en-GB")} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${S.user ? "<br>by " + esc(S.user) : ""}</div>
      </div>
      <div class="p-sum">
        <span>Names: <b>${rows.length}</b></span><span>Paid ${YEAR}: <b>${paid}</b></span>
        <span>${YEAR - 2}: <b>${inr(t("a24"))}</b></span><span>${YEAR - 1}: <b>${inr(t("a25"))}</b></span>
        <span>${YEAR}: <b>${inr(t("a26"))}</b></span>
      </div>
      <table class="p">
        <thead><tr><th class="c">#</th><th>English name</th><th>Bengali name</th><th>Location</th>
          <th class="n">${YEAR - 2}</th><th class="n">${YEAR - 1}</th><th class="n">${YEAR}</th><th>By</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr>
          <td class="c">${i + 1}</td><td><b>${esc(r.en)}</b></td><td class="bn">${esc(r.bn)}</td><td>${esc(r.loc || "")}</td>
          <td class="n">${has(r.a24) ? inr(r.a24) : "—"}</td><td class="n">${has(r.a25) ? inr(r.a25) : "—"}</td>
          <td class="n">${has(r.a26) ? "<b>" + inr(r.a26) + "</b>" : '<span class="box"></span>'}</td><td>${esc(has(r.a26) ? r.by : "")}</td></tr>`).join("")}</tbody>
        <tfoot><tr><td colspan="4" style="text-align:right">Total</td><td class="n">${inr(t("a24"))}</td><td class="n">${inr(t("a25"))}</td><td class="n">${inr(t("a26"))}</td><td></td></tr></tfoot>
      </table><p class="p-credit">Created by nucant · instagram.com/n4cun1</p>`;
    closeSheet();
    const old = document.title;
    document.title = `Chanda_${YEAR}_${title.replace(/[^\w]+/g, "_")}`;
    setTimeout(() => { window.print(); document.title = old; }, 50);
  }

  // ---------- gate: Netflix-style profiles → password ----------
  function gateShell(inner) {
    $("#app").hidden = true;
    closeSheet(true);
    const g = $("#gate");
    g.hidden = false;
    g.innerHTML = `<div class="gate-brand"><img src="icon.svg" alt=""><b>${esc(CFG.TITLE || "Chanda " + YEAR)}</b><span>v${VERSION}</span></div>${inner}`;
    applyTheme();
  }

  function showProfiles(msg) {
    gateShell(`
      <h2>Who's collecting?</h2>
      <p class="sub bn">${esc(msg || CFG.TITLE_BN || "")}</p>
      ${PUJA.length ? `<div class="gate-cd" data-cd>${cdInner()}</div>` : ""}
      <div class="profiles" id="profiles">${profileButtons()}</div>
      <div class="gate-foot">শুভ শারদীয়া · Durga Puja ${YEAR}${CREDIT}</div>`);
    $("#profiles").onclick = (e) => { const b = e.target.closest("[data-p]"); if (b) showPassword(b.dataset.p); };
    // refresh the profile list (the admin may have added or removed some)
    if (S.api) api("profiles", {}, {}).then((d) => {
      if (!d.collectors || $("#gate").hidden || !$("#profiles")) return;
      const changed = JSON.stringify(d.collectors) !== JSON.stringify(S.profiles) || (d.admin && d.admin !== S.admin);
      S.profiles = d.collectors; store.set("profiles", JSON.stringify(d.collectors));
      if (d.admin) { S.admin = d.admin; store.set("admin", d.admin); }
      // redraw only when the list really changed, so a tap in progress is never lost
      if (changed) $("#profiles").innerHTML = profileButtons();
    }).catch(() => {});
  }
  const profileButtons = () => S.profiles.map((n) =>
    `<button class="profile" data-p="${esc(n)}">${tile(n)}<span>${esc(n)}</span>${n === S.admin ? "<em>ADMIN</em>" : ""}</button>`).join("");

  function showNewPassword(name, oldPass) {
    gateShell(`
      <div class="pw">
        ${tile(name)}
        <h3>Welcome, ${esc(name)}</h3>
        <p>First login — create your own password</p>
        <form id="npForm" autocomplete="off">
          <input id="np1" type="password" placeholder="New password" autocapitalize="off" autocorrect="off" spellcheck="false">
          <input id="np2" type="password" placeholder="Type it again" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go">
          <div class="err" id="npErr"></div>
          <button class="go" id="npGo">Save &amp; open</button>
        </form>
        <button class="back" id="npBack">← All profiles</button>
      </div>`);
    setTimeout(() => $("#np1").focus(), 80);
    $("#npBack").onclick = () => showProfiles();
    $("#npForm").onsubmit = async (e) => {
      e.preventDefault();
      const n1 = $("#np1").value.trim(), n2 = $("#np2").value.trim();
      const bad = pwProblem(n1, n2);
      if (bad) { $("#npErr").textContent = bad; return; }
      $("#npGo").disabled = true; $("#npGo").textContent = "Saving…";
      try {
        await api("setpw", { newPass: n1 }, { user: name, pass: oldPass });
        const d = await api("list", { login: true }, { user: name, pass: n1 });
        loggedIn(name, n1, d);
        toast("Password set — welcome!");
      } catch (er) {
        $("#npGo").disabled = false; $("#npGo").textContent = "Save & open";
        $("#npErr").textContent = er.code === "BAD_LOGIN" ? "Session expired — go back and log in again" : netMsg(er);
      }
    };
  }

  function loggedIn(name, pass, d) {
    S.user = name; S.pass = pass;
    store.set("user", name); store.set("pass", pass);
    if (S.api) store.set("api", S.api);
    takeList(d);
    enterApp();
  }

  function showPassword(name) {
    if (!S.api && name !== S.admin) {
      gateShell(`
        <div class="pw">
          ${tile(name)}
          <h3>${esc(name)}</h3>
          <p>The app is not connected yet.<br>Ask the admin (${esc(S.admin)}) to set it up first.</p>
          <button class="back" id="gBack">← All profiles</button>
        </div>`);
      $("#gBack").onclick = () => showProfiles();
      return;
    }
    gateShell(`
      <div class="pw">
        ${tile(name)}
        <h3>${esc(name)}</h3>
        <p>${name === S.admin ? "Admin login" : "Enter your password"}</p>
        <form id="pwForm" autocomplete="off">
          ${S.api ? "" : `<input class="small" id="gApi" placeholder="Server link (…/exec)" inputmode="url" autocapitalize="off" spellcheck="false">`}
          <div class="eye"><input id="gPw" type="password" placeholder="Password" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go"><button type="button" id="gEye">Show</button></div>
          <div class="err" id="gErr"></div>
          <button class="go" id="gGo">Open</button>
        </form>
        <button class="back" id="gBack">← All profiles</button>
      </div>`);
    const pw = $("#gPw");
    setTimeout(() => pw.focus(), 80);
    $("#gEye").onclick = () => { const s = pw.type === "password"; pw.type = s ? "text" : "password"; $("#gEye").textContent = s ? "Hide" : "Show"; pw.focus(); };
    $("#gBack").onclick = () => showProfiles();
    $("#pwForm").onsubmit = async (e) => {
      e.preventDefault();
      const err = $("#gErr");
      const apiEl = $("#gApi");
      if (apiEl) {
        const u = apiEl.value.trim();
        if (!/^https:\/\/script\.google(usercontent)?\.com\//.test(u)) { err.textContent = "Paste the full Apps Script link ending in /exec"; return; }
        S.api = u;
      }
      const pass = pw.value.trim();
      if (!pass) { err.textContent = "Enter your password"; return; }
      $("#gGo").disabled = true; $("#gGo").textContent = "Checking…"; err.textContent = "";
      try {
        const d = await api("list", { login: true }, { user: name, pass });
        loggedIn(name, pass, d);
        toast(`Welcome, ${name}`);
      } catch (er) {
        $("#gGo").disabled = false; $("#gGo").textContent = "Open";
        if (er.code === "MUST_CHANGE") { showNewPassword(name, pass); return; }
        if (er.code === "BAD_LOGIN") {
          err.textContent = "Incorrect password";
          const f = $("#pwForm"); f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake");
          pw.select();
        } else {
          err.textContent = netMsg(er);
          if (apiEl && !CFG.API_URL) S.api = "";
        }
      }
    };
  }

  function logout(msg) {
    if (S.queue.length) toast(`${S.queue.length} payment(s) still saving in background`);
    S.pass = ""; store.set("pass", null);
    current = null;
    showProfiles(msg);
  }

  function enterApp() {
    $("#gate").hidden = true;
    $("#gate").innerHTML = "";
    $("#app").hidden = false;
    applyTheme();
    placeSearch();
    setTab("home");
    render();
  }

  // ---------- layout: mobile ↔ desktop ----------
  function placeSearch() {
    const wrap = S.desk ? $("#deskSearchWrap") : $("#mobSearchWrap");
    const inner = $("#searchInner");
    if (inner && inner.parentElement !== wrap) wrap.appendChild(inner);
    $("#q").placeholder = S.desk ? "Search name / নাম খুঁজুন   ( / )" : "Search name / নাম খুঁজুন";
  }

  function measure() {
    const top = document.querySelector(".top"), tools = $("#tools");
    if (!top || $("#app").hidden) return;
    document.documentElement.style.setProperty("--top-h", top.offsetHeight + "px");
    document.documentElement.style.setProperty("--tools-h", tools.offsetHeight + "px");
  }

  function onModeChange() {
    S.desk = desktopMQ.matches;
    if ($("#app").hidden) return;
    const wasOpen = current;
    placeSearch();
    render();
    if (wasOpen) openPerson(wasOpen.row);
  }

  // ---------- Durga Puja countdown ----------
  const PUJA = CFG.PUJA || [];
  const IST = 5.5 * 3600e3;
  const istDay = (t = Date.now()) => new Date(t + IST).toISOString().slice(0, 10);   // "2026-10-06"
  const dayStart = (d) => Date.parse(d + "T00:00:00+05:30");
  const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
  const fmtDay = (d) => new Date(d + "T12:00:00+05:30").toLocaleDateString("en-IN", { day: "numeric", month: "short", weekday: "short", timeZone: "Asia/Kolkata" });
  const mainDay = () => PUJA.find((x) => x.main) || PUJA[0];
  const lastDay = () => PUJA.length ? (PUJA[PUJA.length - 1].end || PUJA[PUJA.length - 1].date) : null;

  function pujaNow() {
    const today = istDay();
    const todayItem = PUJA.find((x) => today >= x.date && today <= (x.end || x.date));
    const start = mainDay();
    if (!start) return { mode: "none" };
    if (today > lastDay()) return { mode: "after", today };
    if (Date.now() >= dayStart(start.date)) return { mode: "during", today, item: todayItem };
    return { mode: "before", today, item: todayItem, ms: dayStart(start.date) - Date.now() };
  }

  const pad = (n) => String(n).padStart(2, "0");
  function cdMini() {
    const st = pujaNow();
    if (st.mode === "none") return "";
    if (st.mode === "after") return `<div class="cdm bn">শুভ বিজয়া</div><div class="mini">Subho Bijoya</div>`;
    if (st.mode === "during") return `<div class="cdm bn">${st.item ? "শুভ " + esc(st.item.bn) : "পূজা চলছে"}</div><div class="mini">${st.item ? "Today: " + esc(st.item.en) : "Durga Puja"}</div>`;
    const s = Math.floor(st.ms / 1000);
    const d = Math.floor(s / 86400), h = Math.floor(s / 3600) % 24, m = Math.floor(s / 60) % 60;
    const nextEv = PUJA.find((x) => x.date >= st.today);
    const note = st.item ? `Today: ${esc(st.item.en)}`
      : nextEv && nextEv !== mainDay() ? `${esc(nextEv.en)} in ${dayDiff(st.today, nextEv.date)}d` : "";
    return `<div class="cdm">${d}<small>d</small> ${pad(h)}<small>h</small> ${pad(m)}<small>m</small> ${pad(s % 60)}<small>s</small></div>
      <div class="mini">to ${esc(mainDay().en)} · ${fmtDay(mainDay().date)}</div>${note ? `<div class="mini gold">${note}</div>` : ""}`;
  }

  function cdInner() {
    const st = pujaNow();
    if (st.mode === "none") return "";
    if (st.mode === "after") return `<div class="cd-msg"><b class="bn">শুভ বিজয়া</b><span>Subho Bijoya · see you next year</span></div>`;
    if (st.mode === "during") {
      const it = st.item;
      return `<div class="cd-msg"><b class="bn">${it ? "শুভ " + esc(it.bn) : "পূজা চলছে"}</b><span>${it ? "Today is " + esc(it.en) : "Durga Puja is on"} · Durga Puja ${YEAR}</span></div>`;
    }
    const s = Math.floor(st.ms / 1000);
    const parts = [[Math.floor(s / 86400), "Days"], [Math.floor(s / 3600) % 24, "Hours"], [Math.floor(s / 60) % 60, "Min"], [s % 60, "Sec"]];
    const nextEv = PUJA.find((x) => x.date >= st.today);
    const note = st.item ? `Today: ${esc(st.item.en)} · <span class="bn">${esc(st.item.bn)}</span>`
      : nextEv && nextEv !== mainDay() ? `${esc(nextEv.en)} in ${dayDiff(st.today, nextEv.date)} day${dayDiff(st.today, nextEv.date) === 1 ? "" : "s"}` : "";
    return `<div class="cd-boxes">${parts.map(([v, l], i) => `<div class="cd-box"><b>${i ? pad(v) : v}</b><span>${l}</span></div>`).join("")}</div>
      <div class="cd-cap">to Durga Puja · ${esc(mainDay().en)} ${fmtDay(mainDay().date)}${note ? `<br><em>${note}</em>` : ""}</div>`;
  }

  function pujaList() {
    const today = istDay();
    return `<ul class="puja-list">${PUJA.map((x) => {
      const end = x.end || x.date;
      const st = today > end ? "done" : today >= x.date ? "today" : "soon";
      const left = dayDiff(today, x.date);
      const when = x.end ? `${fmtDay(x.date)} & ${fmtDay(x.end)}` : fmtDay(x.date);
      const tag = st === "done" ? "✓" : st === "today" ? "Today" : left === 1 ? "Tomorrow" : `${left} days`;
      return `<li class="${st}"><span class="pn"><b>${esc(x.en)}</b><small class="bn">${esc(x.bn)}</small></span><span class="pd">${when}</span><span class="pt">${tag}</span></li>`;
    }).join("")}</ul>`;
  }

  function renderPuja() {
    const el = $("#puja");
    if (!el || !PUJA.length) return;
    el.classList.toggle("compact", !S.desk);
    if (!S.desk) {
      el.innerHTML = `<div class="puja-head"><span>Durga Puja</span><span class="more">Dates ›</span></div><div data-cd="mini">${cdMini()}</div>`;
      el.onclick = openPujaSheet;
      return;
    }
    el.onclick = null;
    const was = el.querySelector("details");
    const open = was ? was.open : S.desk;
    el.innerHTML = `
      <div class="puja-head"><span>Durga Puja ${YEAR}</span><span class="bn">শারদীয়া</span></div>
      <div data-cd>${cdInner()}</div>
      <details class="puja-dates" ${open ? "open" : ""}><summary>Puja dates</summary>${pujaList()}</details>`;
  }

  function openPujaSheet() {
    openSheet(`
      <div class="sheet-head"><div class="grow"><h2>Durga Puja ${YEAR}</h2><div class="muted bn">শারদীয়া</div></div>${closeBtn()}</div>
      <div class="puja"><div data-cd>${cdInner()}</div>${pujaList()}</div>`);
  }

  let lastListDay = "";
  function tickPuja() {
    $$("[data-cd]").forEach((el) => { el.innerHTML = el.dataset.cd === "mini" ? cdMini() : cdInner(); });
    const d = istDay();
    if (d !== lastListDay) { lastListDay = d; $$(".puja-list").forEach((ul) => { ul.outerHTML = pujaList(); }); }
  }

  function hideSplash() {
    const sp = $("#splash");
    if (!sp || sp.classList.contains("out")) return;
    sp.classList.add("out");
    setTimeout(() => sp.remove(), 450);
  }

  // ---------- themed confirm dialog (replaces the browser's plain confirm popup) ----------
  // ask({ title, text, ok, danger, icon }) → Promise<boolean>
  function ask({ title, text = "", ok = "OK", cancel = "Cancel", danger = false, icon = "" }) {
    return new Promise((resolve) => {
      const wrap = document.createElement("div");
      wrap.className = "ask-wrap";
      wrap.innerHTML = `
        <div class="ask" role="alertdialog" aria-modal="true" aria-labelledby="askT">
          ${icon ? `<div class="ask-ico ${danger ? "danger" : ""}">${icon}</div>` : ""}
          <h3 id="askT">${title}</h3>
          ${text ? `<p>${text}</p>` : ""}
          <div class="ask-btns">
            <button class="btn ghost" data-a="0">${esc(cancel)}</button>
            <button class="btn ${danger ? "red" : ""}" data-a="1">${esc(ok)}</button>
          </div>
        </div>`;
      const done = (v) => {
        wrap.classList.add("out");
        document.removeEventListener("keydown", key, true);
        setTimeout(() => wrap.remove(), 180);
        resolve(v);
      };
      const key = (e) => {
        if (e.key === "Escape") { e.stopPropagation(); done(false); }
        if (e.key === "Enter") { e.preventDefault(); done(true); }
      };
      wrap.addEventListener("click", (e) => {
        const b = e.target.closest("[data-a]");
        if (b) done(b.dataset.a === "1");
        else if (e.target === wrap) done(false);
      });
      document.addEventListener("keydown", key, true);
      document.body.appendChild(wrap);
      setTimeout(() => wrap.querySelector('[data-a="1"]').focus(), 30);
    });
  }
  const B = (t) => `<b>${esc(t)}</b>`;

  // ---------- watermark ----------
  const CREDIT = `<div class="credit">Created by <b>nucant</b>
    <span><a href="https://instagram.com/n4cun1" target="_blank" rel="noopener">Instagram</a> ·
    <a href="https://fb.com/n4cun1" target="_blank" rel="noopener">Facebook</a> ·
    <a href="https://x.com/n4cun1" target="_blank" rel="noopener">X</a></span></div>`;

  // ---------- toast ----------
  let tt;
  function toast(msg, bad) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast show" + (bad ? " bad" : "");
    clearTimeout(tt);
    tt = setTimeout(() => (t.className = "toast"), bad ? 3500 : 2000);
  }

  // ---------- boot ----------
  function boot() {
    document.title = CFG.TITLE || document.title;
    $("#title").innerHTML = `${esc(CFG.TITLE || "Chanda " + YEAR)}<sup>v2</sup>`;
    $("#titleBn").textContent = CFG.TITLE_BN || "";
    $("#btnRefresh").innerHTML = I.refresh;
    $("#btnHistory").innerHTML = I.clock;
    $("#btnAdd").innerHTML = I.plus + "<span>Add name</span>";
    // one search box, moved between the mobile toolbar and the desktop header
    $("#mobSearchWrap").innerHTML = `<span id="searchInner" style="display:contents">
      <span class="search-ico">${I.search}</span>
      <input id="q" type="search" inputmode="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Search name / নাম খুঁজুন">
      <button class="search-clear" id="qClear" aria-label="Clear search" hidden>×</button></span>`;

    $("#btnRefresh").onclick = () => load(false);
    $("#btnHistory").onclick = () => openHistory();
    $("#btnMe").onclick = openProfile;
    $("#toTop").innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    $("#toTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    let topTick = false;
    window.addEventListener("scroll", () => {
      if (topTick) return; topTick = true;
      requestAnimationFrame(() => { $("#toTop").classList.toggle("show", window.scrollY > 500); topTick = false; });
    }, { passive: true });
    $("#btnSettings").innerHTML = I.gear;
    $("#btnSettings").onclick = openSettings;
    $("#tabbar").innerHTML = `
      <button data-tab="home" class="on">${I.home}<span>Home</span></button>
      <button data-tab="history">${I.clock}<span>History</span></button>
      <button data-tab="add" class="tab-add" aria-label="Add name"><i>${I.plus}</i><span>Add</span></button>
      <button data-tab="expenses">${I.wallet}<span>Expenses</span></button>
      <button data-tab="settings">${I.gear}<span>Settings</span></button>`;
    $("#tabbar").onclick = (e) => {
      const b = e.target.closest("[data-tab]"); if (!b) return;
      const t = b.dataset.tab;
      if (t === "add") (S.tab === "expenses" ? openExpForm() : openAdd());
      else if (t === "history") openHistory();
      else if (t === "settings") openSettings();
      else if (t === S.tab) window.scrollTo({ top: 0, behavior: "smooth" });
      else { closeSheet(); setTab(t); }
    };
    $("#btnAdd").onclick = () => (S.tab === "expenses" ? openExpForm() : openAdd());
    $("#btnExp").onclick = () => { closeSheet(); setTab(S.tab === "expenses" ? "home" : "expenses"); };
    $("#backdrop").onclick = () => closeSheet();
    $("#sheet").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeSheet(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSheet();
      if (e.key === "/" && S.desk && !$("#app").hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); $("#q").focus(); }
    });

    let qt;
    $("#q").addEventListener("input", (e) => {
      clearTimeout(qt);
      $("#qClear").hidden = !e.target.value;
      qt = setTimeout(() => { S.q = e.target.value.trim(); renderList(); }, 120);
    });
    $("#qClear").onclick = () => { $("#q").value = ""; S.q = ""; $("#qClear").hidden = true; renderList(); $("#q").focus(); };
    const pickSec = (e) => {
      const b = e.target.closest("[data-sec]"); if (!b) return;
      S.section = b.dataset.sec; store.set("section", S.section); render();
    };
    $("#sections").onclick = pickSec;
    $("#deskFilters").onclick = pickSec;
    $("#status").onclick = (e) => {
      const b = e.target.closest("[data-st]"); if (!b) return;
      S.status = b.dataset.st; renderStatus(); renderList();
    };
    $("#list").onclick = (e) => {
      const s = e.target.closest("th[data-sort]");
      if (s) {
        const k = s.dataset.sort;
        S.sort = S.sort.k === k ? { k, dir: -S.sort.dir } : { k, dir: k === "en" || k === "sl" ? 1 : -1 };
        renderList(); return;
      }
      const b = e.target.closest("[data-row]"); if (b) openPerson(Number(b.dataset.row));
    };

    if (desktopMQ.addEventListener) desktopMQ.addEventListener("change", onModeChange); else desktopMQ.addListener(onModeChange);
    matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", applyTheme);
    window.addEventListener("resize", measure);
    window.addEventListener("online", runQueue);
    window.addEventListener("beforeunload", (e) => { if (S.queue.length) { e.preventDefault(); e.returnValue = ""; } });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) runQueue();
      if (!document.hidden && S.pass && S.api && !$("#app").hidden && Date.now() - S.lastLoad > 60000 && $("#sheetWrap").hidden) load(true);
    });

    setInterval(tickPuja, 1000);
    renderSync();
    setInterval(autoTick, 5000);
    if (S.user && S.pass && S.api) {
      enterApp();                                   // cached list renders under the splash
      const t0 = Date.now();
      const fail = setTimeout(hideSplash, 7000);    // slow network: show cached data anyway
      load(true, true).finally(() => { clearTimeout(fail); setTimeout(hideSplash, Math.max(0, 900 - (Date.now() - t0))); });
    } else {
      showProfiles();
      setTimeout(hideSplash, 900);
    }
  }

  boot();
})();
