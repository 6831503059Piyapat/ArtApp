package com.example.dto.response;
import java.time.LocalDateTime;
// List_Run:
// {
// Id:number;
// Total_stock:number;
// Total_Items_sold:number;
// Date_create:string;(Date)
// Date_Closed:string;(Date)
// isActive:boolean;
// Gross_sale:number;
// }[];
public record List_RunDTO(

    String Id,
    Integer Total_stock,
    Integer Total_Items_sold,
    LocalDateTime Date_created,
    LocalDateTime Date_closed,
    Boolean isActive,
    Double Gross_sale
     
) {}