package com.example.service.Users;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.repository.UserRepo.UserRepo;

@Service
public class UserRegisterService {

    private final UserRepo userRepository;


    public UserRegisterService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void registerUser(String userId, String email, String displayName) {
        userRepository.registerUID(userId, email, displayName);
    }

    public boolean userExists(String userId) {
        if(userRepository.userExists(userId) == 1){
        return true;
        }else{
            return false;
        }
        
    }

}

    

   