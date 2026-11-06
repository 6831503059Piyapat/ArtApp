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
public record CompleteDTO(
    Integer total_run_complete,
    Integer Total_duration,
    Double AVG_duration,
    Integer Total_item_sold,
    Double Total_Revenue,
    Double AVG_Revenue,
    List<CompleteListDTO> List_Complete
) {}
