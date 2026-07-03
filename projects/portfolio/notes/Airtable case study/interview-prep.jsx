import { useState } from "react";

const C = {
  black:    "#0A0A0F",
  navy:     "#111827",
  navyMid:  "#1F2937",
  navyLight:"#374151",
  teal:     "#0EA5E9",
  green:    "#10B981",
  amber:    "#F59E0B",
  coral:    "#F43F5E",
  white:    "#FFFFFF",
  offWhite: "#F9FAFB",
  muted:    "#9CA3AF",
  mutedDark:"#6B7280",
};

const qa = [
  {
    category: "CONFLICT",
    color: C.coral,
    q: "Tell me about a time you had to balance design flexibility with engineering governance.",
    s: "17+ platform teams had fragmented tokens — each team maintained their own copy, leading to drift between what designers specified and what shipped to production.",
    t: "I needed to satisfy both design (collaboration, visibility) and engineering (automation, version control) without mandating a full tooling change for either side.",
    a: "I brokered a hybrid solution: Airtable as the human-readable source, transformed via Style Dictionary into JSON and synced through GitHub Actions CI. Designers kept Airtable. Engineers kept Git. The pipeline was the bridge.",
    r: "0% error rate post-launch and restored consistent dark mode support across all 17 platforms — something that had been broken for over a year due to the manual export process.",
  },
  {
    category: "IMPACT",
    color: C.teal,
    q: "Describe a situation where you identified a massive efficiency gap.",
    s: "Every token update required 2–3 days of manual coordination — a designer exported, handed off to an engineer, who manually verified and committed. Errors were common and rollbacks were painful.",
    t: "Reduce the manual handoff cycle and give designers a path to publish token changes directly — without requiring engineering intervention for routine updates.",
    a: "Designed the Airtable information architecture, defined the JSON contract with Zach, and oversaw implementation of the CI/CD pipeline end to end: Airtable → Style Dictionary → GitHub Actions → Artifactory.",
    r: "Token updates now take 10 minutes from edit to production across all platforms. 347 automated tests catch issues before they reach any consumer.",
  },
  {
    category: "TRUST",
    color: C.amber,
    q: "How do you handle stakeholder skepticism when introducing a new tool?",
    s: "Key stakeholders — including Living Design leadership and Global Tech — raised concerns about Airtable's cost model, long-term viability, and whether governance could actually be enforced at scale.",
    t: "Secure leadership buy-in and demonstrate that Airtable wasn't a risky experiment — but a well-governed, auditable system with safety nets.",
    a: "Created a clear RACI model to assign ownership, ran a live proof of concept with the WCP engineering lead, and implemented 347 automated safety tests that block any broken token from reaching production.",
    r: "Leadership approved the full multi-brand rollout. The approach became the reference architecture for onboarding Cashi, Walmart Business, and Bodega.",
  },
  {
    category: "COLLABORATION",
    color: C.green,
    q: "Tell me about a time you had to bridge a significant gap between two teams.",
    s: "Design and engineering were at odds — designers needed the ease of Airtable, engineers required the version control and safety of Git. These weren't compatible preferences on the surface.",
    t: "Create a shared language and workflow that satisfied both parties without compromising speed or safety for either side.",
    a: "Partnered with engineering to build an automated pipeline that translated Airtable rows into Git-committed JSON. Defined a governance model where Airtable is the source, Style Dictionary is the transformer, and GitHub Actions is the delivery engine.",
    r: "Moved from 72 hours of manual effort to a 10-minute automated flow. Neither team gave up their tool.",
  },
  {
    category: "SCALE",
    color: C.teal,
    q: "How do you handle design system architecture at massive scale?",
    s: "Across Walmart US and Sam's Club, we had to support 17+ platforms using one design language while they were all shipping different versions. We needed brand-specific flexibility without duplicating core tokens.",
    t: "Build a model that allowed for brand-specific flexibility without duplicating core tokens or creating a maintenance burden.",
    a: "Implemented a Theme Inheritance Architecture: LD Base holds 650+ tokens. WCP adds commerce-specific overrides. Brand themes (Sam's Club, Walmart+, Bodega) contain only their specific overrides. Each level inherits everything above it.",
    r: "Each theme now contains only what's unique to it. One change in LD Base cascades automatically to all 17 tenants on the next sync.",
  },
  {
    category: "ERROR",
    color: C.coral,
    q: "Tell me about a time a project was failing due to human error. How did you advocate for a technical fix?",
    s: "During the Walmart US rebranding, we were managing tokens manually across 17+ platforms. Builds were breaking frequently because designers were exporting inconsistent values.",
    t: "Eliminate the last-mile problem — missed updates and coordination gaps that created high human cost and broken releases.",
    a: "I demonstrated the cost of errors (2–3 days per fix), proposed Airtable as a Single Source of Truth, and led implementation of a sync that pushed validated JSON directly to GitHub with automated CI checks.",
    r: "Eliminated build breaks due to token errors entirely. Reduced deployment time from 3 days to 10 minutes. Teams shifted from fear of breaking the build to trust in the system.",
  },
];

