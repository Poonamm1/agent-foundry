---
space: AIP-DESIGN
pageId: 10042
version: 12
url: https://confluence.example.invalid/spaces/AIP-DESIGN/pages/10042
acl_groups: [engineering]
---

# Reservation TTL (approved)

Status: Accepted in ADR-0014.

When a customer holds inventory during checkout, Atlas Inventory creates a **reservation** with `ttl_minutes = 15`.

If checkout does not complete before TTL expiry, `ReservationService.releaseExpired()` returns stock to `AVAILABLE`.

This page supersedes Reservation Design v2, which used 30 minutes.
