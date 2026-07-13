from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

HEADNAV = (BASE_DIR / "part_head_nav.html").read_text(encoding="utf-8")
FOOTER  = (BASE_DIR / "part_footer.html").read_text(encoding="utf-8")

# Sections built from the audited, debranded, Distinguished-Principal-framed draft.
# Illustrated stand-ins, capture placeholders, and inline SVG icons are already
# embedded in the section HTML below (see references/case-studies/conversational-ui-kit/README.md
# for the audit trail against the original raw draft).

HERO = r'''<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-tag">Conversational UI &nbsp;·&nbsp; Design System &nbsp;·&nbsp; Org-Level Impact</div>
    <h1>One system, <em>many teams.</em></h1>
    <p class="hero-sub">A platform migration and org merger meant teams could no longer maintain their own chat UIs. Engineering and product brought me the problem. I defined the system, built and mentored a contributor team, and handed it to the standing teams to maintain.</p>
    <div class="hero-meta">
      <div class="hero-meta-item"><div class="hm-label">Role</div><div class="hm-val">Principal Product Designer</div></div>
      <div class="hero-meta-item"><div class="hm-label">Scope</div><div class="hm-val">Strategy &nbsp;·&nbsp; Team &nbsp;·&nbsp; System &nbsp;·&nbsp; Governance</div></div>
      <div class="hero-meta-item"><div class="hm-label">Products</div><div class="hm-val">AI shopping assistant &nbsp;·&nbsp; Support chat &nbsp;·&nbsp; Staff tools</div></div>
      <div class="hero-meta-item"><div class="hm-label">Status</div><div class="hm-val">In build &nbsp;·&nbsp; SDK shipping Q3/Q4</div></div>
    </div>
  </div>
</section>
'''

PROBLEM = r'''<!-- PROBLEM -->
<section class="section">
  <div class="section-inner">
    <div class="eyebrow">The Problem</div>
    <h2 class="section-title">The platform changed. The UI hadn't.</h2>
    <p class="section-lead">Two structural changes were happening at once. Neither could work without a shared UI foundation that didn't exist yet.</p>

    <div class="forcing-functions">
      <div class="ff-card ff-platform">
        <div class="ff-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
        <div class="ff-content">
          <div class="ff-label">Platform migration</div>
          <h3>Moving to a closed framework that requires tokens and theming</h3>
          <p>The org was moving all products to a new closed framework. It requires shared tokens and theming. Teams could no longer maintain their own UI. Everyone would have to rebuild to spec.</p>
        </div>
      </div>
      <div class="ff-card ff-org">
        <div class="ff-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg></div>
        <div class="ff-content">
          <div class="ff-label">Org consolidation</div>
          <h3>Merging the "hallways": separate platforms for separate markets</h3>
          <p>Separate markets had built their own platforms. Now they were merging. The UIs weren't just different, they were incompatible. Unifying them needed one shared foundation supporting many brands and surfaces.</p>
        </div>
      </div>
    </div>

    <div class="ff-result">
      <p>The ask from engineering and PM was clear: support multi-tenancy and theming at scale, and stop teams managing it alone. We need a system. What should it be?</p>
    </div>

    <div class="ph">
      <div class="illustrated-ui-grid">
        <div class="ui-grid-label">The same interaction. Six different implementations.</div>
        <div class="ui-swatch-grid">
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#f5a623;">
              <div class="ui-swatch-dot" style="background:#f5a623;border:2px solid rgba(255,255,255,0.5);"></div>
              <div class="ui-swatch-name">Shopping Assistant</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-shop">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-shop">We're open 9 to 9, seven days a week.</div>
            <div class="ui-helpful">Was this helpful? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L13 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg></div>
          </div>
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#0052e2;">
              <div class="ui-swatch-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div class="ui-swatch-name">Main Storefront</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-storefront">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-storefront">We're open 9 to 9, seven days a week.</div>
            <div class="ui-helpful">Was this helpful? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L13 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg></div>
          </div>
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#007dc6;">
              <div class="ui-swatch-icon" style="color:#fff;">⏳</div>
              <div class="ui-swatch-name">Regional Market</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-market">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-market">We're open 9 to 9, seven days a week.</div>
            <div class="ui-helpful">Was this helpful? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L13 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg></div>
          </div>
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#003087;">
              <div class="ui-swatch-dot" style="background:#00a9e0;"></div>
              <div class="ui-swatch-name">Membership Club</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-club">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-club">We're open 9 to 9, seven days a week.</div>
          </div>
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#1a1a2e;">
              <div class="ui-swatch-dot" style="background:#6c63ff;"></div>
              <div class="ui-swatch-name">Support Agent</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-assist">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-assist">We're open 9 to 9, seven days a week.</div>
          </div>
          <div class="ui-swatch">
            <div class="ui-swatch-bar" style="background:#2d2d2d;">
              <div class="ui-swatch-initials">MC</div>
              <div class="ui-swatch-name">Seller Tools</div>
              <div class="ui-swatch-x">×</div>
            </div>
            <div class="ui-bubble b-merchant">Hi, how can I help?</div>
            <div class="ui-bubble b-user">What are your store hours?</div>
            <div class="ui-bubble b-merchant">We're open 9 to 9, seven days a week.</div>
          </div>
        </div>

      </div>
      <div class="ph-caption">Shopping assistant, storefront chat, regional markets, membership club, support agents, and seller tools. All built in isolation, none shareable.</div>
    </div>


    <div class="quote-grid three-col">
      <div class="tcard"><p class="tq">We do not have the design resources to build our own chatbot UI. We want guidelines or tools to create the essentials quickly.</p><div class="tn">A small product team</div><div class="tr">No design resources</div></div>
      <div class="tcard"><p class="tq">We have our own design resources, but our components are unique. They are not built for other teams to borrow.</p><div class="tn">A team with its own UI</div><div class="tr">Not portable</div></div>
      <div class="tcard"><p class="tq">Our tool is set to merge with another, but our UIs are inconsistent. When we merge, we would redo everything from scratch.</p><div class="tn">A team facing a merger</div><div class="tr">Forced rebuild</div></div>
    </div>

    <div class="ambig-box">
      <div class="ambig-icon">?</div>
      <div>
        <p class="ambig-head">This is where design came in.</p>
        <p class="ambig-body">They knew what was needed: a shared, themeable, multi-tenant chat system. They didn't know what it should look like, how to govern it, or who should build it. That was the design problem.</p>
      </div>
    </div>
  </div>
</section>
'''

