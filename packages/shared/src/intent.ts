import type { AgentType } from "./agent.js";

export type IntentType = AgentType | "fallback";

export interface IntentResult {
  intent: IntentType;
  confidence?: number;
}
