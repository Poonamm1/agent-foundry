from agent_builder.agent import KnowledgeAgent


def main() -> None:
    agent = KnowledgeAgent()
    result = agent.ask("Where is reservation TTL implemented?")
    print(result.answer)


if __name__ == "__main__":
    main()
