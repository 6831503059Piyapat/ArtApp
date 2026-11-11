
package com.example.controller;
import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.service.DashboardService;
import com.example.dto.DashboardTotalDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

// import java.util.Map;
import java.util.List;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class Dashboard {
    private final DashboardService dashboardService;

    public Dashboard(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
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
    
}
