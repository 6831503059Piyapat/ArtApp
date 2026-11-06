package com.example.dto.request;
import com.example.dto.request.SaleRunExpenseDTO;
import com.example.dto.request.SaleRunSupplierDTO;
// {
// runName:string;
// runDate:string;(Date)
// runLocation:string;
// Expense:{
// Id:number;
// Name:string;
// Category:string;
// Price:number; }[];
// Supplier:{
// Id:string;
// Name:string;
// Role:string;
// Product:{
// Id:number;
// Name:string;
// Quantity:number;
// Price:number;
// ownerId:string; }[];
// }[];
// };
import java.util.List;

public record SaleRunDTO(
    String runName,
    String runDate,
    String runLocation,
    String Host_id,
    String Host_Name,
    List<SaleRunExpenseDTO> Expense,
    List<SaleRunSupplierDTO> Supplier
) {}