from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class AgentConfig:
    model: str = "gemini-flash-latest"
    max_tool_hops: int = 3
    max_retrieve_k: int = 8
    read_only: bool = True

    @staticmethod
    def from_env() -> "AgentConfig":
        return AgentConfig(
            model=os.environ.get("AGENT_MODEL", "gemini-flash-latest"),
            max_tool_hops=int(os.environ.get("AGENT_MAX_TOOL_HOPS", "3")),
            max_retrieve_k=int(os.environ.get("AGENT_MAX_RETRIEVE_K", "8")),
        )
