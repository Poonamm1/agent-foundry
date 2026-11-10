"""Shared helpers for the topic catalog."""

from __future__ import annotations


def t(
    id,
    title,
    phase,
    description,
    priority,
    lh,
    ih,
    deps,
    owner,
    designation,
    deliverable,
    what,
    why,
    how,
    example,
    learn,
    exercise,
    dod,
    takeaways,
    related,
    resources,
):
    return {
        "id": id,
        "title": title,
        "phase": phase,
        "description": description,
        "priority": priority,
        "estimatedLearningHours": lh,
        "estimatedImplementationHours": ih,
        "dependencies": deps,
        "defaultOwner": owner,
        "designation": designation,
        "handsOnDeliverable": deliverable,
        "what": what,
        "why": why,
        "how": how,
        "example": example,
        "learn": learn,
        "exercise": exercise,
        "dod": dod,
        "takeaways": takeaways,
        "related": related,
        "resources": resources,
    }


G = ("Gemini API docs", "https://ai.google.dev/gemini-api/docs")
GP = ("Gemini prompting", "https://ai.google.dev/gemini-api/docs/prompting-strategies")
V = ("Vertex AI generative AI", "https://cloud.google.com/vertex-ai/generative-ai/docs")
ADK = ("Google ADK", "https://adk.dev/")
ADKP = ("ADK Python quickstart", "https://adk.dev/get-started/python/")
RUN = ("Cloud Run docs", "https://cloud.google.com/run/docs")
IAM = ("Cloud IAM", "https://cloud.google.com/iam/docs")
SM = ("Secret Manager", "https://cloud.google.com/secret-manager/docs")
GCS = ("Cloud Storage", "https://cloud.google.com/storage/docs")
LOG = ("Cloud Logging", "https://cloud.google.com/logging/docs")
CF = ("Confluence REST v2", "https://developer.atlassian.com/cloud/confluence/rest/v2/intro/")
MG = ("Microsoft Graph overview", "https://learn.microsoft.com/en-us/graph/overview")
OM = (
    "Graph onlineMeeting",
    "https://learn.microsoft.com/en-us/graph/api/resources/onlinemeeting?view=graph-rest-1.0",
)
KAFKA = ("Apache Kafka docs", "https://kafka.apache.org/documentation/")
GIT = ("Git documentation", "https://git-scm.com/docs")
SVN = ("Apache Subversion", "https://subversion.apache.org/")
PDF = (
    "PDF Association specification index",
    "https://www.pdfa.org/resource/pdf-specification-index/",
)

A = "developer-a"
B = "developer-b"
