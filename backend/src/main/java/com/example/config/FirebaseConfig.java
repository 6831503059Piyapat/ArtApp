
package com.example.config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() throws IOException {

        if (!FirebaseApp.getApps().isEmpty()) {
            return;
        }

        GoogleCredentials credentials;

        String environment =
            System.getenv("APP_ENV");

        if ("cloud".equalsIgnoreCase(environment)) {

            // Google Cloud Run: ใช้ ADC
            credentials =
                GoogleCredentials.getApplicationDefault();

        } else {

            // Local: ใช้ไฟล์ JSON
            ClassPathResource resource =
                new ClassPathResource("serviceAccountKey.json");

            try (InputStream input =
                     resource.getInputStream()) {

                credentials =
                    GoogleCredentials.fromStream(input);
            }
        }

        FirebaseOptions options =
            FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();

        FirebaseApp.initializeApp(options);
    }
}
