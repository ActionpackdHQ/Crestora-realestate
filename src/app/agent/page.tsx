import { Suspense } from "react";
import CrestoraAgentChat from "@/components/CrestoraAgentChat";

export default function AgentPage() {
  return (
    <Suspense
      fallback={
        <div className="agent-root">
          <div className="agent-main" style={{ paddingTop: "4rem" }}>
            Loading AI agent…
          </div>
        </div>
      }
    >
      <CrestoraAgentChat />
    </Suspense>
  );
}
