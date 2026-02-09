import type { Context } from "hono";
import { AGENT_REGISTRY } from "../agents/registry.js";

export function listAgentsController(c: Context) {
  return c.json(Object.values(AGENT_REGISTRY));
}

export function agentCapabilitiesController(c: Context) {
  const type = c.req.param("type");

  const agent = AGENT_REGISTRY[type as keyof typeof AGENT_REGISTRY];

  if (!agent) {
    return c.json({ error: "Agent not found" }, 404);
  }

  return c.json(agent);
}
