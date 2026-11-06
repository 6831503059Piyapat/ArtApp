

package com.example.controller.LiveServer;
// import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.service.LiveStatusService;
import com.example.dto.LiveStatsDTO;
import org.springframework.data.repository.query.Param;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/backend")
public class LiveStatusController {
    private final LiveStatusService liveStatusService;

    public LiveStatusController(LiveStatusService liveStatusService) {
        this.liveStatusService = liveStatusService;
    }

 @GetMapping("/live-status/{saleId}")
    public ResponseEntity<LiveStatsDTO> createSaleRun(@Param("saleId") String saleId) throws Exception {
         
        return ResponseEntity.ok(liveStatusService.updateLiveStatus(saleId));
    }
    
}
