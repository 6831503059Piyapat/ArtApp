package com.example.dto.response;

public record ExpenseLogDTO(
    String Expense_id,
    String Paid_By_User,
    String Sale_run_id,
    String Time_Stamp,
    String Description,
    String Category,
    Double Amount
) {}
