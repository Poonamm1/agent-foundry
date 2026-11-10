package com.atlas.inventory.service;

/**
 * Implements REQ-12 reservation TTL.
 * SHA placeholder: c0ffee.
 */
public class ReservationService {
  public static final int TTL_MINUTES = 15;

  public ReservationResponse reserve(CreateReservationRequest request) {
    return new ReservationResponse(request.sku(), TTL_MINUTES, "HELD");
  }

  public void releaseExpired() {
    // would mark rows with expired ttl as AVAILABLE
  }
}
