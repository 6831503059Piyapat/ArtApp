package com.example.dto.response;

public class SupplierDTO {
    private String Id_supplier;
    private String Name_supplier;
    private Double net_payout;
    private Double gross_sales;
    private Double share_expense;
    private Boolean is_settled;

    public SupplierDTO() {
    }
    public SupplierDTO(String id_supplier, String name_supplier, Double net_payout, Double gross_sales, Double share_expense, Boolean is_settled) {
        Id_supplier = id_supplier;
        Name_supplier = name_supplier;
        this.net_payout = net_payout;
        this.gross_sales = gross_sales;
        this.share_expense = share_expense;
        this.is_settled = is_settled;
    }
    public String getId_supplier() {
        return Id_supplier;
    }
    public void setId_supplier(String id_supplier) {
        Id_supplier = id_supplier;
    }
    public String getName_supplier() {
        return Name_supplier;
    }
    public void setName_supplier(String name_supplier) {
        Name_supplier = name_supplier;
    }
    public Double getNet_payout() {
        return net_payout;
    }
    public void setNet_payout(Double net_payout) {
        this.net_payout = net_payout;
    }
    public Double getGross_sales() {
        return gross_sales;
    }
    public void setGross_sales(Double gross_sales) {
        this.gross_sales = gross_sales;
    }
    public Double getShare_expense() {
        return share_expense;
    }
    public void setShare_expense(Double share_expense) {
        this.share_expense = share_expense;
    }
    public Boolean getIs_settled() {
        return is_settled;
    }
    
    
}
