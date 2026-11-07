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
        // ให้ Client ที่กดติดตาม (Subscribe) รับข้อมูลผ่าน Path ขึ้นต้นด้วย /topic
        config.enableSimpleBroker("/topic");
        
        
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint สำหรับการเชื่อมต่อ WebSocket ครั้งแรก
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}