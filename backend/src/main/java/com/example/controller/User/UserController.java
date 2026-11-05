package com.example.controller.User;

import com.example.dto.request.Profile.UpdateProfileDTO;
import com.example.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/backend/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/display-name")
    public ResponseEntity<?> updateDisplayName(@RequestBody UpdateProfileDTO request) {
        try {
            UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(request.getUid())
                    .setDisplayName(request.getDisplayName());

            UserRecord userRecord = FirebaseAuth.getInstance().updateUser(updateRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("uid", userRecord.getUid());
            response.put("displayName", userRecord.getDisplayName());
            // Update the display name in the database
            // userService.updateDisplayName(userRecord.getUid(), userRecord.getDisplayName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}