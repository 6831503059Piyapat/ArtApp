package com.example.service;

import com.example.repository.UserRepo.UserRepo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void updateDisplayName(String userId, String displayName) {
        userRepository.updateDisplayName(userId, displayName);
    }
    public String getDisplayName(String userId) {
        return userRepository.findById(userId)
                .map(user -> user.getDisplayName())
                .orElse(null);
    }
    
}


    

   