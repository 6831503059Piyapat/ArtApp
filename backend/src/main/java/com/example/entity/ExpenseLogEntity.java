package com.example.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Expense_log")
public class ExpenseLogEntity implements Persistable<String> {
    @Id
    @Column(name = "Expense_Id")
    private String Expense_id;

    @Column(name = "Sale_run_Id", nullable = false, insertable = false, updatable = false)
    private String Sale_run_id;

    @Column(name = "Paid_by_User_Name", nullable = false)
    private String Paid_by_User_Name;

    @Column(name = "Time_Stamp", nullable = false)
    private LocalDateTime Time_Stamp;

    @Column(name = "Description", nullable = false)
    private String Description;
    @Column(name = "Category", nullable = false)
    private String Category;

    @Column(name = "Amount", nullable = false)
    private Double Amount;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity SaleRun;
    
    // Getters & Setters
    public ExpenseLogEntity() {
    }
    public ExpenseLogEntity(String Expense_id, String Sale_run_id, String Paid_by_User_Name, LocalDateTime timestamp, String description, String category, Double amount) {
        this.Expense_id = Expense_id;
        this.Sale_run_id = Sale_run_id;
        this.Paid_by_User_Name = Paid_by_User_Name;
        this.Time_Stamp = timestamp;
        this.Description = description;
        this.Category = category;
        this.Amount = amount;
    }
    public String getExpense_id() {
        return Expense_id;
    }

    @Override
    public String getId() {
        return Expense_id;
    }

    @Override
    public boolean isNew() {
        return true;
    }

    public void setExpense_id(String Expense_id) {
        this.Expense_id = Expense_id;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }
    public String getPaid_by_User_Name() {
        return Paid_by_User_Name;
    }
    public void setPaid_by_User_Name(String Paid_by_User_Name) {
        this.Paid_by_User_Name = Paid_by_User_Name;
    }
    public LocalDateTime getTimestamp() {
        return Time_Stamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.Time_Stamp = timestamp;
    }
    public String getDescription() {
        return Description;
    }
    public void setDescription(String description) {
        this.Description = description;
    }
    public String getCategory() {
        return Category;
    }
    public void setCategory(String category) {
        this.Category = category;
    }
    public Double getAmount() {
        return Amount;
    }
    public void setAmount(Double amount) {
        this.Amount = amount;
    }
    public void setSaleRun(SaleRunEntity saleRun) {
        this.SaleRun = saleRun;
    }

}
