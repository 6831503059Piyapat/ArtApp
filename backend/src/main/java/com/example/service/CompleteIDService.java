package com.example.service;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import com.example.repository.CompleteIDRepo;
import java.util.List;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import com.example.dto.response.SupplierDTO;

import org.springframework.stereotype.Service;

@Service
public class CompleteIDService {

    private final CompleteIDRepo completeIDRepository;

    public CompleteIDService(CompleteIDRepo completeIDRepository) {
        this.completeIDRepository = completeIDRepository;
    }

    public CompleteIDDTO getCompleteSummaryBySalesId(String salesId) {
        CompleteIDDTO completeTempo = completeIDRepository.findCompleteSummaryBySalesId(salesId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Complete list not found for user: " + salesId));
        SaleLogsDTO saleLogs = completeIDRepository.findCompleteSaleLogsBySalesId(salesId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Sale logs not found for user: " + salesId));
                completeTempo.List_Sale_Logs().add(saleLogs);
        ExpenseLogDTO expenseLogs = completeIDRepository.findCompleteExpenseLogsBySalesId(salesId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Expense logs not found for user: " + salesId));
                completeTempo.List_Expense_Logs().add(expenseLogs);
        ChangeMadeDTO changeMade = completeIDRepository.findCompleteChangeLogsBySalesId(salesId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Change made not found for user: " + salesId));
                completeTempo.List_Change_Made().add(changeMade);
        SupplierDTO supplierLogs = completeIDRepository.findCompleteSupplierBySalesId(salesId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Supplier logs not found for user: " + salesId));
                completeTempo.List_supplier().add(supplierLogs);
        String assistants = completeIDRepository.findCompleteAssistantsBySalesId(salesId);
              
        completeTempo.List_Assistants().add(assistants);
        return completeTempo;
    }
}


    

   