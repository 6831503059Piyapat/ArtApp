
package com.example.controller;
import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.request.SaleRunDTO;
import com.example.entity.SaleRunEntity;

import java.util.Map;
import java.util.HashMap;
@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/protected-data")
    public Map<String, String> getProtectedData(
            Authentication authentication) {

        String uid = (String) authentication.getPrincipal();

        return Map.of(
            "message", "Hello from Spring Boot!",
            "userId", uid
        );
    }

     @GetMapping("/me")
    public Map<String, Object> me(
            Authentication authentication) throws Exception {

        String uid = (String) authentication.getPrincipal();

        UserRecord user = FirebaseAuth.getInstance()
                .getUser(uid);

        Map<String, Object> result = new HashMap<>();

        result.put("uid", user.getUid());
        result.put("email", user.getEmail());
        result.put("displayName", user.getDisplayName());
        result.put("photoUrl", user.getPhotoUrl());
        result.put("phoneNumber", user.getPhoneNumber());
        result.put("emailVerified", user.isEmailVerified());
        result.put("disabled", user.isDisabled());
        result.put("creationTime", user.getUserMetadata().getCreationTimestamp());
        result.put("lastSignInTime", user.getUserMetadata().getLastSignInTimestamp());

        return result;
    }
}
