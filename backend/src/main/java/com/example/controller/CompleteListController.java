
package com.example.controller;
// import com.google.firebase.auth.FirebaseToken;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.example.dto.response.Complete.CompleteDTO;
import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.service.CompleteIDService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.service.CompleteListService;

import org.springframework.http.ResponseEntity;

// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class CompleteListController {
    private final CompleteListService completeListService;
    private final CompleteIDService completeIDService;
    public CompleteListController(CompleteListService completeListService, CompleteIDService completeIDService) {
        this.completeListService = completeListService;
        this.completeIDService = completeIDService;
    }

 @GetMapping("/complete-list")
    public ResponseEntity<CompleteDTO> fetchCompleteList(Authentication authentication) throws Exception {
         String uid = (String) authentication.getPrincipal();
         UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        return ResponseEntity.ok(completeListService.getCompleteListByUserId(user.getUid()));
    }

    @GetMapping ("/complete-list/{id}")
    public ResponseEntity<CompleteIDDTO> fetchCompleteListById(@PathVariable("id") String id) throws Exception {              
        return ResponseEntity.ok(completeIDService.getCompleteSummaryBySalesId(id));
    }
    
    
}
