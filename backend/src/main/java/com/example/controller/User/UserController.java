
package com.example.controller.User;

import com.example.dto.request.Profile.UpdateProfileDTO;
import com.example.dto.request.Profile.CreateUserDTO;

import com.example.service.UserService;
import com.example.service.Users.UserRegisterService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/backend/users")
public class UserController {

    private final UserService userService;
    private final UserRegisterService userRegisterService;

    public UserController(
            UserService userService,
            UserRegisterService userRegisterService
    ) {
        this.userService = userService;
        this.userRegisterService = userRegisterService;
    }

    // Update current user's display name
    @PutMapping("/display-name")
    public ResponseEntity<?> updateDisplayName(
            Authentication authentication,
            @RequestBody UpdateProfileDTO request
    ) {

        String uid = (String) authentication.getPrincipal();

        if (request.getDisplayName() == null
                || request.getDisplayName().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Display name is required"));
        }

        try {

            userService.updateDisplayName(
                    uid,
                    request.getDisplayName()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("uid", uid);
            response.put("displayName", request.getDisplayName());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Unable to update display name");

            return ResponseEntity.internalServerError()
                    .body(errorResponse);
        }
    }

    // Register current Firebase user in application database
    @PostMapping("/register-profile")
    public ResponseEntity<String> registerProfile(
            Authentication authentication,
            @RequestBody CreateUserDTO request
    ) {

        String uid = (String) authentication.getPrincipal();

        if (request.getEmail() == null
                || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Email is required.");
        }

        if (userRegisterService.userExists(uid)) {
            return ResponseEntity.badRequest()
                    .body("User already exists in the database.");
        }

        userRegisterService.registerUser(
                uid,
                request.getEmail(),
                request.getDisplayName()
        );

        return ResponseEntity.ok(
                "User profile registered successfully."
        );
    }

    // Get current user's profile only
    @GetMapping("/profile/{uid}")
    public ResponseEntity<?> getUserProfile(
            @PathVariable("uid") String requestedUid,
            Authentication authentication
    ) {

        String authenticatedUid =
                (String) authentication.getPrincipal();

        // Users can only access their own profile
        if (!authenticatedUid.equals(requestedUid)) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Access denied"));
        }

        String displayName =
                userService.getDisplayName(authenticatedUid);

        if (displayName == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, String> response = new HashMap<>();
        response.put("uid", authenticatedUid);
        response.put("displayName", displayName);

        return ResponseEntity.ok(response);
    }
}
