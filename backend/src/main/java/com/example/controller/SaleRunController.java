
package com.example.controller;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.request.SaleRunDTO;
import com.example.entity.SaleRunEntity;
import com.example.service.SaleRunService;

import org.springframework.web.bind.annotation.PostMapping;
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

    public SaleRunController(SaleRunService saleRunService) {
        this.saleRunService = saleRunService;
    }

 @PostMapping("/sale-runs")
    public ResponseEntity<SaleRunEntity> createSaleRun(@RequestBody SaleRunDTO saleRunDTO) {
        return ResponseEntity.ok(saleRunService.createSaleRun(saleRunDTO));
    }
    
}
