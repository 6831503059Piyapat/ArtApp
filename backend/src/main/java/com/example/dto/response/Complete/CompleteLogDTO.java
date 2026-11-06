package com.example.dto.response.Complete;
import java.util.List;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;

import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.SupplierDTO;
public record CompleteLogDTO (
    
    List<SupplierDTO> List_payout_summary,
    List<ExpenseLogDTO> List_Expense_Logs,
    List<SaleLogsDTO> List_Sale_Logs,
    List<ChangeMadeDTO> List_Change_Made
    
) {}
