package com.atlas.inventory.web;

import com.atlas.inventory.service.ReservationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/** HTTP API for reservations. Implements REQ-12. */
@RestController
public class ReservationController {
  private final ReservationService reservationService;

  public ReservationController(ReservationService reservationService) {
    this.reservationService = reservationService;
  }

  @PostMapping("/reservations")
  public ReservationResponse create(@RequestBody CreateReservationRequest request) {
    return reservationService.reserve(request);
  }
}