DEFINING = r'''<!-- DEFINING THE WORK -->
<section class="section alt">
  <div class="section-inner">
    <div class="eyebrow">Defining the Work</div>
    <h2 class="section-title">The problem was clear. The solution wasn't.</h2>
    <p class="section-lead">My job was to turn a technical mandate into a system teams could actually adopt.</p>

    <div class="define-steps">

      <div class="define-step">
        <div class="ds-marker">01</div>
        <div class="ds-content">
          <h3>Understand each team's position in the migration</h3>
          <p>The migration hit everyone, but from different starting points (see the three teams above). The system had to serve all of them at once, not just the best-resourced.</p>
        </div>
      </div>

      <div class="define-step">
        <div class="ds-marker">02</div>
        <div class="ds-content">
          <h3>Map what existed and what the framework required</h3>
          <p>The Core Design System had the atoms. The new framework required tokens and theming at the system level, not team by team. Local components weren't token-compliant. Nothing was structured for what the framework now required.</p>
          <div class="capture-ph">
            <div class="cap-badge">Screenshot · Figma</div>
            <div class="cap-title">Audit spread</div>
            <div class="cap-desc">Side-by-side audit of existing chat UIs across products, annotated to show what was token-compliant, what needed migration, and what had to be rebuilt.</div>
          </div>
        </div>
      </div>

      <div class="define-step">
        <div class="ds-marker">03</div>
        <div class="ds-content">
          <h3>Translate the technical mandate into design goals</h3>
          <p>Multi-tenancy and theming weren't optional features. They were requirements the framework imposed. The design goals had to start there and work outward.</p>
          <div class="define-goals">
            <div class="dg-item"><div class="dg-label">Goal 1</div><div class="dg-text">Multi-tenant and themeable from day one. Every component had to support multiple brands and surfaces without a rebuild.</div></div>
            <div class="dg-item"><div class="dg-label">Goal 2</div><div class="dg-text">Remove duplication across the merging markets. One shared system replacing the independent builds each market had maintained.</div></div>
            <div class="dg-item"><div class="dg-label">Goal 3</div><div class="dg-text">Clear starting points for every team, wherever they were starting from.</div></div>
          </div>
          <div class="capture-ph">
            <div class="cap-badge">Screenshot · Planning doc</div>
            <div class="cap-title">Project brief</div>
            <div class="cap-desc">The brief developed with engineering and PM: migration requirements, multi-tenancy scope, and what design owned versus what the platform would handle.</div>
          </div>
        </div>
      </div>

      <div class="define-step">
        <div class="ds-marker">04</div>
        <div class="ds-content">
          <h3>Make the hard call: patterns and recipes, not just components</h3>
          <p>A component library was the obvious answer. Faster to build, easier to scope. But it solves a delivery problem, not a design one. Teams didn't just need shared buttons. They needed shared thinking for each use case.</p>
          <div class="tradeoff-box">
            <div class="tb-col">
              <div class="tb-label">What we didn't build</div>
              <p>A component library. Fast to ship, but teams would still make the same design decisions alone. Fragmentation would just move up one layer.</p>
            </div>
            <div class="tb-divider"></div>
            <div class="tb-col">
              <div class="tb-label">What we built instead</div>
              <p>A pattern and recipe system on top of shared components. Slower to define, but it solved the real problem: how to design well for each use case.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
'''

