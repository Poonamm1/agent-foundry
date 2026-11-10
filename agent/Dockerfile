FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml README.md /app/
COPY src /app/src
RUN pip install --no-cache-dir .
RUN useradd --create-home --uid 10001 appuser
USER 10001
ENV PYTHONUNBUFFERED=1
CMD ["python", "-m", "agent_builder.main"]
