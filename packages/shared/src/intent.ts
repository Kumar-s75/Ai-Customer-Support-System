import type { AgentType } from "./agent";

export type IntentType = AgentType | "fallback";

export interface IntentResult {
  intent: IntentType;
  confidence?: number;
}