SCOPE = r'''<!-- SCOPE -->
<section class="section">
  <div class="section-inner">
    <div class="eyebrow">The Scope</div>
    <h2 class="section-title">Not a component kit. A pattern system for three different experiences.</h2>
    <p class="section-lead">The chat experiences weren't variations of one thing. They were three distinct use cases, each with its own interaction model. Treat them the same and all three break.</p>

    <div class="use-case-grid">

      <div class="uc-card">
        <div class="uc-header" style="background:#011e60;">
          <div class="uc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
          <div class="uc-type">AI Shopping Assistant</div>
        </div>
        <div class="uc-body">
          <div class="uc-example">Shopping assistant, storefront</div>
          <p class="uc-desc">Proactive. The bot initiates, surfaces products, handles rich media. Users are browsing.</p>
          <div class="uc-patterns">
            <div class="uc-pat-label">Patterns needed</div>
            <div class="uc-chips">
              <span class="uc-chip">Product carousel</span>
              <span class="uc-chip">Image-rich bubbles</span>
              <span class="uc-chip">Quick reply suggestions</span>
              <span class="uc-chip">Persistent FAB launcher</span>
              <span class="uc-chip">Click-to-play</span>
            </div>
          </div>
        </div>
      </div>

      <div class="uc-card">
        <div class="uc-header" style="background:#1a3a5c;">
          <div class="uc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div>
          <div class="uc-type">AI Support Agent</div>
        </div>
        <div class="uc-body">
          <div class="uc-example">Support center, customer care</div>
          <p class="uc-desc">Resolution-focused. The user has a problem. Trust is lower, stakes are higher. Structure matters more than richness.</p>
          <div class="uc-patterns">
            <div class="uc-pat-label">Patterns needed</div>
            <div class="uc-chips">
              <span class="uc-chip">Structured response cards</span>
              <span class="uc-chip">Feedback rail</span>
              <span class="uc-chip">Escalation to agent</span>
              <span class="uc-chip">Session header + collapse</span>
              <span class="uc-chip">Disclaimer banners</span>
            </div>
          </div>
        </div>
      </div>

      <div class="uc-card">
        <div class="uc-header" style="background:#0d3b2e;">
          <div class="uc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div class="uc-type">Person-to-Person Chat</div>
        </div>
        <div class="uc-body">
          <div class="uc-example">Delivery chat, staff tools</div>
          <p class="uc-desc">Two humans, not a bot. Real-time, presence-aware. Can't be treated as a variant of AI chat.</p>
          <div class="uc-patterns">
            <div class="uc-pat-label">Patterns needed</div>
            <div class="uc-chips">
              <span class="uc-chip">Typing indicator</span>
              <span class="uc-chip">Read receipts</span>
              <span class="uc-chip">Presence state</span>
              <span class="uc-chip">Media attachment</span>
              <span class="uc-chip">Dual-avatar header</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="scope-note">
      All three share a base layer: bubbles, input bar, avatars, timestamps. The patterns and recipes on top are entirely different for each. The base had to be flexible. The recipe layer had to be specific.
    </div>

    <h3 class="subsection-head" style="margin-top:2.5rem;">And across three platforms</h3>
    <p style="font-size:0.9rem;color:var(--muted);line-height:1.7;margin-top:0.6rem;margin-bottom:1.25rem;">Desktop web, native iOS and Android, and React Native. Each with a different token pipeline. A component that worked on web could break on native.</p>

    <div class="platform-matrix">
      <div class="pm-header">
        <div class="pm-corner"></div>
        <div class="pm-col-head">Desktop Web</div>
        <div class="pm-col-head">Native iOS / Android</div>
        <div class="pm-col-head">React Native</div>
      </div>
      <div class="pm-row">
        <div class="pm-row-label">AI Shopping Assistant</div>
        <div class="pm-cell pm-yes">Carousel · FAB · rich media</div>
        <div class="pm-cell pm-yes">Full-screen · native SDK</div>
        <div class="pm-cell pm-yes">React Native SDK</div>
      </div>
      <div class="pm-row">
        <div class="pm-row-label">AI Support Agent</div>
        <div class="pm-cell pm-yes">Widget · collapse pattern</div>
        <div class="pm-cell pm-yes">Sheet · native SDK</div>
        <div class="pm-cell pm-yes">React Native SDK</div>
      </div>
      <div class="pm-row">
        <div class="pm-row-label">Person-to-Person</div>
        <div class="pm-cell pm-yes">Full window · presence</div>
        <div class="pm-cell pm-yes">Messaging UI · native</div>
        <div class="pm-cell pm-partial">In scope · P2</div>
      </div>
      <div class="pm-row pm-row-infra">
        <div class="pm-row-label">Token pipeline</div>
        <div class="pm-cell pm-infra">Design system tokens</div>
        <div class="pm-cell pm-infra">Platform SDK tokens</div>
        <div class="pm-cell pm-infra">Engineering SDK path</div>
      </div>
    </div>

    <div class="resolved" style="margin-top:1.75rem;">
      <p><strong>The implication:</strong> every design decision had to hold across all three use cases and all three platforms. Not just the screen in front of you.</p>
    </div>
  </div>
</section>
'''

