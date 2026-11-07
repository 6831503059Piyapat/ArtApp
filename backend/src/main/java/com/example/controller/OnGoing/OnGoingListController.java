
package com.example.controller.OnGoing;
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
import org.springframework.web.bind.annotation.PathVariable;
import com.google.firebase.auth.UserRecord;
import com.example.service.OnGoing.OnGoingIDService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;

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
    public ResponseEntity<OnGoingDTO> createSaleRun(Authentication authentication) throws Exception {
         String uid = (String) authentication.getPrincipal();
         UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        return ResponseEntity.ok(onGoingListService.getOnGoingListByUserId(user.getUid()));
    }

    @GetMapping("/ongoing-list/{id}")
    public ResponseEntity<OnGoingIDDTO> fetchOnGoingListById(@PathVariable("id") String id) throws Exception {              
        return ResponseEntity.ok(onGoingIDService.getOnGoingListBySalesId(id));
    }
   
    
    
}
