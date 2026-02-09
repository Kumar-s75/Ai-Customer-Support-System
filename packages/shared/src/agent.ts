export type AgentType = "support" | "order" | "billing";

export interface AgentCapability {
  type: AgentType;
  description: string;
}
