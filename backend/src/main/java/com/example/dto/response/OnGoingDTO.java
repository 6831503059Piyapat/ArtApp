package com.example.dto.response;
import java.util.List;
// {
// Id:number;
// isOwner:boolean;
// Title:string;
// Status:boolean;
// Booth_time_create:string; (time_stamp)
// boothtimeEnd:string; (time_stamp)
// grossSales:number;
// netSales:number;
// itemsCleared:number;
// itemsClearedMax:number;
// soldPercentage:number;
// boothStaffMax:number;
// boothStaffList:string[];
// }[];

public record OnGoingDTO(
    String id,
    Boolean isOwner,
    String title,
    Boolean status, 
    String booth_time_create,
    String boothtimeEnd,
    Double grossSales,
    Double netSales,
    Integer itemsCleared,
    Integer itemsClearedMax,
    Double soldPercentage,
    Integer boothStaffMax,
    Integer boothStaffList

     
) {}