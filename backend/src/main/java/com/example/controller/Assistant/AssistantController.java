
package com.example.controller.Assistant;
import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.service.DashboardService;
import com.example.dto.DashboardTotalDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.repository.query.Param;
import com.example.service.Assistant.AssistantService;
import org.springframework.http.ResponseEntity;
import com.example.dto.request.Assistant.AssistantReqDTO;
// import java.util.Map;
import java.util.List;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class AssistantController {

   private final AssistantService assistantService;

   public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }


    @GetMapping("/assistant/set-permission")
    public ResponseEntity<String> setPermission(Authentication authentication, @RequestBody  AssistantReqDTO assistantReqDTO) throws Exception {
        String uid = (String) authentication.getPrincipal();
        
        UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        assistantService.setPermissionAssistantById(assistantReqDTO);
        return ResponseEntity.ok("");
    }
    
}
