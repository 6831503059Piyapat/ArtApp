package com.example.dto;
import java.math.BigDecimal;
public record DashboardTotalDTO (
    Long Total_create,
    Long Total_complete,
    Long Total_active,
    BigDecimal Total_item_sold,
    Double Best_revenue
){
}
