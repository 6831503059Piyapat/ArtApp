package com.example.service;


import com.example.dto.response.Complete.CompleteDTO;
import com.example.repository.CompleteListRepo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CompleteListService {

    private final CompleteListRepo completeListRepository;

    public CompleteListService(CompleteListRepo completeListRepository) {
        this.completeListRepository = completeListRepository;
    }

    @Transactional(readOnly = true)
    public CompleteDTO getCompleteListByUserId(String userId) {
        return completeListRepository.findCompleteListByUserId(userId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Complete list not found for user: " + userId));
    }
}


    

   