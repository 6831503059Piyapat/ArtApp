package com.example.dto.response.Complete;
import java.util.List;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;

import com.example.dto.response.SupplierDTO;
public record CompleteIDDTO (
    String Id_complete,
    String complete_name,
    String Date_complete,
    Boolean isActive,
    String Host_name,
    List<String> List_Assistants,
    
    Double Gross_sales,
    Double Expense_total,
    Integer Total_item_Expense,
    Integer Total_deduction,
    Integer Total_items,
    Integer Total_sold,
    Integer Net_total,
    List<SupplierDTO> List_supplier,
    List<ExpenseLogDTO> List_Expense_Logs,
    List<ChangeMadeDTO> List_Change_Made,
    List<SaleLogsDTO> List_Sale_Logs

) {}
