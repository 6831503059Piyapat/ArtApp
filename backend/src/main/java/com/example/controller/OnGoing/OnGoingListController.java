
package com.example.controller.OnGoing;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.response.OnGoingDTO;
import com.example.service.OnGoingListService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

import com.example.service.OnGoing.OnGoingIDService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import com.example.dto.request.OnGoing.OngoingID.SellItemDTO;

// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class OnGoingListController {
    private final OnGoingListService onGoingListService;
    private final OnGoingIDService onGoingIDService;

    public OnGoingListController(OnGoingListService onGoingListService, OnGoingIDService onGoingIDService) {
        this.onGoingListService = onGoingListService;
        this.onGoingIDService = onGoingIDService;
    }
@GetMapping("/ongoing-list")
public ResponseEntity<List<OnGoingDTO>> getOnGoingList(Authentication authentication) {
    String uid = authentication.getName();
    return ResponseEntity.ok(onGoingListService.getOnGoingListByUserId(uid));
}

    @GetMapping("/ongoing-list/{id}")
    public ResponseEntity<OnGoingIDDTO> fetchOnGoingListById(@PathVariable("id") String id) throws Exception {
                      
        return ResponseEntity.ok(onGoingIDService.getOnGoingListBySalesId(id));
    }
    @PostMapping("/confirm-sale")
    public ResponseEntity<String> confirmSale(@RequestBody SellItemDTO sellItemDTO) {
        // Call the service method to handle the sale confirmation logic
        onGoingIDService.confirmSale(sellItemDTO);

        return ResponseEntity.ok("Sale confirmed successfully");
    }
   
    
    
}
