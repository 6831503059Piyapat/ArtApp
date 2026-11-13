
package com.example.controller;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.request.SaleRunDTO;
import com.example.entity.SaleRunEntity;
import com.example.service.Salerun.SalerunService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import com.example.dto.request.SaleRun.SaleRunEndDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class SaleRunController {
    private final SalerunService salerunService;

    public SaleRunController( SalerunService salerunService) {
        this.salerunService = salerunService;
    }

 @PostMapping("/sale-runs/create")
    public ResponseEntity<String> createSaleRun(@RequestBody SaleRunDTO saleRunDTO) {
        // runName: runName,
        // runDate: runDate,
        // runLocation: runLocation,
        // ownerProduct: ownerProducts
 // const saleList = 
    // [{
    //   accent: "purple",
    //   id: "host-8466468345",
    //   name: "My Products",
    //   placeholder: "Item Name (e.g. Linen Coaster Set)",
    //   products: [
    //     {
    //       id: 1791050351463,
    //       name: "Linen Coaster Set",
    //       owner :'',
    //       price:100,
    //       quantity:85
    //     }
    //   ],
    //   role:'Host'
    // }];
    // const expenseLog = [{
    //   amount:120,
    //   category:""
    // }]
salerunService.createSaleRun(saleRunDTO);
        return ResponseEntity.status(201).body("Sale run created successfully");
    }

    @PutMapping("/sale-runs/end")
    public ResponseEntity<String> EndSaleRunStatus(@RequestBody SaleRunEndDTO saleRunEndDTO) throws Exception {
        String id = saleRunEndDTO.getSaleRunId();
        String assistantName = saleRunEndDTO.getAssistanceName();
        salerunService.endSaleRun(id, assistantName);

        return ResponseEntity.ok("Sale run status updated successfully");
    }
    
}
