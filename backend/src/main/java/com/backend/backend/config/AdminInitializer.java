package com.backend.backend.config;

import com.backend.backend.entity.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        // Si no hay variables definidas, no hace nada
        if (adminEmail == null || adminEmail.isEmpty() ||
                adminPassword == null || adminPassword.isEmpty()) {
            return;
        }

        // Si el admin ya existe, no se crea de nuevo
        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setFirstName("Admin");
        admin.setLastName("System");
        admin.setRole("ROLE_ADMIN");

        userRepository.save(admin);

        System.out.println("✅ Usuario ADMIN creado automáticamente: " + adminEmail);
    }
}
