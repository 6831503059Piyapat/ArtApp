package com.example.dto.response;


import java.util.List;

public record DashboardDTO(
    Integer Total_create,
    Integer Total_complete,
    Integer Total_active,
    Integer Total_item_sold,
    Double Best_revenue,
    List<List_RunDTO> List_run
) {}
//Total_create:number;
// Total_complete:number;
// Total_active:number;
// Total_item_sold:number;
// Best_revenue:number;