package com.example.dto.response.Complete;
import java.util.List;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import java.math.BigDecimal;
import com.example.dto.response.SupplierDTO;
import java.time.LocalDateTime;
public class CompleteIDDTO{
    private String Id_complete;
    private String complete_name;
    private LocalDateTime Date_complete;
    private Boolean isActive;
    private String Host_name;
    private List<String> List_Assistants;

    private Double Gross_sales;
    private Double Expense_total;
    private Double Total_item_Expense;
    private BigDecimal Total_deduction;
    private Double Total_items;
    private Double Total_sold;
    private BigDecimal Net_total;
    private List<SupplierDTO> List_supplier;
    private List<ExpenseLogDTO> List_Expense_Logs;
    private List<ChangeMadeDTO> List_Change_Made;
    private List<SaleLogsDTO> List_Sale_Logs;

    public CompleteIDDTO() {}
    public CompleteIDDTO(String Id_complete, String complete_name, LocalDateTime Date_complete, Boolean isActive, String Host_name, List<String> List_Assistants, Double Gross_sales, Double Expense_total, Double Total_item_Expense, BigDecimal Total_deduction, Double Total_items, Double Total_sold, BigDecimal Net_total, List<SupplierDTO> List_supplier, List<ExpenseLogDTO> List_Expense_Logs, List<ChangeMadeDTO> List_Change_Made, List<SaleLogsDTO> List_Sale_Logs) {
        this.Id_complete = Id_complete;
        this.complete_name = complete_name;
        this.Date_complete = Date_complete;
        this.isActive = isActive;
        this.Host_name = Host_name;
        this.List_Assistants = List_Assistants;
        this.Gross_sales = Gross_sales;
        this.Expense_total = Expense_total;
        this.Total_item_Expense = Total_item_Expense;
        this.Total_deduction = Total_deduction;
        this.Total_items = Total_items;
        this.Total_sold = Total_sold;
        this.Net_total = Net_total;
        this.List_supplier = List_supplier;
        this.List_Expense_Logs = List_Expense_Logs;
        this.List_Change_Made = List_Change_Made;
        this.List_Sale_Logs = List_Sale_Logs;
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
    public List<String> getList_Assistants() {
        return List_Assistants;
    }
    public void setList_Assistants(List<String> list_Assistants) {
        List_Assistants = list_Assistants;
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
    public Double getTotal_item_Expense() {
        return Total_item_Expense;
    }
    public void setTotal_item_Expense(Long total_item_Expense) {
        Total_item_Expense = total_item_Expense.doubleValue();
    }
    public BigDecimal getTotal_deduction() {
        return Total_deduction;
    }
    public void setTotal_deduction(Double total_deduction) {
        Total_deduction = BigDecimal.valueOf(total_deduction);
    }
    public Double getTotal_items() {
        return Total_items;
    }
    public void setTotal_items(BigDecimal total_items) {
        Total_items = total_items.doubleValue();
    }
    public Double getTotal_sold() {
        return Total_sold;
    }
    public void setTotal_sold(Double total_sold) {
        Total_sold = total_sold;
    }
    public BigDecimal getNet_total() {
        return Net_total;
    }
    public void setNet_total(Double net_total) {
        Net_total = BigDecimal.valueOf(net_total);
    }
    public List<SupplierDTO> getList_supplier() {
        return List_supplier;
    }
    public void setList_supplier(List<SupplierDTO> list_supplier) {
        List_supplier = list_supplier;
    }
    public List<ExpenseLogDTO> getList_Expense_Logs() {
        return List_Expense_Logs;
    }
    public void setList_Expense_Logs(List<ExpenseLogDTO> list_Expense_Logs) {
        List_Expense_Logs = list_Expense_Logs;
    }
    public List<ChangeMadeDTO> getList_Change_Made() {
        return List_Change_Made;
    }
    public void setList_Change_Made(List<ChangeMadeDTO> list_Change_Made) {
        List_Change_Made = list_Change_Made;
    }
    public List<SaleLogsDTO> getList_Sale_Logs() {
        return List_Sale_Logs;
    }
    public void setList_Sale_Logs(List<SaleLogsDTO> list_Sale_Logs) {
        List_Sale_Logs = list_Sale_Logs;
    }
    
}