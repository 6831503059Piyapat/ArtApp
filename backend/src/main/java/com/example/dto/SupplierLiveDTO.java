package com.example.dto;

public class SupplierLiveDTO {
    private String Id_supplier;
    private String Name_supplier;
    private Double gross_sales;
    private Integer total_stock;
    private Integer total_sale;
    
    public SupplierLiveDTO(String Id_supplier, String Name_supplier, Double gross_sales, Integer total_stock, Integer total_sale) {
        this.Id_supplier = Id_supplier;
        this.Name_supplier = Name_supplier;
        this.gross_sales = gross_sales;
        this.total_stock = total_stock;
        this.total_sale = total_sale;
    }
    public String getId_supplier() {
        return Id_supplier;
    }
    public void setId_supplier(String Id_supplier) {
        this.Id_supplier = Id_supplier;
    }

    public String getName_supplier() {
        return Name_supplier;
    }
    public void setName_supplier(String Name_supplier) {
        this.Name_supplier = Name_supplier;
    }

    public Double getGross_sales() {
        return gross_sales;
    }
    public void setGross_sales(Double gross_sales) {
        this.gross_sales = gross_sales;
    }

    public Integer getTotal_stock() {
        return total_stock;
    }
    public void setTotal_stock(Integer total_stock) {
        this.total_stock = total_stock;
    }

    public Integer getTotal_sale() {
        return total_sale;
    }
    public void setTotal_sale(Integer total_sale) {
        this.total_sale = total_sale;
    }

}
