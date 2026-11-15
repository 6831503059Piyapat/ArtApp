
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
                || path.equals("/ws")
                || path.startsWith("/ws/")
                || path.equals("/live-status")
                || path.startsWith("/live-status/")
                || path.startsWith("/api/public/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // ตรวจสอบว่ามี Bearer Token หรือไม่
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Missing or invalid Authorization header"
            );
            return;
        }

        String token = header.substring(7);

        FirebaseToken decodedToken;

        // ขั้นที่ 1: ตรวจสอบ Firebase Token เท่านั้น
        try {

            decodedToken =
                    FirebaseAuth.getInstance().verifyIdToken(token);

        } catch (Exception e) {

            System.err.println(
                    "Firebase token verification failed: "
                    + e.getClass().getSimpleName()
            );

            SecurityContextHolder.clearContext();

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Invalid Firebase token"
            );

            return;
        }

        // ขั้นที่ 2: ดึง UID จาก Token
        String uid = decodedToken.getUid();

        // ขั้นที่ 3: สร้าง Authentication
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        uid,
                        null,
                        List.of(() -> "ROLE_USER")
                );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        // ขั้นที่ 4: ส่ง Request ไปยัง Controller
        // อยู่นอก try-catch ของ Firebase เพื่อไม่ให้
        // Exception จาก Controller กลายเป็น Firebase 401
        filterChain.doFilter(request, response);
    }
}
