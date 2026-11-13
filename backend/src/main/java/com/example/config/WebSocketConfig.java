package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // เปิดช่องทางสำหรับส่งข้อมูลออกไปให้ Next.js ที่ Subscribe ไว้
        config.enableSimpleBroker("/viewLive");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // เปิด Endpoint /ws และอนุญาตให้ Next.js (localhost:3000) เชื่อมต่อเข้ามาได้
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000", "*")
                .withSockJS();
    }
}