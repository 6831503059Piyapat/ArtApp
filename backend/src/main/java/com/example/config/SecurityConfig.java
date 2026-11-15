
package com.example.config;

import java.util.List;

import jakarta.servlet.DispatcherType;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        String allowedOrigin =
                System.getenv("HEADER_ORIGIN_ALLOWED");

        if (allowedOrigin == null || allowedOrigin.isBlank()) {
            throw new IllegalStateException(
                    "Missing environment variable: HEADER_ORIGIN_ALLOWED"
            );
        }

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(allowedOrigin));

        config.setAllowedMethods(
                List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );

        config.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .cors(Customizer.withDefaults())

            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            .authorizeHttpRequests(auth -> auth

                    // Preflight requests
                    .requestMatchers(
                            HttpMethod.OPTIONS,
                            "/**"
                    ).permitAll()

                    // WebSocket handshake
                    .requestMatchers(
                            "/ws",
                            "/ws/**"
                    ).permitAll()

                    // Public live status
                    .requestMatchers(
                            "/live-status",
                            "/live-status/**"
                    ).permitAll()

                    // Public API
                    .requestMatchers(
                            "/api/public/**"
                    ).permitAll()

                    // Error dispatch
                    .dispatcherTypeMatchers(
                            DispatcherType.ERROR
                    ).permitAll()

                    // Everything else requires authentication
                    .anyRequest().authenticated()
            )

            .addFilterBefore(
                    new FirebaseFilter(),
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
