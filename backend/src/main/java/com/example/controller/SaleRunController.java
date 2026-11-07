
package com.example.controller;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.request.SaleRunDTO;
import com.example.entity.SaleRunEntity;
import com.example.service.SaleRunService;
import com.example.service.Salerun.SalerunService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend/create")
public class SaleRunController {
    private final SaleRunService saleRunService;
    private final SalerunService salerunService;

    public SaleRunController(SaleRunService saleRunService, SalerunService salerunService) {
        this.saleRunService = saleRunService;
        this.salerunService = salerunService;
    }

 @PostMapping("/sale-runs")
    public ResponseEntity<SaleRunEntity> createSaleRun(@RequestBody SaleRunDTO saleRunDTO) {
        return ResponseEntity.ok(saleRunService.createSaleRun(saleRunDTO));
    }

    @PutMapping("/sale-runs/{id}/end")
    public ResponseEntity<String> EndSaleRunStatus(@PathVariable("id") String id) throws Exception {
        // Implement the logic to update the sale run status here
        salerunService.endSaleRun(id);

        return ResponseEntity.ok("Sale run status updated successfully");
    }
    
}
