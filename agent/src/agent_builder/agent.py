from __future__ import annotations

from dataclasses import dataclass

from agent_builder.config import AgentConfig


@dataclass
class CitedAnswer:
    answer: str
    citations: list[str]
    missing_information: bool


class KnowledgeAgent:
    """Placeholder orchestrator. Replace with Google ADK `root_agent` in Phase 3."""

    def __init__(self, config: AgentConfig | None = None) -> None:
        self.config = config or AgentConfig()
        if not self.config.read_only:
            raise ValueError("MVP agent must be read-only")

    def ask(self, question: str) -> CitedAnswer:
        q = question.strip()
        if not q:
            return CitedAnswer("No question provided.", [], True)
        return CitedAnswer(
            answer=(
                "The agent skeleton is not connected to Gemini or an index yet. "
                "Index synthetic Atlas fixtures after Phase 2."
            ),
            citations=[],
            missing_information=True,
        )