const STAR_LABELS = {
  s: { label: "S", full: "Situation", color: C.coral },
  t: { label: "T", full: "Task",      color: C.amber },
  a: { label: "A", full: "Action",    color: C.teal  },
  r: { label: "R", full: "Result",    color: C.green },
};

export default function InterviewPrep() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState({ s: true, t: false, a: false, r: false });
  const [mode, setMode] = useState("guided"); // guided | full | flashcard
  const [flipped, setFlipped] = useState(false);

  const item = qa[active];

  const toggle = (key) => setExpanded(e => ({ ...e, [key]: !e[key] }));
  const expandAll = () => setExpanded({ s: true, t: true, a: true, r: true });
  const collapseAll = () => setExpanded({ s: false, t: false, a: false, r: false });

  return (
    <div style={{
      background: C.black,
      minHeight: "100vh",
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      color: C.offWhite,
      padding: "0",
    }}>

      {/* Header */}
      <div style={{
        background: C.navy,
        borderBottom: `1px solid ${C.navyLight}`,
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.teal, fontWeight: 600, marginBottom: 4 }}>
            Interview Prep · Airtable SoT Case Study
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.white }}>STAR Method Q&A</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["guided", "full", "flashcard"].map(m => (
            <button key={m} onClick={() => { setMode(m); setFlipped(false); }} style={{
              background: mode === m ? C.teal : C.navyMid,
              color: mode === m ? C.white : C.muted,
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              letterSpacing: 0.5,
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 73px)" }}>

        {/* Sidebar */}
        <div style={{
          width: 220,
          flexShrink: 0,
          background: C.navy,
          borderRight: `1px solid ${C.navyLight}`,
          overflowY: "auto",
          padding: "16px 0",
        }}>
          {qa.map((item, i) => (
            <button key={i} onClick={() => { setActive(i); setExpanded({ s: true, t: false, a: false, r: false }); setFlipped(false); }} style={{
              display: "block",
              width: "100%",
              background: active === i ? C.navyMid : "transparent",
              border: "none",
              borderLeft: active === i ? `3px solid ${item.color}` : "3px solid transparent",
              padding: "14px 18px",
              textAlign: "left",
              cursor: "pointer",
              transition: "background 0.15s",
            }}>
              <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, color: item.color, marginBottom: 5, textTransform: "uppercase" }}>
                {item.category}
              </div>
              <div style={{ fontSize: 12, color: active === i ? C.offWhite : C.muted, lineHeight: 1.45 }}>
                {item.q.length > 80 ? item.q.slice(0, 80) + "…" : item.q}
              </div>
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>

          {/* Question */}
          <div style={{
            background: C.navyMid,
            border: `1px solid ${item.color}`,
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 28,
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: item.color, borderRadius: "12px 12px 0 0" }} />
            <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, color: item.color, textTransform: "uppercase", marginBottom: 12 }}>
              {item.category} · Question
            </div>
            <div style={{ fontSize: 17, color: C.white, lineHeight: 1.55, fontWeight: 500 }}>
              {item.q}
            </div>
          </div>

          {mode === "flashcard" ? (
            // FLASHCARD MODE
            <div
              onClick={() => setFlipped(f => !f)}
              style={{
                background: flipped ? C.navyMid : C.navy,
                border: `1px solid ${flipped ? item.color : C.navyLight}`,
                borderRadius: 12,
                padding: "48px 36px",
                minHeight: 240,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "all 0.25s",
              }}
            >
              {!flipped ? (
                <>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Click to reveal your answer</div>
                  <div style={{ fontSize: 48, fontWeight: 700, color: C.navyLight }}>?</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, color: item.color, textTransform: "uppercase", marginBottom: 20 }}>Full Answer</div>
                  {["s","t","a","r"].map(key => (
                    <div key={key} style={{ marginBottom: 16, textAlign: "left", width: "100%" }}>
                      <span style={{ fontWeight: 700, color: STAR_LABELS[key].color, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>
                        {STAR_LABELS[key].full}
                      </span>
                      <p style={{ fontSize: 14, color: C.muted, marginTop: 4, lineHeight: 1.6 }}>{item[key]}</p>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 12 }}>Click to flip back</div>
                </>
              )}
            </div>
          ) : mode === "full" ? (
            // FULL MODE — all visible
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["s","t","a","r"].map(key => (
                <div key={key} style={{
                  background: C.navyMid,
                  border: `1px solid ${C.navyLight}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                  borderLeft: `4px solid ${STAR_LABELS[key].color}`,
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: STAR_LABELS[key].color, textTransform: "uppercase", marginBottom: 10 }}>
                    {STAR_LABELS[key].full}
                  </div>
                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7 }}>{item[key]}</p>
                </div>
              ))}
            </div>
          ) : (
            // GUIDED MODE — accordion
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <button onClick={expandAll} style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 6, padding: "6px 14px", fontSize: 12, color: C.muted, cursor: "pointer" }}>
                  Expand all
                </button>
                <button onClick={collapseAll} style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 6, padding: "6px 14px", fontSize: 12, color: C.muted, cursor: "pointer" }}>
                  Collapse all
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["s","t","a","r"].map(key => {
                  const meta = STAR_LABELS[key];
                  const isOpen = expanded[key];
                  return (
                    <div key={key} style={{
                      background: C.navyMid,
                      border: `1px solid ${isOpen ? meta.color : C.navyLight}`,
                      borderRadius: 12,
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}>
                      <button onClick={() => toggle(key)} style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        padding: "18px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        textAlign: "left",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: isOpen ? meta.color : C.navyLight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: isOpen ? C.white : C.muted,
                            transition: "all 0.2s",
                            flexShrink: 0,
                          }}>
                            {meta.label}
                          </div>
                          <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? C.white : C.muted }}>
                            {meta.full}
                          </span>
                        </div>
                        <span style={{ color: C.muted, fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: "0 24px 24px 74px" }}>
                          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{item[key]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
            <button onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0} style={{
              background: C.navyMid,
              border: `1px solid ${C.navyLight}`,
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: 13,
              color: active === 0 ? C.navyLight : C.muted,
              cursor: active === 0 ? "not-allowed" : "pointer",
            }}>← Previous</button>
            <span style={{ fontSize: 12, color: C.muted, alignSelf: "center" }}>{active + 1} / {qa.length}</span>
            <button onClick={() => setActive(a => Math.min(qa.length - 1, a + 1))} disabled={active === qa.length - 1} style={{
              background: C.navyMid,
              border: `1px solid ${C.navyLight}`,
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: 13,
              color: active === qa.length - 1 ? C.navyLight : C.muted,
              cursor: active === qa.length - 1 ? "not-allowed" : "pointer",
            }}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
