"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

type Draft = {
  id: string;
  subject: string;
  html_content: string;
  status: "draft" | "sent";
  created_at: string;
  sent_at: string | null;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchDrafts = async () => {
    const { data, error } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch drafts:", error);
    } else {
      setDrafts(data || []);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDrafts();
    }
  }, [isAuthenticated, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Quick validation via draft route
    try {
      const res = await fetch("/api/admin/draft-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (res.status === 401) {
        setError("Invalid password");
        return;
      }
      
      // If we got something else (even a 500 because we didn't send proper payload for drafting), 
      // but NOT 401, password is correct
      setIsAuthenticated(true);
    } catch (err) {
      setError("An error occurred");
    }
  };

  const handleDraft = async () => {
    setIsDrafting(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/admin/draft-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to draft");
      }
      
      setCurrentDraft(data.draft);
      fetchDrafts();
    } catch (err: any) {
      setError(err.message || "Failed to draft newsletter");
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSend = async () => {
    if (!currentDraft) return;
    
    setIsSending(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/admin/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, draftId: currentDraft.id }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send");
      }
      
      setSuccess(`Sent to ${data.sentCount} subscribers`);
      
      // Update local state to show it's sent
      setCurrentDraft({ ...currentDraft, status: "sent" });
      fetchDrafts();
    } catch (err: any) {
      setError(err.message || "Failed to send newsletter");
    } finally {
      setIsSending(false);
    }
  };

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
          
          {error && <p className="text-red-500 font-body text-sm mb-4">{error}</p>}
          
          <button 
            type="submit"
            className="w-full bg-[#c2652a] text-white py-3 rounded-lg font-body font-medium hover:bg-[#a65522] transition-colors"
          >
            Enter Control Room
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5ee] pb-24">
      {/* Header */}
      <header className="bg-[#1a1008] px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-heading italic text-2xl text-white">Histobit Admin</h1>
          <p className="font-body text-sm text-[#8a7a6e]">Newsletter Control Room</p>
        </div>
        <button 
          onClick={() => {
            setIsAuthenticated(false);
            setPassword("");
            setCurrentDraft(null);
          }}
          className="text-[#8a7a6e] hover:text-white font-body text-sm transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto mt-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading italic text-3xl text-[#3a302a]">Newsletter Draft</h2>
          <button 
            onClick={handleDraft}
            disabled={isDrafting}
            className="bg-[#c2652a] text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-[#a65522] transition-colors disabled:opacity-50"
          >
            {isDrafting ? "Drafting with AI..." : "Draft Newsletter"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 font-body">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 font-body">
            {success}
          </div>
        )}

        {currentDraft ? (
          <div className="mb-12">
            <h3 className="font-heading italic text-2xl text-[#3a302a] mb-4">
              {currentDraft.subject}
            </h3>
            
            <div 
              className="bg-white border border-[rgba(216,208,200,0.6)] rounded-lg p-6 mb-6 max-h-[500px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: currentDraft.html_content }}
            />
            
            <button 
              onClick={handleSend}
              disabled={isSending || currentDraft.status === "sent"}
              className="bg-[#1a1008] text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-black transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              {isSending ? "Sending..." : currentDraft.status === "sent" ? "Already Sent" : "Send to All Subscribers"}
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[rgba(216,208,200,0.6)] rounded-lg p-12 text-center mb-12">
            <p className="font-body text-[#8a7a6e]">No active draft. Generate one or load from history.</p>
          </div>
        )}

        {/* History */}
        <div>
          <h2 className="font-heading italic text-2xl text-[#3a302a] mb-6">Past Drafts</h2>
          
          <div className="bg-white border border-[rgba(216,208,200,0.6)] rounded-lg overflow-hidden">
            {drafts.length === 0 ? (
              <div className="p-6 text-center">
                <p className="font-body text-[#8a7a6e]">No past drafts found.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[rgba(216,208,200,0.6)]">
                {drafts.map(draft => (
                  <li key={draft.id} className="p-4 flex items-center justify-between hover:bg-[#faf5ee] transition-colors">
                    <div>
                      <h4 className="font-heading italic text-lg text-[#3a302a]">{draft.subject}</h4>
                      <p className="font-body text-xs text-[#8a7a6e] mt-1">
                        {new Date(draft.created_at).toLocaleDateString()} • 
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${draft.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {draft.status}
                        </span>
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentDraft(draft)}
                      className="text-[#c2652a] font-body text-sm hover:underline"
                    >
                      Load
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
