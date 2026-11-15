
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.repository.query.Param;
import com.example.service.Assistant.AssistantService;
import org.springframework.http.ResponseEntity;
import com.example.dto.request.Assistant.AssistantReqDTO;
import com.example.repository.Assistant.AssistantRepo;
// import java.util.Map;
import java.util.List;
// import java.util.HashMap;
import java.util.Random;
@RestController
@RequestMapping("/backend")
public class AssistantController {

   private final AssistantService assistantService;
   private final AssistantRepo assistantRepository;
   public static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   public AssistantController(AssistantService assistantService, AssistantRepo assistantRepository) {
        this.assistantService = assistantService;
        this.assistantRepository = assistantRepository;
    }


    @GetMapping("/assistant/set-permission")
    public ResponseEntity<String> setPermission(Authentication authentication, @RequestBody  AssistantReqDTO assistantReqDTO) throws Exception {
        String uid = (String) authentication.getPrincipal();
        
        UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);
        assistantService.setPermissionAssistantById(assistantReqDTO);
        return ResponseEntity.ok("");
    }
    @PostMapping("/assistant/set-permission/{id}/{token}")
    public ResponseEntity<String> setPermission2(@PathVariable ("id") String id ,@PathVariable ("token") String token, Authentication authentication) throws Exception {
        String uid = (String) authentication.getPrincipal();
        
        UserRecord user = FirebaseAuth.getInstance().getUser(uid);
        String userId = user.getUid();
        String salerunId = assistantService.findSalerunIdBycode(token);
        
        if (salerunId == null) {
            return ResponseEntity.status(404).body("Invalid token. Sale run not found.");
        }

        if(assistantService.checkAssistant(userId, salerunId) == 1){
            return ResponseEntity.status(403).body("You are already an assistant for this sale run.");

        }else{
            
         StringBuilder sbca = new StringBuilder(7);
        Random random = new Random();
        for (int i = 0; i < 7; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sbca.append(CHARACTERS.charAt(randomIndex));
        }
        String runassistanIDGenrate = sbca.toString();
        
        assistantRepository.addRunAssistant(runassistanIDGenrate + "-" + userId, salerunId, userId, false, false, false, false, false);

        }


        return ResponseEntity.ok(salerunId);
    }
}
