
package com.example.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class FirebaseFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getServletPath();

        return "OPTIONS".equalsIgnoreCase(request.getMethod())
                || path.startsWith("/ws")
                || path.startsWith("/live-status")
                || path.equals("/backend/users/register-profile")
                || path.startsWith("/api/public/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
// 
System.out.println("===== FirebaseFilter =====");
System.out.println("Authorization exists: " + (header != null));

// 
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(401, "Missing Bearer token");
            return;
        }

        try {
            String token = header.substring(7);
            
            FirebaseToken decodedToken =
                    FirebaseAuth.getInstance().verifyIdToken(token);

// 
            System.out.println("Firebase Token Verified");
System.out.println("UID: " + decodedToken.getUid());
// 

            String uid = decodedToken.getUid();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            uid,
                            null,
                            List.of(() -> "ROLE_USER")
                    );

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
                    // 
System.out.println("Passing request to next filter");
// 
            filterChain.doFilter(request, response);

        } catch (Exception e) {

            System.err.println("Firebase verification failed: "
                    + e.getClass().getName() + ": " + e.getMessage());

            SecurityContextHolder.clearContext();

            response.sendError(401, "Invalid Firebase token");
        }
    }
}
