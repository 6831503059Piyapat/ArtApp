package com.example.dto.response.SaleLogs;

import java.time.LocalDateTime;

public class SaleLogsDTO {
    private String Sale_logs_Id;
    private String Product_name;
    private String Assistant_name;
    private Double Unit_price;
    private String Sale_run_id;
    private Double Price;
    private Integer Quantity;
    private LocalDateTime Time_Stamp;
    private String Supplier_name;

    public SaleLogsDTO() {
    }
    public SaleLogsDTO(String Sale_logs_Id, String Product_name, String Assistant_name, String Sale_run_id, Double Price, Integer Quantity, LocalDateTime Time_Stamp, String Supplier_name, Double Unit_price) {
        this.Sale_logs_Id = Sale_logs_Id;
        this.Product_name = Product_name;
        this.Assistant_name = Assistant_name;
        this.Sale_run_id = Sale_run_id;
        this.Price = Price;
        this.Quantity = Quantity;
        this.Time_Stamp = Time_Stamp;
        this.Supplier_name = Supplier_name; 
        this.Unit_price = Unit_price;
    }
    public String getSale_logs_Id() {
        return Sale_logs_Id;
    }
    public void setSale_logs_Id(String Sale_logs_Id) {
        this.Sale_logs_Id = Sale_logs_Id;
    }
    public String getProduct_name() {
        return Product_name;
    }
    public void setProduct_name(String Product_name) {
        this.Product_name = Product_name;
    }
    public String getAssistant_name() {
        return Assistant_name;
    }
    public void setAssistant_name(String Assistant_name) {
        this.Assistant_name = Assistant_name;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }
    public Double getPrice() {
        return Price;
    }
    public void setPrice(Double Price) {
        this.Price = Price;
    }
    public Integer getQuantity() {
        return Quantity;
    }
    public void setQuantity(Integer Quantity) {
        this.Quantity = Quantity;
    }
    public LocalDateTime getTime_Stamp() {
        return Time_Stamp;
    }
    public void setTime_Stamp(LocalDateTime Time_Stamp) {
        this.Time_Stamp = Time_Stamp;
    }
    public String getSupplier_name() {
        return Supplier_name;
    }
    public void setSupplier_name(String Supplier_name) {
        this.Supplier_name = Supplier_name;
    }
    public Double getUnit_price() {
        return Unit_price;
    }
    public void setUnit_price(Double Unit_price) {
        this.Unit_price = Unit_price;
    }
    
}
