import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/**
 * AISlot is the ONLY component in the app allowed to touch an AI/ML endpoint.
 * Every voice-advisory, disease-detection, and counterfeit-verification call
 * routes through here so the AI/ML lead can swap mock -> real inference by
 * changing one fetch call, without touching any page UI.
 *
 * Props:
 *  - endpoint: string, e.g. "/api/advisory/query"
 *  - payload: object to POST
 *  - loadingText: string shown while "thinking"
 *  - mockResponse: object returned if the fetch fails (offline-safe demo mode)
 *  - renderResult: (data) => ReactNode
 *  - trigger: any value; when it changes, the call re-fires (e.g. a submit count)
 */
export default function AISlot({ endpoint, payload, loadingText, mockResponse, renderResult, trigger }) {
  const [state, setState] = useState({ status: "idle", data: null, error: null });

  useEffect(() => {
    if (trigger === undefined || trigger === null || trigger === false) return;
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload || {}),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`AISlot: ${endpoint} returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((err) => {
        // Backend not running yet? Fall back to mock so the UI never blanks out.
        if (!cancelled) {
          setState({ status: "success", data: mockResponse, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  if (state.status === "idle") return null;

  if (state.status === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-card border border-soil/10 bg-white/60 p-4 text-muted">
        <Sparkles className="h-5 w-5 animate-pulse text-wheat" />
        <span>{loadingText || "Thinking..."}</span>
      </div>
    );
  }

  return <>{renderResult(state.data)}</>;
}
