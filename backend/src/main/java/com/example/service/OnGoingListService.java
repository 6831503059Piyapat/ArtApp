package com.example.service;


import com.example.repository.OnGoingListRepo;
import com.example.dto.response.OnGoingDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class OnGoingListService {

    private final OnGoingListRepo onGoingListRepository;

    public OnGoingListService(OnGoingListRepo onGoingListRepository) {
        this.onGoingListRepository = onGoingListRepository;
    }

    @Transactional(readOnly = true)
    public OnGoingDTO getOnGoingListByUserId(String userId) {
        return onGoingListRepository.findOnGoingListByUserId(userId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("On-going list not found for user: " + userId));
    }
}


    

   