
package com.example.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {

        // ใช้ Default App ที่มีอยู่แล้ว หาก Initialize ไปก่อนหน้านี้
        for (FirebaseApp app : FirebaseApp.getApps()) {
            if (FirebaseApp.DEFAULT_APP_NAME.equals(app.getName())) {
                return app;
            }
        }

        // โหลด Firebase Service Account จาก resources
        try (var serviceAccount =
                 new ClassPathResource("serviceAccountKey.json")
                     .getInputStream()) {

            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(
                    GoogleCredentials.fromStream(serviceAccount)
                )
                .build();

            return FirebaseApp.initializeApp(options);
        }
    }
}