ALIGNMENT = r'''<!-- ALIGNMENT -->
<section class="section">
  <div class="section-inner">
    <div class="eyebrow">Building the Team</div>
    <h2 class="section-title">I didn't build this alone. That was the point.</h2>
    <p class="section-lead">A system built by one person fails when that person leaves. So I built it to be owned by many: contributors I recruited from across the org, mentored on a new process, then handed to the standing teams to maintain.</p>

    <div class="tension-timeline">
      <div class="tt-item tt-friction">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">The starting conditions</div>
          <p>The Core Design System and the platform were on separate timelines. Engineering was reconciling two sources of truth by hand. No shared process, no shared tooling. Design wasn't in the room yet.</p>
        </div>
      </div>
      <div class="tt-item tt-friction">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">Being first had a cost</div>
          <p>We were the first team to run end-to-end on the platform. There was no playbook for this process. We had to invent it, then teach it.</p>
        </div>
      </div>
      <div class="tt-item tt-win">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">Contributors, not headcount</div>
          <p>I didn't have a standing team. I recruited designers from across product teams to contribute to the work. I made the case to leadership for their time. Each brought product knowledge no central team could replicate.</p>
        </div>
      </div>
      <div class="tt-item tt-win">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">Mentoring on a new process</div>
          <p>None of the contributors had built a design system this way. I mentored them through it: the audit method, the pattern-and-recipe model, token discipline, and reviews. Leading through influence, not authority, since they didn't report to me.</p>
        </div>
      </div>
      <div class="tt-item tt-win">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">Design leadership buy-in</div>
          <p>I showed leadership that embedded expertise would build a better, more adopted system than a central team alone, and cost less in rework. They committed the contributors' time.</p>
        </div>
      </div>
      <div class="tt-item tt-win">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">How we stayed coordinated</div>
          <p>Weekly syncs with engineering and product. Batched reviews with the full team. A shared intake tracker. Clear ownership so decisions didn't require escalation.</p>
        </div>
      </div>
      <div class="tt-item tt-win">
        <div class="tt-dot"></div>
        <div class="tt-body">
          <div class="tt-label">Then I handed it off</div>
          <p>Once the system was proven, I transferred maintenance to the standing engineering and design teams. I built it to be owned by them, not to depend on me. That was the goal from the start.</p>
        </div>
      </div>
    </div>

    <div class="resolved">
      <p><strong>The leadership move:</strong> don't build the system yourself. Bring together the people who can, mentor them through a process no one had run before, then hand off ownership so it outlasts you.</p>
    </div>

    <div class="capture-ph" style="margin-top:1.75rem;">
      <div class="cap-badge">Screenshot · Slide</div>
      <div class="cap-title">Team structure</div>
      <div class="cap-desc">The team map: contributors recruited from across product teams, the leadership commitment that resourced them, and the standing teams that took over maintenance.</div>
    </div>
  </div>
</section>
'''

