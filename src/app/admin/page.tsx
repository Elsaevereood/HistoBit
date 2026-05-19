"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

type Subscriber = {
  email: string;
  plan: string;
  status: string;
  created_at: string;
};

type Draft = {
  id: string;
  subject: string;
  html_content: string;
  status: "draft" | "sent";
  created_at: string;
  sent_at: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState<"composer" | "subscribers" | "stats">("composer");

  // Composer state
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [composerMessage, setComposerMessage] = useState({ type: "", text: "" });

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);

  // Stats state
  const [sentDrafts, setSentDrafts] = useState<Draft[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/draft-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 401) { setLoginError("Invalid password"); return; }
      setIsAuthenticated(true);
    } catch {
      setLoginError("An error occurred");
    }
  };

  const fetchSubscribers = async () => {
    setSubsLoading(true);
    const { data } = await supabase
      .from("subscribers")
      .select("email, plan, status, created_at")
      .order("created_at", { ascending: false });
    setSubscribers(data || []);
    setSubsLoading(false);
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    const { data } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .eq("status", "sent")
      .order("sent_at", { ascending: false });
    setSentDrafts(data || []);
    setStatsLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeSection === "subscribers") fetchSubscribers();
    if (activeSection === "stats") fetchStats();
  }, [activeSection, isAuthenticated]);

  const handleSaveDraft = async (): Promise<{ id: string } | null> => {
    setIsSaving(true);
    setComposerMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, subject, html_content: htmlContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save draft");
      setComposerMessage({ type: "success", text: "Draft saved." });
      return data.draft;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save draft";
      setComposerMessage({ type: "error", text: msg });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    if (!confirm("Send to all paid subscribers? This cannot be undone.")) return;
    setIsSending(true);
    setComposerMessage({ type: "", text: "" });
    try {
      const draft = await handleSaveDraft();
      if (!draft) { setIsSending(false); return; }
      const res = await fetch("/api/admin/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, draftId: draft.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setComposerMessage({ type: "success", text: `Sent successfully to ${data.sentCount} paid subscribers` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send";
      setComposerMessage({ type: "error", text: msg });
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const paidCount = subscribers.filter((s) => s.plan === "paid").length;

  // ── LOGIN SCREEN (unchanged) ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf5ee] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-[rgba(216,208,200,0.6)] max-w-md w-full">
          <h1 className="font-heading italic text-3xl text-[#3a302a] mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#faf5ee] border border-[rgba(216,208,200,0.6)] rounded-lg focus:outline-none focus:border-[#c2652a] font-body text-[#3a302a]"
              required
            />
          </div>
          {loginError && <p className="text-red-500 font-body text-sm mb-4">{loginError}</p>}
          <button type="submit" className="w-full bg-[#c2652a] text-white py-3 rounded-lg font-body font-medium hover:bg-[#a65522] transition-colors">
            Enter Control Room
          </button>
        </form>
      </div>
    );
  }

  // ── AUTHENTICATED VIEW ───────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", background: "#faf5ee" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 240, minWidth: 240, height: "100vh", position: "sticky", top: 0, background: "#1a1008", padding: "32px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 22, color: "#faf5ee" }}>Histobit</span>
        </div>
        <div style={{ padding: "0 24px", fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a7a6e" }}>
          Control Room
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "24px 0" }} />

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {(["composer", "subscribers", "stats"] as const).map((section) => {
            const labels: Record<string, { icon: string; label: string }> = {
              composer: { icon: "✍", label: "Newsletter" },
              subscribers: { icon: "👥", label: "Subscribers" },
              stats: { icon: "📊", label: "Stats" },
            };
            const active = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "12px 24px", cursor: "pointer",
                  background: active ? "rgba(194,101,42,0.15)" : "transparent",
                  color: active ? "#c2652a" : "#8a7a6e",
                  borderLeft: active ? "2px solid #c2652a" : "2px solid transparent",
                  fontFamily: "var(--font-body)", fontSize: 14,
                  border: "none", borderLeft: active ? "2px solid #c2652a" : "2px solid transparent",
                  transition: "all 150ms", textAlign: "left",
                }}
                onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.color = "#faf5ee"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; } }}
                onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.color = "#8a7a6e"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; } }}
              >
                <span>{labels[section].icon}</span>
                <span>{labels[section].label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => { setIsAuthenticated(false); setPassword(""); }}
            style={{ width: "100%", padding: "12px 24px", background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", cursor: "pointer", textAlign: "left", transition: "color 150ms" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#8a7a6e"; }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, overflowY: "auto", padding: 48, background: "#faf5ee" }}>

        {/* ── COMPOSER ── */}
        {activeSection === "composer" && (
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 36, color: "#3a302a", margin: 0 }}>Newsletter Composer</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", marginTop: 4 }}>Write your newsletter below and send to all paid subscribers.</p>

            <div style={{ display: "flex", gap: 32, marginTop: 32, alignItems: "flex-start" }}>

              {/* Editor */}
              <div style={{ flex: 1.2 }}>
                <div style={{ background: "white", border: "1px solid #d8d0c8", borderRadius: 8, padding: 32 }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a7a6e", display: "block", marginBottom: 8 }}>SUBJECT LINE</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. The Fall of Constantinople"
                    style={{ width: "100%", height: 44, background: "#faf5ee", border: "1px solid #d8d0c8", borderRadius: 6, padding: "0 16px", fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c2652a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#d8d0c8")}
                  />

                  <label style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a7a6e", display: "block", marginTop: 24, marginBottom: 4 }}>HTML CONTENT</label>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#8a7a6e", marginBottom: 8, marginTop: 0 }}>Paste your HTML email code here. Use Claude to generate it.</p>
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="<html>...</html>"
                    style={{ width: "100%", height: 360, background: "#faf5ee", border: "1px solid #d8d0c8", borderRadius: 6, padding: 16, fontFamily: "monospace", fontSize: 13, color: "#3a302a", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c2652a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#d8d0c8")}
                  />

                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button
                      onClick={handleSaveDraft}
                      disabled={isSaving || isSending}
                      style={{ height: 44, background: "transparent", border: "1.5px solid #c2652a", color: "#c2652a", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, borderRadius: 8, padding: "0 24px", cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}
                    >
                      {isSaving ? "Saving…" : "Save Draft"}
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={isSending || isSaving}
                      style={{ height: 44, background: "#c2652a", border: "none", color: "#faf5ee", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, borderRadius: 8, padding: "0 24px", cursor: "pointer", opacity: isSending ? 0.6 : 1 }}
                    >
                      {isSending ? "Sending…" : "Send to Paid Subscribers"}
                    </button>
                  </div>

                  {composerMessage.text && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, marginTop: 12, color: composerMessage.type === "success" ? "#2d6a4f" : "#c0392b" }}>
                      {composerMessage.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div style={{ flex: 1, position: "sticky", top: 48 }}>
                <div style={{ background: "white", border: "1px solid #d8d0c8", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ background: "#f0ebe3", padding: "12px 20px", borderBottom: "1px solid #d8d0c8" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a7a6e" }}>LIVE PREVIEW</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: subject ? "#3a302a" : "#8a7a6e", marginTop: 4 }}>
                      {subject || "No subject yet"}
                    </div>
                  </div>
                  <div style={{ maxHeight: 600, overflowY: "auto" }}>
                    {htmlContent ? (
                      <div style={{ pointerEvents: "none" }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48, fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", textAlign: "center" }}>
                        Your newsletter preview will appear here as you type.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SUBSCRIBERS ── */}
        {activeSection === "subscribers" && (
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 36, color: "#3a302a", margin: 0 }}>Subscribers</h1>

            <div style={{ display: "flex", gap: 16, marginTop: 24, marginBottom: 32 }}>
              {[
                { num: subscribers.length, label: "Total Subscribers" },
                { num: paidCount, label: "Paid Subscribers" },
              ].map(({ num, label }) => (
                <div key={label} style={{ flex: 1, background: "white", border: "1px solid #d8d0c8", borderRadius: 8, padding: "20px 28px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 40, color: "#c2652a", lineHeight: 1 }}>{subsLoading ? "—" : num}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #d8d0c8", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "#f0ebe3", padding: "12px 20px", display: "grid", gridTemplateColumns: "1fr 100px 100px 140px" }}>
                {["Email", "Plan", "Status", "Joined"].map((col) => (
                  <span key={col} style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e" }}>{col}</span>
                ))}
              </div>

              {subsLoading ? (
                <div style={{ padding: 48, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e" }}>Loading…</div>
              ) : subscribers.length === 0 ? (
                <div style={{ padding: 48, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e" }}>No subscribers yet.</div>
              ) : (
                subscribers.map((sub) => (
                  <div
                    key={sub.email}
                    style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "1fr 100px 100px 140px", borderBottom: "1px solid rgba(216,208,200,0.4)", alignItems: "center" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#faf5ee")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a" }}>{sub.email}</span>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "2px 10px", borderRadius: 100, background: sub.plan === "paid" ? "rgba(194,101,42,0.1)" : "#f0ebe3", color: sub.plan === "paid" ? "#c2652a" : "#8a7a6e" }}>{sub.plan}</span>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "2px 10px", borderRadius: 100, background: sub.status === "active" ? "#d8f3dc" : "#f0ebe3", color: sub.status === "active" ? "#2d6a4f" : "#8a7a6e" }}>{sub.status}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e" }}>{formatDate(sub.created_at)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── STATS ── */}
        {activeSection === "stats" && (
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 36, color: "#3a302a", margin: 0, marginBottom: 32 }}>Stats</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
              {[
                { num: subscribers.length || "—", label: "Total Subscribers", sub: "All time signups" },
                { num: paidCount || "—", label: "Paid Subscribers", sub: "Active paying members" },
                { num: statsLoading ? "—" : sentDrafts.length, label: "Newsletters Sent", sub: "Dispatches delivered" },
                { num: 3, label: "Blog Posts", sub: "3 published" },
              ].map(({ num, label, sub }) => (
                <div key={label} style={{ background: "white", border: "1px solid #d8d0c8", borderRadius: 8, padding: "28px 32px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 56, color: "#c2652a", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a7a6e", marginTop: 8 }}>{label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#d8d0c8", marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #d8d0c8", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "#f0ebe3", padding: "12px 20px", display: "grid", gridTemplateColumns: "1fr 160px 100px" }}>
                {["Subject", "Sent Date", "Status"].map((col) => (
                  <span key={col} style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e" }}>{col}</span>
                ))}
              </div>
              {statsLoading ? (
                <div style={{ padding: 48, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e" }}>Loading…</div>
              ) : sentDrafts.length === 0 ? (
                <div style={{ padding: 48, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e" }}>No newsletters sent yet.</div>
              ) : (
                sentDrafts.map((d) => (
                  <div key={d.id} style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "1fr 160px 100px", borderBottom: "1px solid rgba(216,208,200,0.4)", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a" }}>{d.subject}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e" }}>{d.sent_at ? formatDate(d.sent_at) : "—"}</span>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "2px 10px", borderRadius: 100, background: "#d8f3dc", color: "#2d6a4f" }}>Sent</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
