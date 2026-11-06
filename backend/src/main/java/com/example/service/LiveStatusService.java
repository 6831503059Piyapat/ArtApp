package com.example.service;

import com.example.repository.LiveStatusRepo;
import org.springframework.stereotype.Service;
import com.example.dto.LiveStatsDTO;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveStatusService {

    private final LiveStatusRepo LiveStatusRepository;

    public LiveStatusService(LiveStatusRepo LiveStatusRepository) {
        this.LiveStatusRepository = LiveStatusRepository;
    }

    @Transactional(readOnly = true)
    public LiveStatsDTO updateLiveStatus(String SaleId) {
        return LiveStatusRepository.findLiveStatusBySalesId(SaleId);
    }
    
}


    

   