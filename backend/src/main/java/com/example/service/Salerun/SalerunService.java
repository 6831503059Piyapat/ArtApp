package com.example.service.Salerun;


import com.example.dto.response.Complete.CompleteDTO;
import com.example.repository.Salerun.SalerunRepo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SalerunService {

    private final SalerunRepo salerunRepository;

    public SalerunService(SalerunRepo salerunRepository) {
        this.salerunRepository = salerunRepository;
    }

    @Transactional
    public void endSaleRun(String saleId) {
        salerunRepository.endSaleRun(saleId);
    }
}


    

   