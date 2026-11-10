-- Synthetic Atlas Inventory catalog. No PII tables.

CREATE TABLE reservation (
  id            UUID PRIMARY KEY,
  order_id      UUID NOT NULL,
  sku           TEXT NOT NULL,
  ttl_minutes   INTEGER NOT NULL DEFAULT 15,
  status        TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL
);

COMMENT ON TABLE reservation IS 'Holds inventory for checkout; TTL from ADR-0014.';
COMMENT ON COLUMN reservation.ttl_minutes IS 'Minutes until hold expires; approved value is 15.';
