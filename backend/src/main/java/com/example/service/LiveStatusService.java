package com.example.service;

import com.example.repository.LiveStatusRepo;
import org.springframework.stereotype.Service;
import com.example.dto.LiveStatsDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import com.example.dto.SupplierLiveDTO;
import java.util.List;
import com.example.dto.response.Live.LiveTitleDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveStatusService {

    private final LiveStatusRepo LiveStatusRepository;

    public LiveStatusService(LiveStatusRepo LiveStatusRepository) {
        this.LiveStatusRepository = LiveStatusRepository;
    }


    @Transactional(readOnly = true)
    public LiveStatsDTO updateLiveStatus(String SaleId) {
        LiveTitleDTO saleRunInfo = LiveStatusRepository.findSaleRunBySaleRunId(SaleId);
        List<SaleLogsDTO> saleLogsList = LiveStatusRepository.findSaleLogsBySaleRun_SaleId(SaleId);
        List<SupplierLiveDTO> supplierList = LiveStatusRepository.findSupplierBySaleRun_SaleId(SaleId);
        LiveStatsDTO liveStatsDTO = new LiveStatsDTO();
        liveStatsDTO.setSaleLogs(saleLogsList);
        liveStatsDTO.setSupplier(supplierList);
        liveStatsDTO.setSaleRunName(saleRunInfo.getSale_run_Name());
        liveStatsDTO.setDateCreated(saleRunInfo.getDateCreated());
        liveStatsDTO.setLiveID(saleRunInfo.getSale_run_Id());
        return liveStatsDTO;
    }
    
}


    

   