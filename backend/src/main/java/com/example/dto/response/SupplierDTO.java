package com.example.dto.response;

public record SupplierDTO (
    String Id_supplier,
    String Name_supplier,
    Double net_payout,
    Double gross_sales,
    Double share_expense
){
    
}
