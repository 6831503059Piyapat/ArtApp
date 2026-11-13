package com.example.service.JoinSale;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.repository.Assistant.AssistantRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.dto.DashboardTotalDTO;
import java.util.List;
import com.example.repository.JoinSale.JoinSaleRepo;
import java.util.Random;
import com.example.repository.Salerun.SalerunRepo;

@Service
public class JoinsaleService {

    private final AssistantRepo assistantRepo;
    private final JoinSaleRepo joinSaleRepo;
    private final SalerunRepo saleRunRepo;

    public JoinsaleService(AssistantRepo assistantRepo, SalerunRepo saleRunRepo, JoinSaleRepo joinSaleRepo) {
        this.assistantRepo = assistantRepo;
        this.saleRunRepo = saleRunRepo;
        this.joinSaleRepo = joinSaleRepo;
    }

    public void joinSale(String userId, String code_join) {
        if (saleRunRepo.existsByCode_JoinId(code_join) == null) {
            throw new IllegalArgumentException("Invalid code_join: " + code_join);
        }
       String saleRunId = saleRunRepo.existsByCode_JoinId(code_join);

        Long isUserInSale = joinSaleRepo.checkUserInSale(userId, saleRunId);
        if (isUserInSale > 0) {
            throw new IllegalArgumentException("User is already in the sale run.");
        }

        StringBuilder sbca = new StringBuilder(7);
        Random random = new Random();
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < 7; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sbca.append(CHARACTERS.charAt(randomIndex));
        }
        
        String runassistantIDGenrate = sbca.toString();


       assistantRepo.addRunAssistant(runassistantIDGenrate+"-"+userId, saleRunId, userId, false, false, false, false, false);

    }

   
}

    

   