PROCESS = r'''<!-- THE PROCESS -->
<section class="section alt">
  <div class="section-inner">
    <div class="eyebrow">The Process</div>
    <h2 class="section-title">A repeatable loop, not a one-off.</h2>
    <p class="section-lead">With alignment in place, the work followed a clear loop. Any team joining later can follow the same steps.</p>
    <div class="journey">

      <div class="journey-item mood-progress">
        <div class="ji-left"><div class="ji-date">Audit</div><div class="ji-phase">Map what exists</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right"><p class="ji-story">Audit existing chat screens across consumer, staff, and enterprise products. Build from what's real, not assumptions.</p></div>
      </div>

      <div class="journey-item mood-progress">
        <div class="ji-left"><div class="ji-date">Recipes</div><div class="ji-phase">Find the repeating flows</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right">
          <p class="ji-story">Start from user flows to surface recipe patterns: the common interaction shapes every chatbot reuses. Break each recipe into element-level UI patterns.</p>
          <div class="capture-ph capture-ph-sm">
            <div class="cap-badge">Screenshot · Figma</div>
            <div class="cap-title">Recipe output</div>
            <div class="cap-desc">A generated recipe in Figma: entry point, setup screens, and native components pulled into a working file with instructions attached.</div>
          </div>
        </div>
      </div>

      <div class="journey-item mood-progress">
        <div class="ji-left"><div class="ji-date">Analysis</div><div class="ji-phase">Group and prioritize</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right">
          <p class="ji-story">Group patterns in Airtable with effort levels, timelines, and designer ownership. Track actual progress, not just a wishlist.</p>
          <div class="capture-ph capture-ph-sm">
            <div class="cap-badge">Screenshot · Airtable</div>
            <div class="cap-title">Pattern analysis tracker</div>
            <div class="cap-desc">The build tracker during the analysis phase: patterns grouped by category, effort level, and priority before any component work begins.</div>
          </div>
        </div>
      </div>

      <div class="journey-item mood-win">
        <div class="ji-left"><div class="ji-date">Review</div><div class="ji-phase">Test with the teams</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right">
          <p class="ji-story">Review components in batches with the contributor team: patterns, design system tokens, naming, accessibility, and engineering specs for the SDK.</p>
          <div class="ji-win"><strong>Learned:</strong> reviews only work with full attendance. The shared review template made that consistent.</div>
        </div>
      </div>

      <div class="journey-item mood-progress">
        <div class="ji-left"><div class="ji-date">Build</div><div class="ji-phase">Assemble the hierarchy</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right"><p class="ji-story">I set the architecture: the design system provides the atoms, the chat system extends upward into molecules, organisms, and templates. The team built the components against it, each named precisely so any team can navigate without asking.</p></div>
      </div>

      <div class="journey-item mood-progress">
        <div class="ji-left"><div class="ji-date">Document</div><div class="ji-phase">Write it down</div></div>
        <div class="ji-mid"><div class="ji-dot"></div></div>
        <div class="ji-right">
          <p class="ji-story">Design guidelines, token references, engineering specs, and accessibility annotations. Any designer or engineer on any team can pick up a component cold.</p>
          <div class="ji-win"><strong>The multiplier:</strong> I designed the review template, onboarding structure, and contribution path so partner designers could contribute without me in the room.</div>
          <div class="ji-note"><strong>Output:</strong> one unified payload, branched to engineering and versioned after handoff.</div>
        </div>
      </div>

    </div>
    <div class="ph">
      <div class="illustrated-comp-doc">
        <div class="cd-header">
          <div class="cd-tag">[CHAT] Chat Header-collapsed</div>
          <div class="cd-status">Published · Branched</div>
        </div>
        <div class="cd-body">
          <div class="cd-col cd-anatomy">
            <div class="cd-section-label">Anatomy</div>
            <div class="cd-anatomy-diagram">
              <div class="cd-bubble-wrap">
                <div class="cd-callout ca1">1</div>
                <div class="cd-mock-bubble">
                  <div class="cd-avatar"></div>
                  <div class="cd-bubble-body">
                    <div class="cd-bubble-line long"></div>
                    <div class="cd-bubble-line short"></div>
                    <div class="cd-callout ca2">2</div>
                    <div class="cd-callout ca3">3</div>
                  </div>
                </div>
                <div class="cd-callout ca4">4</div>
              </div>
              <div class="cd-legend">
                <div class="cd-leg-item"><span class="cd-num">1</span>Avatar · 32px</div>
                <div class="cd-leg-item"><span class="cd-num">2</span>bubble/bg · color.fill token</div>
                <div class="cd-leg-item"><span class="cd-num">3</span>Body/SM · text token</div>
                <div class="cd-leg-item"><span class="cd-num">4</span>Timestamp · Caption</div>
              </div>
            </div>
          </div>
          <div class="cd-col cd-tokens">
            <div class="cd-section-label">Tokens (design system taxonomy)</div>
            <div class="cd-token-list">
              <div class="cd-token"><div class="cd-swatch" style="background:#0052e2"></div><span>color.fill.brand</span></div>
              <div class="cd-token"><div class="cd-swatch" style="background:#eef5ff"></div><span>color.background.subtle</span></div>
              <div class="cd-token"><div class="cd-swatch" style="background:#e3e4e5"></div><span>color.border.subtle</span></div>
            </div>
            <div class="cd-section-label" style="margin-top:1rem">States</div>
            <div class="cd-states">
              <div class="cd-state">default</div>
              <div class="cd-state active">selected</div>
              <div class="cd-state">loading</div>
              <div class="cd-state">error</div>
            </div>
            <div class="cd-a11y" style="margin-top:1rem;">
              <div class="cd-a11y-label">A11y · Reviewed</div>
              <div class="cd-a11y-item">role="log" on container</div>
              <div class="cd-a11y-item">aria-label on avatar</div>
              <div class="cd-a11y-item">4.5:1 contrast · all states</div>
            </div>
          </div>
          <div class="cd-col cd-specs">
            <div class="cd-section-label">Engineering specs · SDK</div>
            <div class="cd-spec-block">
              <div class="cd-spec-row"><span class="cd-spec-k">Padding</span><span class="cd-spec-v">12px 16px</span></div>
              <div class="cd-spec-row"><span class="cd-spec-k">Radius</span><span class="cd-spec-v">16px / 4px</span></div>
              <div class="cd-spec-row"><span class="cd-spec-k">Max-width</span><span class="cd-spec-v">72%</span></div>
              <div class="cd-spec-row"><span class="cd-spec-k">Platform</span><span class="cd-spec-v">React · ReactNative</span></div>
            </div>
            <div class="cd-section-label" style="margin-top:0.9rem">Branch</div>
            <div class="cd-spec-block">
              <div class="cd-spec-row"><span class="cd-spec-k">Ticket</span><span class="cd-spec-v">#235 - Avatar-image</span></div>
              <div class="cd-spec-row"><span class="cd-spec-k">Status</span><span class="cd-spec-v">Merged · archived</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ph-caption">Every component ships with anatomy, design token references, engineering specs for the SDK, and accessibility annotations reviewed by the a11y team.</div>
    </div>

    <h3 class="subsection-head" style="margin-top:2.5rem;">How it fits into the Core Design System</h3>
    <div class="ph">
      <div class="illustrated-atomic">
        <div class="atomic-label">How the chat system fits into the Core Design System stack</div>
        <div class="atomic-row">
          <div class="atomic-layer al-ld">
            <div class="al-tag">Core Design System</div>
            <div class="al-title">Atoms &amp; Foundations</div>
            <div class="al-chips">
              <span class="al-chip">Color tokens</span>
              <span class="al-chip">Type scale</span>
              <span class="al-chip">Spacing</span>
              <span class="al-chip">Icon set</span>
              <span class="al-chip">644 components</span>
            </div>
          </div>
          <div class="atomic-arrow">+</div>
          <div class="atomic-layer al-platform">
            <div class="al-tag">Platform SDK</div>
            <div class="al-title">Atoms &amp; Foundations</div>
            <div class="al-chips">
              <span class="al-chip">Platform tokens</span>
              <span class="al-chip">Product themes</span>
              <span class="al-chip">Accessibility base</span>
            </div>
          </div>
          <div class="atomic-arrow">→</div>
          <div class="atomic-layer al-uckit al-highlight">
            <div class="al-tag">Conversational UI Kit</div>
            <div class="al-title">Molecules → Organisms → Templates</div>
            <div class="al-chips">
              <span class="al-chip chip-bright">834 components</span>
              <span class="al-chip chip-bright">50 variables</span>
              <span class="al-chip">Chat Bubble</span>
              <span class="al-chip">Input Bar</span>
              <span class="al-chip">Headers</span>
              <span class="al-chip">Avatars</span>
              <span class="al-chip">Quick Replies</span>
              <span class="al-chip">Carousels</span>
            </div>
          </div>
          <div class="atomic-arrow">→</div>
          <div class="atomic-layer al-recipes">
            <div class="al-tag">Recipes</div>
            <div class="al-title">Automated user flow outputs</div>
            <div class="al-chips">
              <span class="al-chip">Prompt-based</span>
              <span class="al-chip">Detached on generation</span>
              <span class="al-chip">Instructions included</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ph-caption">The chat system extends the Core Design System upward, from atoms to full interaction templates, and bridges all the way to automated recipe outputs.</div>
    </div>
  </div>
</section>
'''

