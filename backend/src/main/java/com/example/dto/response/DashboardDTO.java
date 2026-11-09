package com.example.dto.response;


import java.math.BigDecimal;
import java.util.List;

public record DashboardDTO(
    Long Total_create,
    Long Total_complete,
    Long Total_active,
    BigDecimal Total_item_sold,
    Double Best_revenue,
    List<List_RunDTO> List_Run
) {}
//Total_create:number;
// Total_complete:number;
// Total_active:number;
// Total_item_sold:number;
// Best_revenue:number;