package com.example.service;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.repository.DashboardRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardRepo dashboardRepository;

    public DashboardService(DashboardRepo dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    @Transactional(readOnly = true)
    public DashboardDTO getDashboardByUserId(String userId) {
        return dashboardRepository.findTotalDashboardByUserId(userId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Dashboard not found for user: " + userId));
    }

    @Transactional(readOnly = true)
    public List<List_RunDTO> getDashboardListByUserId(String userId) {
        return dashboardRepository.findDashboardListByUserId(userId);
    }
}

    

   