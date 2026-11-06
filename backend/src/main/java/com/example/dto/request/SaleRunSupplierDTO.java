package com.example.dto.request;
import com.example.dto.request.SaleRunProductDTO;
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
//
import java.util.List;

public record SaleRunSupplierDTO(
   String Id,
    String Name,
    String Role,
    List<SaleRunProductDTO> Product
) {}