GOVERNANCE = r'''<!-- GOVERNANCE -->
<section class="section">
  <div class="section-inner">
    <div class="eyebrow">Governance</div>
    <h2 class="section-title">Owned, reviewed, open to contribute.</h2>
    <p class="section-lead">The system only stays accurate if ownership is clear. I defined the governance model for that, now and as it scales.</p>

    <h3 class="subsection-head">The naming taxonomy</h3>
    <p style="font-size:0.9rem;color:var(--muted);line-height:1.7;margin-top:0.6rem;margin-bottom:1.25rem;">Every component name encodes its layer: whether it's in code, who owns it, and how it relates to others. That consistency makes automation possible and keeps the system navigable as more teams contribute.</p>
    <div class="ph">
      <div class="illustrated-hierarchy">
        <div class="hier-label">Component naming taxonomy · How to read any component</div>
        <div class="hier-levels">
          <div class="hier-level hl-published">
            <div class="hl-badge">Global · Published</div>
            <div class="hl-title-wrap">
              <div class="hl-title"><code>[CHAT]</code> Chat Header-collapsed</div>
              <div class="hl-desc">Prefix in all caps · Title Case name · hyphen-variant · built in code · locked tokens</div>
            </div>
            <div class="hl-chips"><span class="hc">[CHAT] ChatBubble</span><span class="hc">[CHAT] InputBar</span><span class="hc">[CHAT] Avatar-image</span><span class="hc">[CHAT] ChatHeader-collapsed</span></div>
          </div>
          <div class="hier-arrow">↓ Reviewed &amp; merged by a second designer · archived in versioning</div>
          <div class="hier-level hl-sub">
            <div class="hl-badge">Subcomponent</div>
            <div class="hl-title-wrap">
              <div class="hl-title"><code>Action / Collapsible + Close-default</code></div>
              <div class="hl-desc">No prefix · Parent / Slash / Name · not built in code · feeds into published components</div>
            </div>
            <div class="hl-chips"><span class="hc">Action / Collapsible + Close</span><span class="hc">Feedback / ThumbsUp &amp; Down</span><span class="hc">Input / SendButton</span></div>
          </div>
          <div class="hier-arrow">↓ Base building blocks</div>
          <div class="hier-level hl-base">
            <div class="hl-badge">Base</div>
            <div class="hl-title-wrap">
              <div class="hl-title"><code>.icon buttons-feedback</code></div>
              <div class="hl-desc">Period prefix · lower case · never published · nested inside larger components</div>
            </div>
            <div class="hl-chips"><span class="hc">.icon buttons-feedback</span><span class="hc">.avatar-dot</span><span class="hc">.status-pill</span></div>
          </div>
          <div class="hier-arrow">↓ Foundation</div>
          <div class="hier-level hl-atom">
            <div class="hl-badge">Atoms · From design system</div>
            <div class="hl-title-wrap">
              <div class="hl-title"><code>[CORE] IconButton</code> &nbsp;/&nbsp; <code>[CHAT] IconButton/React-Native-inverse</code></div>
              <div class="hl-desc">The chat kit only adds atoms when the Core Design System doesn't cover the gap (e.g. React Native + dark background support)</div>
            </div>
            <div class="hl-chips"><span class="hc">color tokens</span><span class="hc">Type scale</span><span class="hc">Spacing</span><span class="hc">Radius</span></div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="subsection-head" style="margin-top:2.5rem;">How the system stays current</h3>
    <div class="unlock-grid" style="margin-top:1rem;">
      <div class="unlock"><h4>Intake and tracking</h4><p>Contributors and product teams submit requests via a shared tracker. Every component is logged with designer ownership, effort level, and design file links.</p></div>
      <div class="unlock"><h4>Batched reviews</h4><p>The full contributor team reviews components in batches before anything merges. Domain expertise from each product team shapes every decision.</p></div>
      <div class="unlock"><h4>Contribution path</h4><p>Any contributor can propose, build, and publish components. The path is documented so new contributors can join without needing to ask how.</p></div>
      <div class="unlock"><h4>Handoff to standing teams</h4><p>The handoff defined clear decision rights and escalation paths, so ownership moved with the authority to run it, not just the workload.</p></div>
    </div>

    <h3 class="subsection-head" style="margin-top:2.5rem;">The tooling stack</h3>
    <div class="tool-stack" style="margin-top:1rem;">
      <div class="tool-card"><div class="tool-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg></div><div><h4>Airtable</h4><p>Component intake, build tracking, and documentation. One source of truth for what's in flight.</p></div></div>
      <div class="tool-card"><div class="tool-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div><h4>Scripter + Automator</h4><p>Figma plugins that automate component builds, documentation exports, and recipe generation.</p></div></div>
      <div class="tool-card"><div class="tool-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div><h4>Video documentation</h4><p>Screen recordings embedded directly in design files for onboarding and review sessions.</p></div></div>
      <div class="tool-card"><div class="tool-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div><h4>Figma branching</h4><p>Ticket-named branches for every component. Designs lock after engineering handoff.</p></div></div>
    </div>

    <h3 class="subsection-head" style="margin-top:2.5rem;">One place to track it all</h3>
    <div class="ph">
      <div class="illustrated-tracker">
        <div class="tracker-header">
          <div class="tracker-title">Subsystem Planning Base &nbsp;·&nbsp; Build Tracker</div>
          <div class="tracker-meta">Build Tracker &nbsp;·&nbsp; Filtered by: Chat UI Kit</div>
        </div>
        <div class="tracker-table">
          <div class="tracker-thead">
            <div class="tc tc-name">Component Name</div>
            <div class="tc tc-sub">Subsystem</div>
            <div class="tc tc-acronym">Acronym</div>
            <div class="tc tc-owner">Designer</div>
            <div class="tc tc-status">Status</div>
          </div>
          <div class="tracker-row">
            <div class="tc tc-name">[CHAT] Chat Header</div><div class="tc tc-sub">Chat Header</div><div class="tc tc-acronym">CHAT</div><div class="tc tc-owner">Designer</div><div class="tc tc-status"><span class="ts-chip ts-done">Published</span></div>
          </div>
          <div class="tracker-row">
            <div class="tc tc-name">[CHAT] Chat Header-collapsed</div><div class="tc tc-sub">Chat Header-collapsed</div><div class="tc tc-acronym">CHAT</div><div class="tc tc-owner">Designer</div><div class="tc tc-status"><span class="ts-chip ts-done">Published</span></div>
          </div>
          <div class="tracker-row tracker-row-active">
            <div class="tc tc-name">[CHAT] Avatar-initials</div><div class="tc tc-sub">Avatar-initials</div><div class="tc tc-acronym">CHAT</div><div class="tc tc-owner">Designer</div><div class="tc tc-status"><span class="ts-chip ts-review">In review</span></div>
          </div>
          <div class="tracker-row">
            <div class="tc tc-name">[CHAT] Avatar-dynamic</div><div class="tc tc-sub">Avatar-dynamic</div><div class="tc tc-acronym">CHAT</div><div class="tc tc-owner">Designer</div><div class="tc tc-status"><span class="ts-chip ts-build">In build</span></div>
          </div>
          <div class="tracker-row">
            <div class="tc tc-name">[CHAT] Avatar-button</div><div class="tc tc-sub">Avatar-button</div><div class="tc tc-acronym">CHAT</div><div class="tc tc-owner">Designer</div><div class="tc tc-status"><span class="ts-chip ts-queue">Queued</span></div>
          </div>
        </div>
      </div>
      <div class="ph-caption">Airtable tracks every component from intake through published, with designer ownership, Figma links, and partner team access per role.</div>
    </div>
  </div>
</section>
'''

