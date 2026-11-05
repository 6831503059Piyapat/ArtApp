
package com.example.controller;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.request.SaleRunDTO;
import com.example.entity.SaleRunEntity;
import com.example.service.SaleRunService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.example.dto.response.OnGoingDTO;
import com.example.service.OnGoingListService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class OnGoingListController {
    private final OnGoingListService onGoingListService;

    public OnGoingListController(OnGoingListService onGoingListService) {
        this.onGoingListService = onGoingListService;
    }

 @GetMapping("/ongoing")
    public ResponseEntity<OnGoingDTO> createSaleRun(Authentication authentication) throws Exception {
         String uid = (String) authentication.getPrincipal();
         UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        return ResponseEntity.ok(onGoingListService.getOnGoingListByUserId(user.getUid()));
    }
    
}
