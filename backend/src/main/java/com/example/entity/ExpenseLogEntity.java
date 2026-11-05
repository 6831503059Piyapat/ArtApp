package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Expense_log")
public class ExpenseLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Expense_id")
    private String Expense_id;

    @Column(name = "Sale_run_id", nullable = false, insertable = false, updatable = false)
    private String Sale_run_id;

    @Column(name = "Paid_by_User_id", nullable = false)
    private String Paid_by_User_id;

    @Column(name = "timestamp", nullable = false)
    private String timestamp;

    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "amount", nullable = false)
    private Double amount;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_id", referencedColumnName = "Sale_run_id")
    private SaleRunEntity SaleRun;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sales_run_id", referencedColumnName = "Sales_run_id")
    private RunAssistanceEntity RunAssistant;
    // Getters & Setters
    public ExpenseLogEntity() {
    }
    public ExpenseLogEntity(String Expense_id, String Sale_run_id, String Paid_by_User_id, String timestamp, String description, String category, Double amount) {
        this.Expense_id = Expense_id;
        this.Sale_run_id = Sale_run_id;
        this.Paid_by_User_id = Paid_by_User_id;
        this.timestamp = timestamp;
        this.description = description;
        this.category = category;
        this.amount = amount;
    }
    public String getExpense_id() {
        return Expense_id;
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
    public String getPaid_by_User_id() {
        return Paid_by_User_id;
    }
    public void setPaid_by_User_id(String Paid_by_User_id) {
        this.Paid_by_User_id = Paid_by_User_id;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public void setSaleRun(SaleRunEntity saleRun) {
        this.SaleRun = saleRun;
    }

}