IMPACT = r'''<!-- IMPACT -->
<section class="section alt">
  <div class="section-inner">
    <div class="eyebrow">Impact</div>
    <h2 class="section-title">What changed.</h2>
    <p class="section-lead">The goal wasn't a design system. It was to change how product teams work, and to build something the org could reuse. These are the measures that matter.</p>

    <div class="impact-grid">
      <div class="impact-card">
        <div class="impact-num">[ # ]</div>
        <div class="impact-label">Product teams onboarded</div>
        <div class="impact-desc">Teams who adopted the system and shipped from a shared foundation instead of building alone.</div>
      </div>
      <div class="impact-card">
        <div class="impact-num">[ # ]</div>
        <div class="impact-label">Components published</div>
        <div class="impact-desc">Published, documented, and accessible to every team, covering all three use cases and platforms.</div>
      </div>
      <div class="impact-card">
        <div class="impact-num">[ # ]</div>
        <div class="impact-label">Engineering weeks saved</div>
        <div class="impact-desc">Estimated reduction in duplicated component work across teams per new chatbot product shipped.</div>
      </div>
      <div class="impact-card">
        <div class="impact-num">[ # ]</div>
        <div class="impact-label">Designers grown</div>
        <div class="impact-desc">Contributors I recruited and mentored on a process none had run before, then set up to continue the work independently.</div>
      </div>
    </div>

    <div class="capture-ph" style="margin-top:1.75rem;">
      <div class="cap-badge">Screenshot · Metrics</div>
      <div class="cap-title">Impact dashboard or OKR summary</div>
      <div class="cap-desc">Adoption metrics, engineering hours saved, or leadership reporting that captures the business value of the system.</div>
    </div>

    <div class="multiplier-block">
      <div class="mb-label">How it scales without scaling the team</div>
      <p>I recruited contributors, mentored them on a process none had run before, then transferred maintenance to the standing teams once it was proven. The goal from day one: build people and a process, not a dependency on me.</p>
      <div class="mb-stats">
        <div class="mb-stat"><span class="mb-num">[ # ]</span><span class="mb-text">Contributors I recruited and mentored on the process</span></div>
        <div class="mb-stat"><span class="mb-num">[ # ]</span><span class="mb-text">Components shipped by the contributor team</span></div>
        <div class="mb-stat"><span class="mb-num">✓</span><span class="mb-text">Maintenance handed to standing engineering and design teams</span></div>
      </div>
    </div>

    <div class="framework-block">
      <div class="fb-label">The biggest outcome: a reusable framework</div>
      <p>The chat kit was the first, not the only. The process, taxonomy, and governance I built became the blueprint the org now uses to stand up new kits. Each new domain follows the same pattern.</p>
      <div class="fb-kits">
        <div class="fb-kit fb-kit-done">
          <div class="fb-kit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div class="fb-kit-name">Conversational UI</div>
          <div class="fb-kit-status">Shipped, the first kit</div>
        </div>
        <div class="fb-kit">
          <div class="fb-kit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
          <div class="fb-kit-name">Agent Canvas</div>
          <div class="fb-kit-status">Built on the framework</div>
        </div>
        <div class="fb-kit">
          <div class="fb-kit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
          <div class="fb-kit-name">Maps</div>
          <div class="fb-kit-status">Built on the framework</div>
        </div>
        <div class="fb-kit">
          <div class="fb-kit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          <div class="fb-kit-name">Data Tables</div>
          <div class="fb-kit-status">Built on the framework</div>
        </div>
        <div class="fb-kit">
          <div class="fb-kit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
          <div class="fb-kit-name">Recipes &amp; more</div>
          <div class="fb-kit-status">Same pattern, new domains</div>
        </div>
      </div>
      <p style="margin-top:1rem;">A one-off design system solves one problem. A framework for building design systems solves every problem of that shape. That was the real deliverable.</p>
    </div>
  </div>
</section>
'''

