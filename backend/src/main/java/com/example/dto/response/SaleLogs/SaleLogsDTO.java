package com.example.dto.response.SaleLogs;

public record SaleLogsDTO(
    String Sale_logs_Id,
    String Product_name,
    String Assistant_name,
    String Sale_run_id,
    Double Price,
    Double Quantity,
    String Time_Stamp
) {
    
}
