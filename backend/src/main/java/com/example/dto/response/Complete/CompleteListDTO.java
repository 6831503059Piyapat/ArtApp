package com.example.dto.response.Complete;
import java.util.List;
// {
// total _run_complete:number;
// Total_duration:number;
// AVG_duration:number;
// Total_item_sold:number;
// Total_Revenue:number;
// AVG_Revenue:number;
// List_Complete:{
// Id_sales:string;
// Date_complete:string;
// Total_sold:number;
// Gross:number;
// Net_intake:number;
// }[];
// }

public record CompleteListDTO(
    String Id_sales,
    String Name_complete,
    String Host_id,
    String Date_complete,
    Integer Total_sold,
    Double Gross,
    Double Net_intake
) {}
