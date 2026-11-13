
package com.example.controller;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
// import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.service.DashboardService;
import com.example.dto.DashboardTotalDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.dto.request.JoinSale.JoinSaleDTO;
import com.example.repository.JoinSale.JoinSaleRepo;
import com.example.service.JoinSale.JoinsaleService;
// import java.util.Map;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class Dashboard {
    private final DashboardService dashboardService;
    private final JoinsaleService joinsaleService;
    private final JoinSaleRepo joinSaleRepo;

    public Dashboard(DashboardService dashboardService, JoinSaleRepo joinSaleRepo, JoinsaleService joinsaleService) {
        this.dashboardService = dashboardService;
        this.joinSaleRepo = joinSaleRepo;
        this.joinsaleService = joinsaleService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getTotalSaleRun(Authentication authentication) throws Exception {
        String uid = (String) authentication.getPrincipal();
    
        UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        DashboardTotalDTO dashboardData = dashboardService.getDashboardByUserId(user.getUid());
        List<List_RunDTO> dashboardList = dashboardService.getDashboardListByUserId(user.getUid());

        DashboardDTO finalDashboardData = new DashboardDTO(
            dashboardData.Total_create(),
            dashboardData.Total_complete(),
            dashboardData.Total_active(),
            dashboardData.Total_item_sold(),
            dashboardData.Best_revenue(),
            dashboardList
        );
        return ResponseEntity.ok(finalDashboardData);
    }
    @PostMapping("/join-sale")
    public ResponseEntity<String> joinSale(Authentication authentication, @RequestBody JoinSaleDTO joinSaleDTO) throws FirebaseAuthException {
        // Handle the join sale request
    String uid = authentication.getPrincipal().toString();
    UserRecord user = FirebaseAuth.getInstance().getUser(uid);
        
        joinsaleService.joinSale(joinSaleDTO.getUser_id(), joinSaleDTO.getCode_join());

        return ResponseEntity.ok("Sale joined successfully");
    }
    @PostMapping("/join-sale/{code_join}")
    public ResponseEntity<String> joinSaleByIdLink(Authentication authentication, @PathVariable("code_join") String code_join) throws FirebaseAuthException {
        // Handle the join sale request
    String uid = authentication.getPrincipal().toString();
    UserRecord user = FirebaseAuth.getInstance().getUser(uid);
        
        joinsaleService.joinSale(user.getUid(), code_join);

        return ResponseEntity.ok("Sale joined successfully");
    }

}
