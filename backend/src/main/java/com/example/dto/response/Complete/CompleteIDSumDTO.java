package com.example.dto.response.Complete;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public class CompleteIDSumDTO {
    private String Id_complete;
    private String complete_name;
    private LocalDateTime Date_complete;
    private Boolean isActive;
    private String Host_name;
    private Double Gross_sales;
    private Double Expense_total;
    private Long Total_item_Expense;
    private Double Total_deduction;
    private BigDecimal Total_items;
    private BigDecimal Total_sold;
    private Double Net_total;

    public CompleteIDSumDTO() {}
    public CompleteIDSumDTO(String Id_complete, String complete_name, LocalDateTime Date_complete, Boolean isActive, String Host_name, Double Gross_sales, Double Expense_total, Long Total_item_Expense, Double Total_deduction, BigDecimal Total_items, BigDecimal Total_sold, Double Net_total) {
        this.Id_complete = Id_complete;
        this.complete_name = complete_name;
        this.Date_complete = Date_complete;
        this.isActive = isActive;
        this.Host_name = Host_name;
        this.Gross_sales = Gross_sales;
        this.Expense_total = Expense_total;
        this.Total_item_Expense = Total_item_Expense;
        this.Total_deduction = Total_deduction;
        this.Total_items = Total_items;
        this.Total_sold = Total_sold;
        this.Net_total = Net_total;
    }
    public String getId_complete() {
        return Id_complete;
    }
    public void setId_complete(String id_complete) {
        Id_complete = id_complete;
    }
    public String getComplete_name() {
        return complete_name;
    }
    public void setComplete_name(String complete_name) {
        this.complete_name = complete_name;
    }
    public LocalDateTime getDate_complete() {
        return Date_complete;
    }
    public void setDate_complete(LocalDateTime date_complete) {
        Date_complete = date_complete;
    }
    public Boolean getIsActive() {
        return isActive;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    public String getHost_name() {
        return Host_name;
    }
    public void setHost_name(String host_name) {
        Host_name = host_name;
    }
    public Double getGross_sales() {
        return Gross_sales;
    }
    public void setGross_sales(Double gross_sales) {
        Gross_sales = gross_sales;
    }
    public Double getExpense_total() {
        return Expense_total;
    }
    public void setExpense_total(Double expense_total) {
        Expense_total = expense_total;
    }
    public Long getTotal_item_Expense() {
        return Total_item_Expense;
    }
    public void setTotal_item_Expense(Long total_item_Expense) {
        Total_item_Expense = total_item_Expense;
    }
    public Double getTotal_deduction() {
        return Total_deduction;
    }
    public void setTotal_deduction(Double total_deduction) {
        Total_deduction = total_deduction;
    }
    public BigDecimal getTotal_items() {
        return Total_items;
    }
    public void setTotal_items(Double total_items) {
        Total_items = BigDecimal.valueOf(total_items);
    }
    public BigDecimal getTotal_sold() {
        return Total_sold;
    }
    public void setTotal_sold(Double total_sold) {
        Total_sold = BigDecimal.valueOf(total_sold);
    }
    public Double getNet_total() {
        return Net_total;
    }
    public void setNet_total(BigDecimal net_total) {
        Net_total = net_total.doubleValue();
    }
    
}
