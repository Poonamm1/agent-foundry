from agent_builder.agent import KnowledgeAgent
from agent_builder.config import AgentConfig


def test_read_only_ask_returns_missing_information() -> None:
    agent = KnowledgeAgent(AgentConfig())
    result = agent.ask("How does Atlas reservation work?")
    assert result.missing_information is True
    assert result.citations == []


def test_empty_question() -> None:
    result = KnowledgeAgent().ask("  ")
    assert result.answer.startswith("No question")
