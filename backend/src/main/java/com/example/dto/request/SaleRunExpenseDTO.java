package com.example.dto.request;
// Expense:{
// Id:number;
// Name:string;
// Category:string;
// Price:number; }[];
public record SaleRunExpenseDTO (
    Number Id,
    String Name,
    String Category,
    Number Price
) {
    
}
