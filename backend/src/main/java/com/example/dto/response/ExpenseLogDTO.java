package com.example.dto.response;

import java.time.LocalDateTime;

public class ExpenseLogDTO {
    private String Expense_id;
    private String Paid_By_User;
    private String Sale_run_id;
    private LocalDateTime Time_Stamp;
    private String Description;
    private String Category;
    private Double Amount;

    public ExpenseLogDTO() {
    }
    public ExpenseLogDTO(String Expense_id, String Paid_By_User, String Sale_run_id, LocalDateTime Time_Stamp, String Description, String Category, Double Amount) {
        this.Expense_id = Expense_id;
        this.Paid_By_User = Paid_By_User;
        this.Sale_run_id = Sale_run_id;
        this.Time_Stamp = Time_Stamp;
        this.Description = Description;
        this.Category = Category;
        this.Amount = Amount;
    }
    public String getExpense_id() {
        return Expense_id;
    }
    public void setExpense_id(String Expense_id) {
        this.Expense_id = Expense_id;
    }
    public String getPaid_By_User() {
        return Paid_By_User;
    }
    public void setPaid_By_User(String Paid_By_User) {
        this.Paid_By_User = Paid_By_User;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }
    public LocalDateTime getTime_Stamp() {
        return Time_Stamp;
    }
    public void setTime_Stamp(LocalDateTime Time_Stamp) {
        this.Time_Stamp = Time_Stamp;
    }
    public String getDescription() {
        return Description;
    }
    public void setDescription(String Description) {
        this.Description = Description;
    }
    public String getCategory() {
        return Category;
    }
    public void setCategory(String Category) {
        this.Category = Category;
    }
    public Double getAmount() {
        return Amount;
    }
    public void setAmount(Double Amount) {
        this.Amount = Amount;
    }
}
