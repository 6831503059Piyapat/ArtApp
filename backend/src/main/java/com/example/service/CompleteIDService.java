package com.example.service;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import com.example.repository.CompleteIDRepo;
import java.util.List;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import com.example.dto.response.SupplierDTO;
import com.example.dto.response.Complete.CompleteIDSumDTO;
import org.springframework.stereotype.Service;

@Service
public class CompleteIDService {

    private final CompleteIDRepo completeIDRepository;

    public CompleteIDService(CompleteIDRepo completeIDRepository) {
        this.completeIDRepository = completeIDRepository;
    }
//       private String Id_complete;
//     private String complete_name;
//     private LocalDateTime Date_complete;
//     private Boolean isActive;
//     private String Host_name;
//     private List<String> List_Assistants;

//     private Double Gross_sales;
//     private Double Expense_total;
//     private Integer Total_item_Expense;
//     private Integer Total_deduction;
//     private Integer Total_items;
//     private Integer Total_sold;
//     private Integer Net_total;
//     private List<SupplierDTO> List_supplier;
//     private List<ExpenseLogDTO> List_Expense_Logs;
//     private List<ChangeMadeDTO> List_Change_Made;
//     private List<SaleLogsDTO> List_Sale_Logs;

    public CompleteIDDTO getCompleteSummaryBySalesId(String salesId) {
        CompleteIDDTO completeSummary = new CompleteIDDTO();
        CompleteIDSumDTO summaryData = completeIDRepository.findCompleteSummaryBySalesId(salesId);
        List<String> assistants = completeIDRepository.findCompleteAssistantsNameBySalesId(salesId);
        List<SupplierDTO> suppliers = completeIDRepository.findCompleteSupplierPayoutsBySalesId(salesId);
        List<ExpenseLogDTO> expenseLogs = completeIDRepository.findCompleteExpenseLogsBySalesId(salesId);
        List<ChangeMadeDTO> changeLogs = completeIDRepository.findCompleteChangeLogsBySalesId(salesId);
        List<SaleLogsDTO> saleLogs = completeIDRepository.findCompleteSaleLogsBySalesId(salesId);
        completeSummary.setId_complete(summaryData.getId_complete());
        completeSummary.setComplete_name(summaryData.getComplete_name());
        completeSummary.setDate_complete(summaryData.getDate_complete());
        completeSummary.setIsActive(summaryData.getIsActive());
        completeSummary.setHost_name(summaryData.getHost_name());
        completeSummary.setGross_sales(summaryData.getGross_sales());
        completeSummary.setExpense_total(summaryData.getExpense_total());
        completeSummary.setTotal_item_Expense(summaryData.getTotal_item_Expense());
        completeSummary.setTotal_deduction(summaryData.getTotal_deduction());
        completeSummary.setTotal_items(summaryData.getTotal_items());
        completeSummary.setTotal_sold(summaryData.getTotal_sold().doubleValue());
        completeSummary.setNet_total(summaryData.getNet_total());
        completeSummary.setList_Assistants(assistants);
        completeSummary.setList_supplier(suppliers);
        completeSummary.setList_Expense_Logs(expenseLogs);
        completeSummary.setList_Change_Made(changeLogs);
        completeSummary.setList_Sale_Logs(saleLogs);
        
        return completeSummary;
    }
}


    

   