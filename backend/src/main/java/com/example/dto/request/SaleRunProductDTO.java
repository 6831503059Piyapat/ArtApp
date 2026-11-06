package com.example.dto.request;
// Product:{
// Id:number;
// Name:string;
// Quantity:number;
// Price:number;
// ownerId:string; }[];
public record SaleRunProductDTO (
    Number Id,
    String Name,
    Number Quantity,
    Number Price,
    String ownerId
) {
    
}