CLOSING = r'''<!-- CLOSING -->
<section class="section dark">
  <div class="section-inner">
    <div class="eyebrow">What's Next</div>
    <h2 class="section-title">Still a long way to go.</h2>
    <p class="section-lead">The foundation is built and shipped. We're onboarding teams and running in maintenance mode. Next is scale.</p>

    <div class="capture-ph" style="margin-bottom:2rem;">
      <div class="cap-badge">Screenshot · Live product</div>
      <div class="cap-title">In production</div>
      <div class="cap-desc">The chat system components shipping in a live product experience: AI shopping assistant and support chat.</div>
    </div>

    <div style="margin-top:2rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:0.9rem;">On the roadmap</div>
      <div class="gen-journey four-step">
        <div class="gj-step done"><div class="gj-num">1</div><div class="gj-title">Build the foundation</div><div class="gj-desc">Audit, build, document, and review the core chat patterns with partner teams.</div></div>
        <div class="gj-step done"><div class="gj-num">2</div><div class="gj-title">Ship the SDK</div><div class="gj-desc">Engineering SDK P1-P2 in Q3/Q4. Native and React Native support.</div></div>
        <div class="gj-step current"><div class="gj-badge">We are here</div><div class="gj-num">3</div><div class="gj-title">Onboard and maintain</div><div class="gj-desc">Onboarding teams onto the system. Formalized intake. In maintenance mode, with teams requesting contributions.</div></div>
        <div class="gj-step"><div class="gj-num">4</div><div class="gj-title">Decentralize further</div><div class="gj-desc">Standing teams own maintenance. Next, expand contribution to every product team.</div></div>
      </div>
      <p style="font-size:0.8rem;color:rgba(255,255,255,0.5);margin-top:1.25rem;line-height:1.55;"><strong style="color:#fff;">Centralized, then decentralized.</strong> The goal is a system many teams own together.</p>
    </div>
    <div style="margin-top:2rem;padding:2rem;background:rgba(255,194,32,0.08);border:1px solid rgba(255,194,32,0.2);border-radius:8px;">
      <p style="font-size:1.15rem;line-height:1.6;color:#fff;font-style:italic;font-family:var(--font-head);">The measure of a design system isn't what it ships. It's how many teams build better because it exists.</p>
    </div>
  </div>
</section>
'''

body = "\n\n".join([HERO, PROBLEM, DEFINING, SCOPE, ALIGNMENT, PROCESS, GOVERNANCE, IMPACT, CLOSING])
html = HEADNAV + "\n" + body + "\n" + FOOTER
(BASE_DIR / "rebuilt.html").write_text(html, encoding="utf-8")
print("rebuilt.html written:", len(html)//1024, "KB")
